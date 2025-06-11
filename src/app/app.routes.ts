import { RouterModule,Routes } from '@angular/router';
import { Layout } from './pages/layout/layout';
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';

export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    {
        path: '',
        component: Layout,
        children:[
            {   path:'inicio',
                component:Home
            },
            {   path:'productos',
                component:Products
            }
        ]
    }
];
export const AppRoutes = RouterModule.forRoot(routes)