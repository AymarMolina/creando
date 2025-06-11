import { RouterModule,Routes } from '@angular/router';
import { Layout } from './pages/layout/layout';
import { Home } from './pages/home/home';

export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    {
        path: '',
        component: Layout,
        children:[
            {   path:'inicio',
                component:Home
            }
        ]
    }
];
export const AppRoutes = RouterModule.forRoot(routes)