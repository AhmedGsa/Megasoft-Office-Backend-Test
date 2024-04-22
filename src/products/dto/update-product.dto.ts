import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Category } from "../enum/category.enum";

export class UpdateProductDto {
    @ApiProperty({required: false, description: 'The name of the product', example: 'Iphone 12 Pro Max'})
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty({required: false, description: 'The price of the product', example: 1200})
    @IsOptional()
    @IsNumber()
    price: number;

    @ApiProperty({required: false, enum: Category, description: 'The category of the product', example: Category.ELECTRONICS})
    @IsOptional()
    @IsEnum(Category)
    category: Category;
}
