import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";
import { Category } from "../enum/category.enum";
import { ProductOrderBy } from "../enum/product-orderby.enum";

export class FilterProductsDto {
    @ApiProperty({required: false, description: 'The name of the product', example: 'Iphone 12 Pro Max'})
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty({required: false, enum: Category, description: 'The category of the product', example: Category.ELECTRONICS})
    @IsOptional()
    @IsEnum(Category)
    category: Category;

    @ApiProperty({required: false, description: 'The minimum price of the product', example: 1000})
    @IsOptional()
    @IsNumberString()
    minPrice: number;

    @ApiProperty({required: false, description: 'The maximum price of the product', example: 2000})
    @IsOptional()
    @IsNumberString()
    maxPrice: number;

    @ApiProperty({required: false, description: 'Number of page', example: 1})
    @IsOptional()
    @IsNumberString()
    page: number = 1;

    @ApiProperty({required: false, description: 'Number of products per page', example: 10})
    @IsOptional()
    @IsNumberString()
    pageSize: number = 10;

    @ApiProperty({required: false, enum: ProductOrderBy, description: 'The field to order by', example: ProductOrderBy.NAME})
    @IsOptional()
    @IsEnum(ProductOrderBy)
    orderBy: ProductOrderBy = ProductOrderBy.NAME;

    @ApiProperty({required: false, enum: ['ASC', 'DESC'], description: 'The order of the result', example: 'ASC'})
    @IsOptional()
    @IsString()
    order: 'ASC' | 'DESC' = 'ASC';

}