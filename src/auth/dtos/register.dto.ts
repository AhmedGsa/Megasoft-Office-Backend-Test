import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { LoginDto } from "./login.dto";

export class RegisterDto extends LoginDto {
    @ApiProperty({required: true, example: 'Ahmed'})
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({required: true, example: 'Gouasmia'})
    @IsNotEmpty()
    lastName: string;
}