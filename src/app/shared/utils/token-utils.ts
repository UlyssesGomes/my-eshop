import { LocalStoageKey } from "../enums/localstorage-key";
import { LoggedUser } from "../models/user/logged-user";

export class TokenUtils {

    private static readonly ONE_SEC_IN_MILIS = 1000;

    static receiveJwtToken(token: string) {
        localStorage.setItem(LocalStoageKey.ACCESS_TOKEN, token);
        const payload = token.split('.')[1];
        const payloadDecoded = atob(payload);

        const user: LoggedUser = this.getUserFromPayload(payloadDecoded);

        localStorage.setItem(LocalStoageKey.LOGGED_USER, JSON.stringify(user));
    }

    static getValidLoggedUser() {
        const loggedUserString = localStorage.getItem(LocalStoageKey.LOGGED_USER)
        if(loggedUserString)
        {
            const user = JSON.parse(loggedUserString);
            const expirationDate: Date = new Date(user.expiration * this.ONE_SEC_IN_MILIS);
            const currentDate: Date = new Date();

            if(expirationDate > currentDate)
                return user;
            else
                this.clearUserAndToken();
        }

        return undefined;
    }

    private static getUserFromPayload(payload: any) {
        const userJson = JSON.parse(payload);
        const user: LoggedUser = {
            id: userJson.id,
            name: userJson.name,
            email: userJson.sub,
            role: userJson.role,
            expiration: userJson.exp,
            authorities: userJson.authorities
        };

        return user;
    }

    static clearUserAndToken() {
        localStorage.removeItem(LocalStoageKey.LOGGED_USER);
        localStorage.removeItem(LocalStoageKey.ACCESS_TOKEN);
    }

    static isValidToken(token: string) {
        const payload = token.split('.')[1];
        const payloadDecoded = atob(payload);
        const userJson = JSON.parse(payloadDecoded);
        
        if(userJson)
        {
            const currentDate: Date = new Date();
            if((userJson.exp * this.ONE_SEC_IN_MILIS) > currentDate.getTime())
                return true;
            else {
                this.clearUserAndToken();
                return false;
            }
        }
        return false;
    }
}
