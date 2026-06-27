import { Routes } from "@angular/router";

import { Address } from "./address/address";
import { ChangeEmail } from "./change-email/change-email";
import { ChangePassword } from "./change-password/change-password";
import { PersonalInfo } from "./personal-info/personal-info";
import { UserProfile } from "./user-profile";

export const userProfileRoutes: Routes = [
    {
        path: '',
        component: UserProfile,
        children: [
            {
                path: 'enderecos',
                component: Address
            },
            {
                path: 'dados-pessoais',
                component: PersonalInfo
            },
            {
                path: 'email',
                component: ChangeEmail
            },
            {
                path: 'senha',
                component: ChangePassword
            },
            {
                path: '',
                redirectTo: 'dados-pessoais',
                pathMatch: 'full'
            }
        ]
    },

];

