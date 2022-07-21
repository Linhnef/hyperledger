import { User } from "../User"

export type LoginResponse = {
    token: string
    user: {
        UserName: string;
        UserId: string;
        UserEmail: string;
        UserRole: string;
        Address: string;
        Status: string,
    }
}