import { Component } from '@angular/core';
import { Breadcrumb } from 'primeng/breadcrumb';
import { StoreToolbarComponent } from './components/store-toolbar/store-toolbar.component';
import { MenuItem } from 'primeng/api';
import { StoreTableComponent } from './components/store-table/store-table.component';

@Component({
  selector: 'app-stores',
  imports: [Breadcrumb, StoreToolbarComponent, StoreTableComponent],
  templateUrl: './stores.component.html',
  styleUrl: './stores.component.scss'
})
export class StoresComponent {

    items: MenuItem[] | undefined;

    home: MenuItem | undefined;

    statuses!: any[];

    loading: boolean = true;

    activityValues: number[] = [0, 100];

    searchValue: string | undefined;


    ngOnInit() {
        this.items = [
            { label: 'Inicio' },
            { label: 'Tiendas' },
        ];

        this.home = { icon: 'pi pi-home', routerLink: '/' };
    }
}
