import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true, unique: true })
    address: string;

    @Prop()
    createdAt: Date;

    @Prop({ required: true, default: "BRONZE" })
    plan: string;

    @Prop({ default: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" })
    profileImg: string;

    @Prop({ required: true, default: function () { return this.address; } })
    username: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Model' }] })
    models: Types.ObjectId[];
}
export const UserSchema = SchemaFactory.createForClass(User);
