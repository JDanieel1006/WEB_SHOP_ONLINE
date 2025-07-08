import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { CustomersToolbarComponent } from './components/customers-toolbar/customers-toolbar.component';
import { CustomersTableComponent } from './components/customers-table/customers-table.component';

@Component({
  selector: 'app-customers',
  imports: [Breadcrumb, CustomersToolbarComponent, CustomersTableComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {
    items: MenuItem[] | undefined;

    home: MenuItem | undefined;

    statuses!: any[];

    loading: boolean = true;

    activityValues: number[] = [0, 100];

    searchValue: string | undefined;


    ngOnInit() {
        this.items = [
            { label: 'Inicio' },
            { label: 'Clientes' },
        ];

        this.home = { icon: 'pi pi-home', routerLink: '/' };
    }
}
