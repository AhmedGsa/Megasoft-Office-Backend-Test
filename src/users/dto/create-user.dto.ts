import { Role } from "../enum/role.enum";

export class CreateUserDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: Role;
}
