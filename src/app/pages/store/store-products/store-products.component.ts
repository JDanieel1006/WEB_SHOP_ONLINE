import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../../../services/Store/Store.service';
import { StoreDto } from '../../../model/Store/StoreDto.model';
import { StoreArticleDto } from '../../../model/Store/StoreArticleDto.model';
import { forkJoin } from 'rxjs';

interface Shop {
  id: number;
  name: string;
  description: string;
  image: string;
  location: string;
  category: string;
}

interface ProductfAKE {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  shopId: number;
}


@Component({
  selector: 'app-store-products',
  imports: [CommonModule],
  templateUrl: './store-products.component.html',
  styleUrl: './store-products.component.scss'
})
export class StoreProductsComponent {

    /**
     * Global variables
    */
    public storeId : number = 0;
    public storeDto !: StoreDto;
    public storeArticleDto : StoreArticleDto[] = [];

    /**
     * Injection of services
    */
    private storeService = inject(StoreService);
    public cartCount : number = 1;

     constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.storeId = Number(this.route.snapshot.paramMap.get('id'));
        this.loadStoreAndArticles();
    }

    private loadStoreAndArticles() {
        forkJoin({
            store: this.storeService.GetById(this.storeId),
            articles: this.storeService.GetArticlesByStore(this.storeId)
        }).subscribe({
            next: ({ store, articles }) => {
                this.storeDto = store;
                this.storeArticleDto = articles;
            },
            error: (error) => {
                console.error('Error fetching store or articles:', error);
            }
        });
    }

    public GoToCart(){

    }

    AddToCart(product: StoreArticleDto) {
        this.cartCount++;
    }
}
