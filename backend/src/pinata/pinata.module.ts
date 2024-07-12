import { Module } from '@nestjs/common';
import { PinataController } from './pinata.controller';
import { PinataService } from './pinata.service';

@Module({
  controllers: [PinataController],
  providers: [PinataService]
})
export class PinataModule {}
