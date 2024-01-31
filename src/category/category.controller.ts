import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards
} from '@nestjs/common';

import { PATHS } from 'src/constants';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { Public, Roles } from 'src/auth/decorator';
import { RoleEnum } from 'src/enums';

const { NAME, ID } = PATHS.CATEGORIES;

@Controller(NAME)
@UseGuards(JwtGuard)
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Post()
    @Roles(RoleEnum.ADMIN)
    createCategory(@Body() dto: CategoryDto) {
        return this.categoryService.createCategory(dto);
    }

    @Public()
    @Get()
    getAllCategories() {
        return this.categoryService.getAllCategories();
    }

    @Put(ID)
    @Roles(RoleEnum.ADMIN)
    updateCategory(@Param('id') categoryId: string, @Body() dto: CategoryDto) {
        return this.categoryService.updateCategory(categoryId, dto);
    }

    @Delete(ID)
    @Roles(RoleEnum.ADMIN)
    deleteCategory(@Param('id') categoryId: string) {
        return this.categoryService.deleteCategory(categoryId);
    }
}
