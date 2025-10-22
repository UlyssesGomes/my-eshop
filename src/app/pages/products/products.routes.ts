import { Routes } from '@angular/router';

import { CreateProduct } from './create-product/create-product';
import { Products } from './products';

export const productRoutes: Routes = [
    {
        path: '',
        component: Products
    },
    {
        path: 'create',
        component: CreateProduct
    }
];
