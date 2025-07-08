import { Component } from '@angular/core';
import { ArticleManagementComponent } from '../article-management/article-management.component';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'article-toolbar',
  imports: [CommonModule, ToolbarModule, ButtonModule, ConfirmDialogModule, ArticleManagementComponent],
  providers: [ConfirmationService, MessageService],
  templateUrl: './article-toolbar.component.html',
  styleUrl: './article-toolbar.component.scss'
})
export class ArticleToolbarComponent {

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
