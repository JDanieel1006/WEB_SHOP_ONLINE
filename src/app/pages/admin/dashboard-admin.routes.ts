import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CustomersComponent } from './customers/customers.component';
import { StoresComponent } from "./stores/stores.component";
import { ArticlesComponent } from "./articles/articles.component";
import { AuthAdminComponent } from "./auth-admin/auth-admin.component";
import { authAdminGuard } from "../../guards/auth-admin.guard";


export const dashboardAdminRoutes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [authAdminGuard]
    },
    {
        path: 'customers',
        component: CustomersComponent,
        canActivate: [authAdminGuard]
    },
    {
        path: 'stores',
        component: StoresComponent,
        canActivate: [authAdminGuard]
    },
    {
        path: 'articles',
        component: ArticlesComponent,
        canActivate: [authAdminGuard]
    },
];

export default dashboardAdminRoutes;
