import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Category } from "../enum/category.enum";

export class CreateProductDto {
    @ApiProperty({required: true, description: 'The name of the product', example: 'Iphone 12 Pro Max'})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({required: true, description: 'The price of the product', example: 1200})
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty({required: true, enum: Category, description: 'The category of the product', example: Category.ELECTRONICS})
    @IsNotEmpty()
    @IsEnum(Category)
    category: Category;
}
