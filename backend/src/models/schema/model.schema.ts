import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Model extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    createdBy: Types.ObjectId;

    @Prop({ required: true })
    prompt: string;

    @Prop([{ url: String, selected: Boolean }])
    imgSelection: { url: string; selected: boolean }[];

    @Prop({ required: true })
    selectedImage: string;

    @Prop({ type: Object, required: true })
    style: {
        method: 'lowpoly' | 'realistic',
        strength?: 'low' | 'mid' | 'high',
        superResolution?: boolean
    };

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true, unique: true })
    file: string;

    @Prop({ required: true, unique: true })
    preview: string;

    @Prop({ default: 0 })
    like: number;

    @Prop({ required: true, default: 'public' })
    visibility: 'private' | 'public';

    @Prop({ required: true, default: false })
    listing: boolean;

    @Prop({ default: null })
    price: number | null
}
export const ModelSchema = SchemaFactory.createForClass(Model);


// 모델 추가해야할 요소들
// 리스팅 중인가 (판매중인가?), 판매중이라면 얼마에 판매중인가? (달러로 표기)
// 얼만큼 팔렸고 얼마에 팔렸는가?, sell 횟수에 대한 요소와 거래량 값들을 기입
// 거래내역?? 누가 얼마에 언제 삿는가? -> 필요할까? 