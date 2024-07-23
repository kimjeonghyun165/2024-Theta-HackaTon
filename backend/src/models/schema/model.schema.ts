import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Model extends Document {
    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    createdBy: Types.ObjectId;

    @Prop({ required: true })
    prompt: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true, unique: true })
    file: string;

    @Prop({ required: true, unique: true })
    preview: string;

    @Prop({ required: true, default: 0 })
    like: number;

    @Prop({ required: true, default: 'public' })
    visibility: 'private' | 'public';

    @Prop({ type: Object, default: { isNft: false } })
    nftDetails?: {
        isNft: boolean,
        ipfsFile?: string,
        ipfsMetadata?: string,
        isListed?: boolean,
        price?: number
    };

    @Prop([{ url: String, selected: Boolean }])
    imgSelection: { url: string; selected: boolean }[];

    @Prop({ required: true })
    selectedImage: string;
}

export const ModelSchema = SchemaFactory.createForClass(Model);
