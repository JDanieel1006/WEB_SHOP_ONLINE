import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogService } from '../../../../../services/ConfirmDialogService/ConfirmDialog.service';
import { ArticleDto } from '../../../../../model/Article/ArticleDto.model';
import { ArticleService } from '../../../../../services/Article/Article.service';
import { ModelArticleTransferService } from '../../services/ModelArticleTransfer.service';
import { ConfirmDialogDto } from '../../../../../model/Shared/Dialog/ConfirmDialogDto.model';
import { Severity } from '../../../../../enums/Severety/Severity.enum';
import { Subscription } from 'rxjs';
import { RefreshTableArticleService } from '../../services/RefreshTableArticle.service';

@Component({
  selector: 'article-table',
  imports: [TableModule, CommonModule, ButtonModule, ConfirmDialogModule, TagModule, ToastModule],
  providers: [ConfirmationService, ConfirmDialogService, MessageService],
  templateUrl: './article-table.component.html',
  styleUrl: './article-table.component.scss'
})
export class ArticleTableComponent {

    /**
     * Global variables
    */
    public articles : ArticleDto[] = [];
    private subscription !: Subscription;

    /**
     * Injection of services
    */
    private articleService = inject(ArticleService);
    private messageService = inject(MessageService);
    private confirmDialogService = inject(ConfirmDialogService);
    private modelArticleTransferService = inject(ModelArticleTransferService);
    private refreshTableService = inject(RefreshTableArticleService);

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.Get();

        this.subscription = this.refreshTableService.refreshTable$.subscribe( (shouldRefresh) => {
            if(shouldRefresh){
                this.Get();
                this.refreshTableService.resetRefresh();
            }
        });
    }

    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }

    private Get(){
        this.articleService.Get().subscribe({
            next: (response: ArticleDto[]) => {
                this.articles = response;
            },
            error: (error) => {
                console.error('Error fetching customers:', error);
            }
        });
    }

    public Edit(customer: ArticleDto) {
        this.modelArticleTransferService.triggerRefresh(customer);
    }

    public Delete(storeId: number) {
        this.articleService.Delete(storeId).subscribe({
            next: () => {
                this.Get();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Articulo eliminado correctamente.',
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
            message: "¿ Desea confirmar la eliminación del articulo ?",
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
