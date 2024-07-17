import { Controller, Get, Param, HttpException, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PinataService } from './pinata.service';

@Controller('pinata')
export class PinataController {
    constructor(private readonly pinataService: PinataService) { }

    @Get('upload/:filename')
    async uploadFile(@Param('filename') filename: string) {
        try {
            const ipfsHash = await this.pinataService.uploadFileToPinata(filename);
            return { url: `https://gateway.pinata.cloud/ipfs/${ipfsHash}` };
        } catch (error) {
            throw new HttpException('Failed to upload file to Pinata', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFileToPinata(@UploadedFile() file: Express.Multer.File) {
        return this.pinataService.uploadToPinata(file);
    }
}
