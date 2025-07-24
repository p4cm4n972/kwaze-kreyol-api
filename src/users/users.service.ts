import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
    
) {}


  findByEmail(email: any) {
        return this.userModel.findOne({ email }).exec();
    }

  create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
        return user.save();
  }
  

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: any) {
        return this.userModel.findOne({ _id: id }).exec();;
    }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({ _id: id }, { $set: updateUserDto }).exec();
  }

  remove(id: number) {
    return this.userModel.deleteOne({ _id: id }).
        exec();
  }
}
