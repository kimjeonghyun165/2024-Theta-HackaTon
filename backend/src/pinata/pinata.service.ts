import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as FormData from 'form-data';

@Injectable()
export class PinataService {
    private readonly PINATA_API_KEY = process.env.PINATA_API_KEY;
    private readonly PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;
    private readonly PINATA_API_URL = process.env.PINATA_API_URL;

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
}
