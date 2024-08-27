import { SetMetadata } from '@nestjs/common';

export const TOKEN_TYPE_KEY = 'tokenType';
export const TokenType = (type: 'login' | 'verify') => SetMetadata(TOKEN_TYPE_KEY, type);
