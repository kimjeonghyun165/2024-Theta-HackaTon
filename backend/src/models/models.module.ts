import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenTypeGuard } from 'src/common/guards/token-type.guard';
import { SharedModule } from 'src/common/modules/shared.module';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { UsersModule } from 'src/users/users.module';
import { ModelsController } from './models.controller';
import { ModelsService } from './models.service';
import { Model, ModelSchema } from './schema/model.schema';

@Module({
  providers: [ModelsService, TokenTypeGuard],
  controllers: [ModelsController],
  imports: [SharedModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Model.name, schema: ModelSchema },]),
    forwardRef(() => UsersModule)],
  exports: [ModelsService]
})

export class ModelsModule { }
