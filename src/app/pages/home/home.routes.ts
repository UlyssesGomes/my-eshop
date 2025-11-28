import { Routes } from '@angular/router';

export const homeRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home').then(h => h.Home),
        children: [
            {
                path: 'produtos',
                loadChildren: () => import('../products/products.routes').then(p => p.productRoutes),
            },
            {
                path: 'admin/materiais',
                loadChildren: () => import('../materials/materials.routes').then(p => p.materialsRoutes),
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
                path: '',
                redirectTo: 'produtos',
                pathMatch: 'full'
            }
        ]
    }
];
