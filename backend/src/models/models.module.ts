import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { UsersModule } from 'src/users/users.module';
import { ModelsController } from './models.controller';
import { ModelsService } from './models.service';
import { Model, Modelschema } from './schema/model.schema';

@Module({
  providers: [ModelsService],
  controllers: [ModelsController],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Model.name, schema: Modelschema },]),
  forwardRef(() => UsersModule)],
  exports: [ModelsService]
})
export class ModelsModule { }
