import { Routes } from '@angular/router';

import { PageNotFound } from './pages/page-not-found/page-not-found';
import { NewUser } from './pages/new-user/new-user';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/home/home.routes').then(h => h.homeRoutes),
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(m => m.Login)
    },
    { path: '**', component: PageNotFound }
];
