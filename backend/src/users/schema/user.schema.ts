import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CompanySize, Industry, Occupation, TeamSize, UsageOfAnvilAI } from '../dto/survey.dto';

@Schema()
class VerificationCodeDetails {
    @Prop({ required: true })
    code: string;

    @Prop({ required: true })
    expiresIn: number;

    @Prop({ required: true })
    hmac: string;
}

@Schema()
export class Survey {
    @Prop({ default: '' })
    country: string;

    @Prop({ type: [String], enum: Occupation, default: [] })
    occupation: Occupation[];

    @Prop({ default: '' })
    otherOccupation?: string;

    @Prop({ type: [String], enum: Industry, default: [] })
    companyIndustry: Industry[];

    @Prop({ default: '' })
    otherIndustry?: string;

    @Prop({ enum: CompanySize, default: CompanySize.ONLY_ME })
    companySize: CompanySize;

    @Prop({ default: null })
    teamSize?: TeamSize;

    @Prop({ default: null })
    teamSharesAccount?: boolean;

    @Prop({ type: [String], enum: UsageOfAnvilAI, default: [] })
    usageOfAnvilAI: UsageOfAnvilAI[];

    @Prop({ default: '' })
    otherUsageOfAnvilAI?: string;
}

@Schema()
export class LoginMethod {
    @Prop({ required: true, enum: ['email', 'google', 'facebook', 'apple'] })
    method: 'email' | 'google' | 'facebook' | 'apple';

    @Prop({ select: false })
    password?: string;

    @Prop({ default: false })
    isEmailVerified: boolean;

    @Prop({ type: VerificationCodeDetails, default: null })
    verificationCodeDetails?: VerificationCodeDetails;
}

@Schema({ timestamps: true })
export class User extends Document {
    _id: Types.ObjectId;

    @Prop({ required: true })
    username: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ type: LoginMethod })
    loginMethod: LoginMethod;

    @Prop({ default: false })
    isSurveyCompleted: boolean;

    @Prop({ type: Survey, default: {} })
    survey: Survey;

    @Prop({ enum: ['pending', 'active', 'inactive', 'banned'], default: 'pending' })
    status: 'pending' | 'active' | 'inactive' | 'banned';

    @Prop({ default: "https://anvilai.s3.us-east-2.amazonaws.com/default_profile2.png" })
    profileImg: string;

    @Prop({ required: true, default: "BRONZE" })
    plan: string;

    @Prop({ required: true, default: 0 })
    credits: number;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Model' }], default: [] })
    models: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Model' }], default: [] })
    likedModels: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Model' }], default: [] })
    purchasedModels: Types.ObjectId[];

    @Prop({ type: Number, default: 0 })
    totalLikesReceived: number;

    @Prop({ type: Number, default: 0 })
    totalSales: number;

}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function (next) {
    const user = this as User;
    if (user.isModified('loginMethod.password')) {
        const emailLoginMethod = user.loginMethod;
        if (emailLoginMethod.method === 'email' && emailLoginMethod.password) {
            const salt = await bcrypt.genSalt(10);
            emailLoginMethod.password = await bcrypt.hash(emailLoginMethod.password, salt);
        }
    }

    next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user = this as User;
    const emailLoginMethod = user.loginMethod;
    if (emailLoginMethod.method === 'email' && emailLoginMethod.password) {
        return bcrypt.compare(candidatePassword, emailLoginMethod.password);
    }
    return false;
};
