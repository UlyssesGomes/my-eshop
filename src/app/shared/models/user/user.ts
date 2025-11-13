import { UserType } from "../../enums/user-type";

export class User {
    id?: number;
    fullName?: string;
    cpf?: string;
    birth?: Date;
    email?: string;
    type?: UserType;
}