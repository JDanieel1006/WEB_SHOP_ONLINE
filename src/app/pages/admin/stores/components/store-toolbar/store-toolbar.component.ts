import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { StoreManagementComponent } from '../store-management/store-management.component';

@Component({
  selector: 'store-toolbar',
  imports: [CommonModule, ToolbarModule, ButtonModule, ConfirmDialogModule, StoreManagementComponent],
  providers: [ConfirmationService, MessageService],
  templateUrl: './store-toolbar.component.html',
  styleUrl: './store-toolbar.component.scss'
})
export class StoreToolbarComponent {

    /**
     * Global variables
    */
    public sendSeeModal : boolean = false;

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
}
