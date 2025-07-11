import { Routes } from "@angular/router";
import { IndexStoreComponent } from "./index-store/index-store.component";
import { StoreProductsComponent } from "./store-products/store-products.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "../../guards/auth.guard";
import { RegisterComponent } from "./register/register.component";

export const storeRoutes: Routes = [
    {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
    },
    {
        path: 'index',
        component: AuthComponent
    },
    {
        path: 'indexStore',
        component: IndexStoreComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'store/:id',
        component: StoreProductsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
    }
];

export default storeRoutes;
