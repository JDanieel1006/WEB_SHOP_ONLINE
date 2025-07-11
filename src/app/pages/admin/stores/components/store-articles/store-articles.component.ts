import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ArticleDto } from '../../../../../model/Article/ArticleDto.model';
import { forkJoin, Subscription } from 'rxjs';
import { ArticleService } from '../../../../../services/Article/Article.service';
import { MessageService } from 'primeng/api';
import { ConfirmDialogService } from '../../../../../services/ConfirmDialogService/ConfirmDialog.service';
import { ModelStoreTransferService } from '../../services/ModelStoreTransfer.service';
import { StoreService } from '../../../../../services/Store/Store.service';
import { StoreArticleDto } from '../../../../../model/Store/StoreArticleDto.model';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { Severity } from '../../../../../enums/Severety/Severity.enum';
import { StoreArticleSubmissionDto } from '../../../../../model/Store/StoreArticleSubmissionDto.model';

@Component({
  selector: 'store-articles',
  imports: [CommonModule, DataViewModule, ButtonModule, TagModule, DialogModule, ToastModule],
  templateUrl: './store-articles.component.html',
  styleUrl: './store-articles.component.scss'
})
export class StoreArticlesComponent {

    /**
     * * @Input && @Output
    */
    @Input()
        public visible : boolean = false; // Indicates whether the component should be displayed or not, its value is received from the parent component.
    @Output()
        public visibleChange = new EventEmitter<boolean>();

    /**
     * Global variables
    */
    public articles: ArticleDto[] = [];
    public articlesByStore: StoreArticleDto[] = [];
    public articlesOnProcess: number[] = [];
    public severity = Severity;
    private subscription !: Subscription;
    private storeId: number = 0;


    /**
     * Injection of services
    */
    private articleService = inject(ArticleService);
    private storeService = inject(StoreService);
    private messageService = inject(MessageService);
    private confirmDialogService = inject(ConfirmDialogService);
    private modelStoreTransferService = inject(ModelStoreTransferService);

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.subscription = this.modelStoreTransferService.refreshNumber$.subscribe((model) => {
            if (model) {
                this.storeId = model;
                this.GetArticles();
                this.GetArticlesByStoreId(model);
                this.visible = true;
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

    private GetArticles(){
        this.subscription = this.articleService.Get().subscribe({
            next: (articles) => {
                this.articles = articles;
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error al cargar los articulos'
                });
            }
        });
    }

    private GetArticlesByStoreId(storeId: number) {
        this.subscription = this.storeService.GetArticlesByStore(storeId).subscribe({
            next: (articles) => {
                console.log('Artículos en el almacén:', articles);
               const articleIds = articles.map(article => article.articleId);
               this.articlesOnProcess = articleIds;
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error al cargar los articulos del almacen'
                });
            }
        });
    }

    public AddToStore(article: ArticleDto){
        if (!this.articlesOnProcess.includes(article.id)) {
            this.articlesOnProcess.push(article.id);
        }
    }

    public RemoveFromStore(article: ArticleDto) {
        this.articlesOnProcess = this.articlesOnProcess.filter(id => id !== article.id);
    }

    public HideDialog(){
        this.articlesOnProcess = [];
        this.modelStoreTransferService.clearNumber();
        this.storeId = 0;
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }

    public postAllArticlesToStore() {
        const requests = this.articlesOnProcess.map(id => {
            const request: StoreArticleSubmissionDto = { articleId: id };
            return this.storeService.AddArticleToStore(this.storeId, request);
        });
        return forkJoin(requests);
    }

    public Save(){
        this.postAllArticlesToStore().subscribe({
            next: responses => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Artículos guardados correctamente.'
                });
                this.HideDialog();
            },
            error: err => {
                console.error('Error al enviar artículos:', err);
            }
        });
    }

}
