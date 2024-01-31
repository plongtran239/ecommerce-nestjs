import { IsNotEmpty, IsString } from 'class-validator';
import { CATEGORY_ERROR_MESSAGES } from 'src/constants';

const { NAME_IS_REQUIRED, NAME_IS_STRING, IMAGE_IS_STRING } =
    CATEGORY_ERROR_MESSAGES;

export class CategoryDto {
    @IsString({ message: NAME_IS_STRING })
    @IsNotEmpty({ message: NAME_IS_REQUIRED })
    name: string;

    @IsString({ message: IMAGE_IS_STRING })
    image: string;
}
