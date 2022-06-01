import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'users',
        schema: UsersSchema,
      },
    ]),
  ],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
