import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Model extends Document {
    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ required: true, unique: true })
    file: string;

    @Prop({ required: true, unique: true })
    title: string;

    @Prop({ required: true, unique: true })
    description: string;

    @Prop({ required: true, unique: true })
    prompt: string;

    @Prop({ required: true, unique: true })
    preview: string

    @Prop({ required: true, default: 0 })
    like: number

    @Prop()
    price: number | null
}
export const UserSchema = SchemaFactory.createForClass(Model);
