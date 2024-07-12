import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PinataService } from './pinata.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('pinata')
export class PinataController {
    constructor(private readonly pinataService: PinataService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFileToPinata(@UploadedFile() file: Express.Multer.File) {
        return this.pinataService.uploadToPinata(file);
    }
}
