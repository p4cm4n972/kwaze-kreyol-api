import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication/authentication.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { BcryptService } from './services/bcrypt.service';
import { RefreshTokenIdsStorage } from './authentication/services/storage/refresh-token-ids.storage';
import { UsersService } from 'src/users/users.service';
import { HashingService } from './services/hashing.service';
import { AuthService } from './authentication/services/auth.service';
import { MailService } from 'src/services/mail.service';

@Module({
  imports: [
     MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [AuthenticationController],
  providers: [
    { provide: HashingService, useClass: BcryptService },
    RefreshTokenIdsStorage,
    UsersService,
    AuthService,
    BcryptService,
    MailService
  ],
})
export class IamModule {}
