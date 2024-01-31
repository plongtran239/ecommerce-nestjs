import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { COLLECTION_NAMES } from 'src/constants';

@Schema({
    timestamps: true,
    collection: COLLECTION_NAMES.CATEGORIES
})
export class Category {
    @Prop({ required: true, type: String })
    name: string;

    @Prop({ default: '', type: String })
    image: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
