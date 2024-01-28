import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { COLLECTION_NAMES } from 'src/constants';
import { Roles } from 'src/enums';

@Schema({
    timestamps: true,
    collection: COLLECTION_NAMES.USERS
})
export class User {
    @Prop({ required: true, type: String })
    username: string;

    @Prop({ required: true, type: String })
    email: string;

    @Prop({ required: true, type: String })
    password: string;

    @Prop({ required: true, type: String, length: 10 })
    phone: string;

    @Prop({ required: true, type: String })
    address: string;

    @Prop({ default: '', type: String })
    avatar: string;

    @Prop({ default: true, type: Boolean })
    isActive: boolean;

    @Prop({ default: false, type: Boolean })
    verified: boolean;

    @Prop({ required: true, type: Number, enum: Roles })
    role: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
