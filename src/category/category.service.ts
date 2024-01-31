import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CategoryDto } from './dto';
import { Category } from 'src/database/schemas';
import {
    CATEGORY_SUCCESS_MESSAGES,
    CATEGORY_ERROR_MESSAGES
} from 'src/constants';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<Category>
    ) {}

    async createCategory(dto: CategoryDto) {
        const existedCategory = await this.findCategoryByName(dto.name);

        if (existedCategory) {
            throw new BadRequestException(
                CATEGORY_ERROR_MESSAGES.NAME_IS_EXISTED
            );
        }

        const newCategory = await this.categoryModel.create(dto);

        return {
            message: CATEGORY_SUCCESS_MESSAGES.CREATE,
            data: newCategory
        };
    }

    async getAllCategories() {
        return {
            message: CATEGORY_SUCCESS_MESSAGES.GET_ALL,
            data: await this.categoryModel.find().lean()
        };
    }

    async updateCategory(updateId: string, dto: CategoryDto) {
        await this.categoryModel
            .findByIdAndUpdate(updateId, {
                $set: {
                    ...dto
                }
            })
            .orFail(
                new BadRequestException(
                    CATEGORY_ERROR_MESSAGES.CATEGORY_NOT_FOUND
                )
            );

        return {
            message: CATEGORY_SUCCESS_MESSAGES.UPDATE
        };
    }

    async deleteCategory(deleteId: string) {
        await this.categoryModel
            .findByIdAndDelete(deleteId)
            .orFail(
                new BadRequestException(
                    CATEGORY_ERROR_MESSAGES.CATEGORY_NOT_FOUND
                )
            );

        return {
            message: CATEGORY_SUCCESS_MESSAGES.DELETE
        };
    }

    async findCategoryById(id: string) {
        return await this.categoryModel.findById(id);
    }

    async findCategoryByName(name: string) {
        return await this.categoryModel.findOne({ name });
    }
}
