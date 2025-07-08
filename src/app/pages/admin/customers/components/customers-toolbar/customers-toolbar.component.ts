import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'customers-toolbar',
  imports: [CommonModule, ToolbarModule, ButtonModule, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './customers-toolbar.component.html',
  styleUrl: './customers-toolbar.component.scss'
})
export class CustomersToolbarComponent {


    public viewDeleteButton : boolean = false;

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.

    }

    public OpenNew(){

    }

    public DeleteMultipleUsers(event: Event){

    }
}
