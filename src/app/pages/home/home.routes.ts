import { Routes } from '@angular/router';

import { Products } from '../products/products';

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
                path: '',
                redirectTo: 'products',
                pathMatch: 'full'
            }
        ]
    }
];
