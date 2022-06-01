import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { GetUserArgs } from './dto/args/get-user.args';
import { CreateUserInput } from './dto/input/create-user.input';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { Users, UsersDocument } from './users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users')
    private UsersModel: Model<UsersDocument>,
  ) {}

  public async createUser(createUserData: CreateUserInput): Promise<Users> {
    const user: Users = {
      userId: uuidv4(),
      ...createUserData,
    };

    await this.UsersModel.create(user);

    return user;
  }

  public async updateUser(updateUserData: UpdateUserInput): Promise<Users> {
    await this.UsersModel.updateOne(
      {
        userId: updateUserData.userId,
      },
      {
        $set: updateUserData,
      },
      { upsert: false },
    ).exec();

    return await this.UsersModel.findOne(updateUserData).exec();
  }

  public async getUser(getUserArgs: GetUserArgs): Promise<Users> {
    return await this.UsersModel.findOne(getUserArgs).exec();
  }

  public async getUsers(): Promise<Users[]> {
    return await this.UsersModel.find().exec();
  }

  public async deleteUser(deleteUserData: DeleteUserInput): Promise<any> {
    return await this.UsersModel.findOne(deleteUserData).deleteOne().exec();
  }
}
