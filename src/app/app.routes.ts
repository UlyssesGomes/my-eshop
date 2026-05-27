import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { PageNotFound } from './pages/page-not-found/page-not-found';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/home/home.routes').then(h => h.homeRoutes),
    },
    {
        path: 'login',
        component: Login
    },
    { path: '**', component: PageNotFound }
];
