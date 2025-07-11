import { Routes } from "@angular/router";
import { IndexStoreComponent } from "./index-store/index-store.component";
import { StoreProductsComponent } from "./store-products/store-products.component";

export const storeRoutes: Routes = [
    {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
    },
    {
        path: 'index',
        component: IndexStoreComponent
    },
    {
        path: 'tienda/:id',
        component: StoreProductsComponent
    }
];

export default storeRoutes;
