// create-model.dto.ts
export class CreateModelDto {
    readonly title: string;
    readonly description: string;
    readonly prompt: string;
    readonly preview: string;
    readonly file: string;
    readonly visibility: 'private' | 'public';
}
