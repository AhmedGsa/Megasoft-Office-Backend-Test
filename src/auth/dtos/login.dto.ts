import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class LoginDto {
    @ApiProperty({required: true, example: 'test@example.com'})
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({required: true, example: 'password'})
    @IsNotEmpty()
    // @IsStrongPassword({minLength: 8, minUppercase: 1, minLowercase: 1, minNumbers: 1, minSymbols: 1})
    password: string;
}