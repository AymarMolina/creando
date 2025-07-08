import { RouterModule,Routes } from '@angular/router';
import { Layout } from './pages/layout/layout';
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { AdminLayout } from './admin/admin-layout/admin-layout';
import { AdminProducts } from './admin/admin-products/admin-products';
import { AdminDetailProduct } from './admin/admin-detail-product/admin-detail-product';
import { ProductId } from './pages/product-id/product-id';
import { AdminColor } from './admin/admin-color/admin-color';
import { AdminCategories } from './admin/admin-categories/admin-categories';
import { Register } from './auth/register/register';
import { Login } from './auth/login/login';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: Layout,
    children: [
      { path: 'inicio', component: Home },
      { path: 'productos', component: Products },
      { path: 'productos/:id', component: ProductId },
    ]
  },
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [AuthGuard], // ⚠️ Protección por rol
    children: [
      { path: 'productos', component: AdminProducts },
      { path: 'productos/:id', component: AdminDetailProduct },
      { path: 'colores', component: AdminColor },
      { path: 'categorias', component: AdminCategories },
    ]
  },
  { path: 'login', component: Login},
  { path: 'register', component: Register },
];
export const AppRoutes = RouterModule.forRoot(routes)