import { Routes } from '@angular/router';

export const homeRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home').then(h => h.Home),
        children: [
            {
                path: 'products',
                loadChildren: () => import('../products/products.routes').then(p => p.productRoutes),
            },
            {
                path: 'admin/materials',
                loadChildren: () => import('../materials/materials.routes').then(p => p.materialsRoutes),
            },
            {
                path: 'novo-usuario',
                loadComponent: () => import('../new-user/new-user').then(m => m.NewUser)
            },
            {
                path: 'admin/users',
                loadChildren: () => import('../users/users.routes').then(p => p.usersRoutes),
            },
            {
                path: '',
                redirectTo: 'products',
                pathMatch: 'full'
            }
        ]
    }
];
