import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogService } from '../../../../../services/ConfirmDialogService/ConfirmDialog.service';
import { StoreDto } from '../../../../../model/Store/StoreDto.model';
import { StoreService } from '../../../../../services/Store/Store.service';
import { ModelCustomerTransferService } from '../../../customers/services/ModelCustomerTransfer';
import { ConfirmDialogDto } from '../../../../../model/Shared/Dialog/ConfirmDialogDto.model';
import { Severity } from '../../../../../enums/Severety/Severity.enum';

@Component({
  selector: 'store-table',
  imports: [TableModule, CommonModule, ButtonModule, ConfirmDialogModule, TagModule, ToastModule],
  providers: [ConfirmationService, ConfirmDialogService, MessageService],
  templateUrl: './store-table.component.html',
  styleUrl: './store-table.component.scss'
})
export class StoreTableComponent {

    /**
     * Global variables
    */
    public stores : StoreDto[] = [];

    /**
     * Injection of services
    */
    private storeService = inject(StoreService);
    private messageService = inject(MessageService);
    private confirmDialogService = inject(ConfirmDialogService);
    private modelTransferService = inject(ModelCustomerTransferService);

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.Get();
    }

    private Get(){
        this.storeService.Get().subscribe({
            next: (response: StoreDto[]) => {
                this.stores = response;
            },
            error: (error) => {
                console.error('Error fetching customers:', error);
            }
        });
    }

    public Edit(customer: StoreDto) {
        this.modelTransferService.triggerRefresh(customer);
    }

    public Delete(storeId: number) {
        this.storeService.Delete(storeId).subscribe({
            next: () => {
                this.Get();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Tienda eliminada correctamente.',
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
            message: "¿ Desea confirmar la eliminación de la tienda ?",
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
