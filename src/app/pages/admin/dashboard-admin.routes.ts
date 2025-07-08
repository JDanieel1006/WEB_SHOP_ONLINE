import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CustomersComponent } from './customers/customers.component';
import { StoresComponent } from "./stores/stores.component";
import { ArticlesComponent } from "./articles/articles.component";


export const dashboardAdminRoutes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'customers',
        component: CustomersComponent
    },
    {
        path: 'stores',
        component: StoresComponent
    },
    {
        path: 'articles',
        component: ArticlesComponent
    },
];

export default dashboardAdminRoutes;
