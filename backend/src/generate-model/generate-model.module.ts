import { Module } from '@nestjs/common';
import { TokenTypeGuard } from 'src/common/guards/token-type.guard';
import { SharedModule } from 'src/common/modules/shared.module';
import { UsersModule } from 'src/users/users.module';
import { GenerateModelController } from './generate-model.controller';
import { GenerateModelService } from './generate-model.service';

@Module({
  controllers: [GenerateModelController],
  providers: [GenerateModelService, TokenTypeGuard],
  imports: [UsersModule, SharedModule]
})
export class GenerateModelModule { }
