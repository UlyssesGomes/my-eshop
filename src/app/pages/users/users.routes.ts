import { Routes } from '@angular/router';

import { Users } from './users';
import { CreateUser } from './create-user/create-user';


export const usersRoutes: Routes = [
    {
        path: '',
        component: Users
    },
    {
        path: 'create',
        component: CreateUser
    }
];
