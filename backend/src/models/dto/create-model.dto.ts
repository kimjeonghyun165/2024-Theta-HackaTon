export class CreateModelDto {
    readonly prompt: string;
    readonly imgSelection: { url: string; selected: boolean }[];
    readonly selectedImage: string;
    readonly style: {
        method: 'lowpoly' | 'realistic';
        strength?: 'low' | 'mid' | 'high';
        superResolution?: boolean;
    };
    readonly title: string;
    readonly description: string;
    readonly file: string;
    readonly preview: string;
    readonly visibility?: 'private' | 'public';
    readonly nftDetails: {
        readonly isNft: boolean;
        readonly ipfsFile?: string;
        readonly ipfsMetadata?: string;
        readonly isListed?: boolean;
        readonly price?: number;
    };
}
