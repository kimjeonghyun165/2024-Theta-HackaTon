import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import * as FormData from 'form-data';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class PinataService {
    private readonly PINATA_API_KEY = process.env.PINATA_API_KEY;
    private readonly PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;
    private readonly PINATA_API_URL = process.env.PINATA_API_URL;

    async uploadFileToPinata(filename: string): Promise<string> {
        const filePath = join('/Users/jeonghyun/Desktop/abvil-ai/frontend/public/models/fbx', filename);
        const formData = new FormData();
        formData.append('file', fs.createReadStream(filePath));

        try {
            const response = await axios.post(this.PINATA_API_URL, formData, {
                headers: {
                    ...formData.getHeaders(),
                    pinata_api_key: this.PINATA_API_KEY,
                    pinata_secret_api_key: this.PINATA_SECRET_API_KEY,
                },
                maxContentLength: Infinity,
                maxBodyLength: Infinity,
            });

            if (response.status !== 200) {
                throw new HttpException('Failed to upload file to Pinata', HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return response.data.IpfsHash;
        } catch (error) {
            console.error('Pinata upload error:', error);
            throw new HttpException('Failed to upload file to Pinata', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async uploadToPinata(file: Express.Multer.File) {
        const formData = new FormData();

        formData.append('file', file.buffer, {
            filename: file.originalname,
            contentType: file.mimetype,
            knownLength: file.size
        });

        const response = await axios.post(this.PINATA_API_URL, formData, {
            headers: {
                ...formData.getHeaders(),
                pinata_api_key: this.PINATA_API_KEY,
                pinata_secret_api_key: this.PINATA_SECRET_API_KEY,
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        });

        return response.data;
    }

    async uploadFromUrlToPinata(fileUrl: string): Promise<string> {
        try {
            const response = await axios.get(fileUrl, { responseType: 'stream' });
            const formData = new FormData();
            formData.append('file', response.data, 'file.fbx');
            const pinataResponse = await axios.post(this.PINATA_API_URL, formData, {
                headers: {
                    ...formData.getHeaders(),
                    pinata_api_key: this.PINATA_API_KEY,
                    pinata_secret_api_key: this.PINATA_SECRET_API_KEY,
                },
                maxContentLength: Infinity,
                maxBodyLength: Infinity,
            });

            return pinataResponse.data.IpfsHash;
        } catch (error) {
            console.error('Pinata upload error:', error);
            throw new HttpException('Failed to upload file to Pinata', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
