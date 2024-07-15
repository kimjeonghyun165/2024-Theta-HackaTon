export class CreateUserDto {
    readonly address: string;
    readonly plan?: string;
    readonly profileImg?: string;
    readonly username?: string;
    readonly models?: string[];
}