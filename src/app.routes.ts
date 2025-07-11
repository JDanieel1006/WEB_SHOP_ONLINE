import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { NotFoundComponent } from './app/pages/not-found/not-found.component';
import { AuthAdminComponent } from './app/pages/admin/auth-admin/auth-admin.component';


export const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: AppLayout,
    loadChildren: () => import('./app/pages/admin/dashboard-admin.routes')
  },
  {
    path: '',
    loadChildren: () => import('./app/pages/store/store.routes')
  },
  {
    path: 'admin',
    component: AuthAdminComponent
  },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: 'notfound' }
];
