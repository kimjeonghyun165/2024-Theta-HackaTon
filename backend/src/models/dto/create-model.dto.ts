export class CreateModelDto {
    readonly prompt: string;
    readonly imgSelection: { url: string; selected: boolean }[]; // 수정된 imgSelection 타입
    readonly title: string;
    readonly description: string;
    readonly file: string;
    readonly preview: string;
    readonly visibility: 'private' | 'public';
    readonly nftDetails: {
        readonly isNft: boolean;
        readonly ipfsFile?: string;
        readonly ipfsMetadata?: string;
        readonly isListed?: boolean;
        readonly price?: number;
    };
    readonly selectedImage: string; // 새로운 필드 추가
}
