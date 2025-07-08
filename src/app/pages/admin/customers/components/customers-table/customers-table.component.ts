import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CustomersService } from '../../../../../services/Customers/Customers.service';
import { Customer } from '../../../../../model/Customers/cutomer.model';

@Component({
  selector: 'customers-table',
  imports: [TableModule, CommonModule],
  templateUrl: './customers-table.component.html',
  styleUrl: './customers-table.component.scss'
})
export class CustomersTableComponent {

    /**
     * Global variables
    */
    public customers : Customer[] = [];

    /**
     * Injection of services
    */
    private customersService = inject(CustomersService);

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.Get();
    }

    private Get(){
        this.customersService.Get().subscribe({
            next: (response: Customer[]) => {
                this.customers = response;
            },
            error: (error) => {
                console.error('Error fetching customers:', error);
            }
        });
    }
}
