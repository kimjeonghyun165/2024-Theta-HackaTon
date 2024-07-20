import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelsModule } from 'src/models/models.module';
import { Model, ModelSchema } from 'src/models/schema/model.schema';
import { User, UserSchema } from './schema/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Model.name, schema: ModelSchema }]),
    forwardRef(() => ModelsModule)],
  exports: [UsersService]
})
export class UsersModule { }
