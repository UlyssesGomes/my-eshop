import { UserType } from "../../enums/user-type";

export interface LoggedUser {
    id: number;
    name: string;
    email: string;
    expiration: Date;
    role: UserType
    authorities: string []
}
