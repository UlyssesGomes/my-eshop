import { Routes } from '@angular/router';

import { Home } from './home';
import { Showcase } from '../showcase/showcase';

export const homeRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home').then(h => h.Home),
        children: [
            {
                path: 'vitrine',
                component: Showcase
            },
            {
                path: 'produtos',
                loadChildren: () => import('../products/products.routes').then(p => p.productRoutes),
            },
            {
                path: 'perfil',
                loadChildren: () => import('../user-profile/user-profile.routes').then(p => p.userProfileRoutes),
            },
            {
                path: 'novo-usuario',
                loadComponent: () => import('../new-user/new-user').then(m => m.NewUser)
            },
            {
                path: 'admin/usuarios',
                loadChildren: () => import('../users/users.routes').then(p => p.usersRoutes),
            },
            {
                path: 'admin/highlights',
                loadChildren: () => import('../highlights/highlights.routes').then(h => h.highlightsRoutes)
            },
            {
                path: 'admin/materials',
                loadChildren: () => import('../materials/materials.routes').then(p => p.materialsRoutes),
            },
            {
                path: '',
                redirectTo: 'vitrine',
                pathMatch: 'full'
            }
        ]
    }
];
