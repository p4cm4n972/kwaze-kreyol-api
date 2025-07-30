import { BadRequestException, ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../../../users/entities/user.entity';
import { CreateUserDto } from '../../../users/dto/create-user.dto';
import { LoginDto } from '../dto/login.dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { HashingService } from 'src/iam/services/hashing.service';
import jwtConfig from 'src/iam/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { MailService } from 'src/services/mail.service';
import { randomUUID } from 'crypto';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { InvalidateRefreshTokenError, RefreshTokenIdsStorage } from './storage/refresh-token-ids.storage';
import { RefreshTokenDto } from '../dto/refresh-token.dto/refresh-token.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private readonly jwtService: JwtService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        private readonly usersService: UsersService,
        private readonly hashingService: HashingService,
        private readonly mailService: MailService,
        private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,

    ) { }



    async register(dto: CreateUserDto) {
        const existingUser = await this.usersService.findByEmail(dto.email);
        if (existingUser) {
            throw new ConflictException('Email déjà utilisé');
        }

        if (!dto.password) {
            throw new BadRequestException('Password is required');
        }

        try {
            const hash = await this.hashingService.hash(dto.password);

            const user = await this.usersService.create({
                pseudo: dto.pseudo,
                email: dto.email,
                password: hash,
                isEmailVerified: dto.isEmailVerified || false
            });

            const emailToken = await this.generateEmailVerificationToken(user._id);

            await this.mailService.sendConfirmationEmail(user.email, emailToken);


            
        } catch (error) {
            const pgUniqueViolationErrorCode = '23505';
            if (error.code === pgUniqueViolationErrorCode) {
                throw new ConflictException('Email déjà utilisé');
            }
            throw new BadRequestException('Error creating user', error.message);
        }
    }

    async generateEmailVerificationToken(userId: string | any): Promise<string> {
        return this.jwtService.signAsync(
            { sub: userId },
            {
                secret: this.jwtConfiguration.secret,
                expiresIn: '1d', // validité du lien 24h par exemple
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
            },
        );
    }


    async login(dto: LoginDto) {
        const user = await this.userModel.findOne({ email: dto.email });
        if (!user) throw new UnauthorizedException('Utilisateur inconnu');

        const isEqual = await this.hashingService.compare(
            dto.password,
            user.password,
        );
        if (!isEqual) throw new UnauthorizedException('Mot de passe invalide');

        if (!user.isEmailVerified) throw new UnauthorizedException(
            "Votre adresse e-mail n'est pas vérifiée. Veuillez consulter votre boîte mail.");

        return this.generateTokens(user);
    }

    async generateTokens(user: User) {
        const refreshTokenId = randomUUID();
        const [accessToken, refreshToken] = await Promise.all([
            this.signToken<Partial<ActiveUserData>>(
                user.id,
                this.jwtConfiguration.accessTokenTtl,
                {
                    pseudo: user.pseudo,
                    id: user._id,
                    profilePicture: user.profilePicture,
                    // role: user.role,
                    // permissions: user.permissions,
                },
            ),
            this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl, {
                refreshTokenId,
            }),
        ]);
        await this.refreshTokenIdsStorage.insert(user.id, refreshTokenId);
        return {
            accessToken,
            refreshToken,
        };
    }

    private async signToken<T>(userId: number, expiresIn: number, payload?: T) {
        return await this.jwtService.signAsync(
            {
                sub: userId,
                ...payload,
            },
            {
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                secret: this.jwtConfiguration.secret,
                expiresIn,
            },
        );
    }

     async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub, refreshTokenId } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'> & { refreshTokenId: string }
      >(refreshTokenDto.refreshToken, {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
      });
      const user = await this.userModel.findOne({ _id: sub });
      const isValid = await this.refreshTokenIdsStorage.validate(
        user?.id,
        refreshTokenId,
      );
      if (isValid) {
        await this.refreshTokenIdsStorage.invalidate(user?.id);
      } else {
        throw new UnauthorizedException('Refresh token is invalid');
      }
      if (user) {
        return this.generateTokens(user);
      }
    } catch (error) {
      if (error instanceof InvalidateRefreshTokenError) {
        throw new UnauthorizedException('Access denied');
      }
      throw new UnauthorizedException();
    }
  }
}
