import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CommonModule } from '@angular/common';
import { CustomersManagementComponent } from '../customers-management/customers-management.component';

@Component({
  selector: 'customers-toolbar',
  imports: [CommonModule, ToolbarModule, ButtonModule, ConfirmDialogModule, CustomersManagementComponent],
  providers: [ConfirmationService, MessageService],
  templateUrl: './customers-toolbar.component.html',
  styleUrl: './customers-toolbar.component.scss'
})
export class CustomersToolbarComponent {


    /**
     * Global variables
    */
    public sendSeeModal : boolean = false;
    public viewDeleteButton : boolean = false;

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.

    }

    /**
     * Open Modal
    */
    OpenNew() {
        this.sendSeeModal = true;
    }

    /**
     * Receive modal status data from the child
    */
    hideModal($event: boolean){
        this.sendSeeModal = $event;
    }

    public DeleteMultipleUsers(event: Event){

    }
}
