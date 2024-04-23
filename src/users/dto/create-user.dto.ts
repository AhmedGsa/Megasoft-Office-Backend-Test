import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../enum/role.enum";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ required: true, example: 'test@example.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ required: true, example: 'password' })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({ required: true, example: 'John' })
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty({ required: true, example: 'Doe' })
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @ApiProperty({ required: true, enum: Role, example: Role.USER})
    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;
}
