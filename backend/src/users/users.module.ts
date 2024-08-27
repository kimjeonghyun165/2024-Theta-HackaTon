import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenTypeGuard } from 'src/common/guards/token-type.guard';
import { SharedModule } from 'src/common/modules/shared.module';
import { ModelsModule } from 'src/models/models.module';
import { Model, ModelSchema } from 'src/models/schema/model.schema';
import { User, UserSchema } from './schema/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, TokenTypeGuard],
  controllers: [UsersController],
  imports: [
    SharedModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Model.name, schema: ModelSchema }]),
    forwardRef(() => ModelsModule)],
  exports: [UsersService]
})
export class UsersModule { }
