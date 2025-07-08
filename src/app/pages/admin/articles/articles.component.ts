import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { ArticleToolbarComponent } from './components/article-toolbar/article-toolbar.component';
import { ArticleTableComponent } from './components/article-table/article-table.component';

@Component({
  selector: 'app-articles',
  imports: [Breadcrumb, ArticleToolbarComponent, ArticleTableComponent],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent {

    items: MenuItem[] | undefined;

    home: MenuItem | undefined;

    statuses!: any[];

    loading: boolean = true;

    activityValues: number[] = [0, 100];

    searchValue: string | undefined;


    ngOnInit() {
        this.items = [
            { label: 'Inicio' },
            { label: 'Articulos' },
        ];

        this.home = { icon: 'pi pi-home', routerLink: '/' };
    }
}
