import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true, unique: true })
    address: string;

    @Prop({ required: true, default: function () { return this.address; } })
    username: string;

    @Prop({ default: "" }) //추후에 유니크로 변경할 것.
    email: string;

    @Prop({ required: true, default: "BRONZE" })
    plan: string;

    @Prop({ required: true, default: 250 })
    credits: number

    @Prop({ default: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" })
    profileImg: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Model' }], default: [] })
    models: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Model' }], default: [] })
    likedModels: Types.ObjectId[];

    @Prop({ enum: ['active', 'inactive', 'banned'], default: 'active' })
    status: 'active' | 'inactive' | 'banned';

}
export const UserSchema = SchemaFactory.createForClass(User);
