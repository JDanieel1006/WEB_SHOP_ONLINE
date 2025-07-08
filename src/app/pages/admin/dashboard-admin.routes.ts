import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CustomersComponent } from './customers/customers.component';


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
    }
];

export default dashboardAdminRoutes;
