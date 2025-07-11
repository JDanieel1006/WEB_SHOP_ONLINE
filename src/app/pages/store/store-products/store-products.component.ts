import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../../../services/Store/Store.service';
import { StoreDto } from '../../../model/Store/StoreDto.model';
import { StoreArticleDto } from '../../../model/Store/StoreArticleDto.model';
import { forkJoin } from 'rxjs';
import { CustomersService } from '../../../services/Customers/Customers.service';
import { CustomerArticleSubmissionDto } from '../../../model/Customers/CustomerArticleSubmissionDto.model';
import { CustomerArticleStatus } from '../../../enums/Customer/CustomerArticleStatus';
import { StoreCartComponent } from '../store-cart/store-cart.component';
import { CartModalService } from '../services/CartModalService.service';

@Component({
  selector: 'app-store-products',
  imports: [CommonModule, StoreCartComponent],
  templateUrl: './store-products.component.html',
  styleUrl: './store-products.component.scss'
})
export class StoreProductsComponent {

    /**
     * Global variables
    */
    public storeId : number = 0;
    public storeDto !: StoreDto;
    public customerId: number = 1;
    public storeArticleDto : StoreArticleDto[] = [];
    public addedToCart = new Set<number>();
    public cartCount : number = 0;
    public showCart : boolean = false;

    /**
     * Injection of services
    */
    private storeService = inject(StoreService);
    private customersService = inject(CustomersService);
    private cartModalService = inject(CartModalService);

    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        this.storeId = Number(this.route.snapshot.paramMap.get('id'));
        this.loadStoreAndArticles();
    }

    private loadStoreAndArticles() {
        forkJoin({
            store: this.storeService.GetById(this.storeId),
            articles: this.storeService.GetArticlesByStore(this.storeId),
            articlesByCustomer: this.customersService.GetArticlesByCustomer(this.customerId, CustomerArticleStatus.InCart)
        }).subscribe({
            next: ({ store, articles, articlesByCustomer }) => {
                this.storeDto = store;
                this.storeArticleDto = articles;

                this.addedToCart.clear();
                if (articlesByCustomer && Array.isArray(articlesByCustomer)) {
                    articlesByCustomer.forEach((item: { articleId: number }) => {
                        this.addedToCart.add(item.articleId);
                    });
                }
                this.cartCount = this.addedToCart.size;
            },
            error: (error) => {
                console.error('Error fetching store or articles:', error);
            }
        });
    }

    public GoToCart(){
        console.log('Cart opened', this.storeArticleDto);
        this.cartModalService.openCart();
    }

    public AddToCart(product: StoreArticleDto) {
        const request : CustomerArticleSubmissionDto = {
            articleId: product.articleId,
            status: CustomerArticleStatus.InCart,
        };
        this.customersService.AddArticleToCustomer(this.customerId,request).subscribe({
            next: (response) => {
                this.addedToCart.add(product.articleId);
                this.cartCount++;
            },
            error: (error) => {
                console.error('Error adding article to cart:', error);
            }
        });
    }

    public onCartCheckout() {
        this.storeArticleDto = [];
        this.cartCount = 0;
        this.addedToCart.clear();
        this.storeArticleDto = [];

        this.loadStoreAndArticles();
    }

    public goToStores() {
         this.router.navigate(['/indexStore']);
    }

    get cartArticles(): StoreArticleDto[] {
        return Array.from(this.addedToCart)
        .map(id => this.storeArticleDto.find(article => article.articleId === id))
        .filter(Boolean) as StoreArticleDto[];
    }
}
