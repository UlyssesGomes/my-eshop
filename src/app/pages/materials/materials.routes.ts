import { Routes } from "@angular/router";

import { Materials } from "./materials";
import { CreateMaterial } from "./create-material/create-material";

export const materialsRoutes: Routes = [
    {
        path: '',
        component: Materials
    },
    {
        path: 'create',
        component: CreateMaterial
    },
    {
        path: ':id/edit',
        component: CreateMaterial
    }
];