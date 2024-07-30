import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { GenerateModelController } from './generate-model.controller';
import { GenerateModelService } from './generate-model.service';

@Module({
  controllers: [GenerateModelController],
  providers: [GenerateModelService],
  imports: [UsersModule]
})
export class GenerateModelModule { }
