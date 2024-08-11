import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true })
    username: string;

    @Prop({ default: "", unique: true })
    email: string;

    @Prop({ required: true, default: "BRONZE" })
    plan: string;

    @Prop({ required: true, default: 250 })
    credits: number

    @Prop({ default: "https://anvilai.s3.us-east-2.amazonaws.com/ImageSelection/default_profile.png" })
    profileImg: string;

    @Prop({ default: "https://anvilai.s3.us-east-2.amazonaws.com/default_profile2.png" })
    representativeModel: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Model' }], default: [] })
    models: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Model' }], default: [] })
    likedModels: Types.ObjectId[];

    @Prop({ enum: ['active', 'inactive', 'banned'], default: 'active' })
    status: 'active' | 'inactive' | 'banned';

}
export const UserSchema = SchemaFactory.createForClass(User);

// 내가 구매한 모델들 리스팅, 배열 형태로 오브젝트 타입과 얼마에 언제 구매했는지 객체 형태로 보관해야할듯.
// 크레딧 충전 기능, 결제 모듈 따로 만들 예정, 결제하고 크레딧을 충전하게 되면 더해주는?? 그런 함수 필요 (addCredits 이용) -> 내부함수