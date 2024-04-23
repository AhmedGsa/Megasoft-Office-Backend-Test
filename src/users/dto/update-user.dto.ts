import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../enum/role.enum";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({ required: true, example: 'test@example.com' })
    @IsOptional()
    @IsEmail()
    email: string;

    @ApiProperty({ required: true, example: 'password' })
    @IsOptional()
    @IsString()
    password: string;

    @ApiProperty({ required: true, example: 'John' })
    @IsOptional()
    @IsString()
    firstName: string;

    @ApiProperty({ required: true, example: 'Doe' })
    @IsOptional()
    @IsString()
    lastName: string;

    @ApiProperty({ required: true, enum: Role, example: Role.USER})
    @IsOptional()
    @IsEnum(Role)
    role: Role;
}