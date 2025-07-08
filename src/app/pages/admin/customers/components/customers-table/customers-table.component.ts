import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CustomersService } from '../../../../../services/Customers/Customers.service';
import { Customer } from '../../../../../model/Customers/cutomer.model';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogDto } from '../../../../../model/Shared/Dialog/ConfirmDialogDto.model';
import { Severity } from '../../../../../enums/Severety/Severity.enum';
import { ConfirmDialogService } from '../../../../../services/ConfirmDialogService/ConfirmDialog.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ModelCustomerTransferService } from '../../services/ModelCustomerTransfer';

@Component({
  selector: 'customers-table',
  imports: [TableModule, CommonModule, ButtonModule, ConfirmDialogModule, TagModule, ToastModule],
  providers: [ConfirmationService, ConfirmDialogService, MessageService],
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
    private messageService = inject(MessageService);
    private confirmDialogService = inject(ConfirmDialogService);
    private modelTransferService = inject(ModelCustomerTransferService);

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

    public Edit(customer: Customer) {
        this.modelTransferService.triggerRefresh(customer);
    }

    public Delete(customerId: number) {
        this.customersService.Delete(customerId).subscribe({
            next: () => {
                this.Get();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Cliente eliminado correctamente.',
                    life: 3000
                });
            },
            error: (error) => {
                console.error('Error deleting customer:', error);
            }
        });
    }

    public ConfirmDelete(event: Event, customerId: number){
        const dialogDto : ConfirmDialogDto = {
            header: "Eliminación",
            message: "¿ Desea confirmar la eliminación del cliente ?",
            labelReject : "Cancelar",
            labelAccept: "Eliminar",
            Severety : Severity.error
        };

        this.confirmDialogService.confirm(event, dialogDto).subscribe((confirmed) => {
            if(!confirmed)return;
            this.Delete(customerId);
        });
    }
}
