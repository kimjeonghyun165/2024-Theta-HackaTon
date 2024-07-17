import { Controller, Get, Res, Param, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { existsSync } from 'fs';

@Controller('files')
export class FileController {
    @Get(':filename')
    getFbxFile(@Param('filename') filename: string, @Res() res: Response) {
        const filePath = join('/Users/jeonghyun/Desktop/abvil-ai/frontend/public/models/fbx', filename);
        if (existsSync(filePath)) {
            res.sendFile(filePath);
        } else {
            throw new HttpException('File not found', HttpStatus.NOT_FOUND);
        }
    }
}
