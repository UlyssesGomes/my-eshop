import { Routes } from "@angular/router";

import { CreateHighlight } from "./create-highlight/create-highlight";
import { Highlights } from "./highlights";

export const highlightsRoutes: Routes = [
    {
        path: '',
        component: Highlights
    },
    {
        path: 'create',
        component: CreateHighlight
    }
];