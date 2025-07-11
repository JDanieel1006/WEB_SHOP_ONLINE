import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { StoreArticleDto } from '../../../model/Store/StoreArticleDto.model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';
import { CartModalService } from '../services/CartModalService.service';
import { SalesService } from '../../../services/Sales/Sales.service';
import { SaleArticleSubmissionDto } from '../../../model/Sales/SaleArticleSubmissionDto.model';
import { SaleSubmissionDto } from '../../../model/Sales/SaleSubmissionDto.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'store-cart',
  imports: [DialogModule, CommonModule, ButtonModule, ToastModule],
  providers:[MessageService, ConfirmationService],
  templateUrl: './store-cart.component.html',
  styleUrl: './store-cart.component.scss'
})
export class StoreCartComponent {

    @Input() public cartArticles: StoreArticleDto[] = [];
    @Input() public showCart : boolean = false;
    @Input() public storeId: number = 0;
    @Input() public customerId: number = 0;
    @Output() public checkout = new EventEmitter<void>();
    @Output() public articleRemoved = new EventEmitter<StoreArticleDto>();

    private subscription = new Subscription();

    private cartModalService = inject(CartModalService);
    private salesService = inject(SalesService);
    private messageService = inject(MessageService);

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.subscription.add(
            this.cartModalService.showCart$.subscribe(val => this.showCart = val)
        );
        this.customerId = parseInt(localStorage.getItem('userId') || '1', 10);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    public removeFromCart(art: StoreArticleDto) {
        this.articleRemoved.emit(art);
    }

    public onCheckout() {
        const articles: SaleArticleSubmissionDto[] = this.cartArticles.map(art => ({
            articleId: art.articleId,
            quantity: 1,
            unitPrice: art.articlePrice
        }));

        const request: SaleSubmissionDto = {
            storeId: this.storeId,
            customerId: this.customerId,
            articles: articles
        };

        this.salesService.RegisterSale(request).subscribe({
            next: (resp) => {
                this.messageService.add({
                    severity: 'success',
                    summary: `Venta registrada`,
                    detail: `Se ha registrado la venta correctamente`
                });
                this.cartArticles = [];
                this.cartModalService.closeCart();
                this.checkout.emit();
                this.showCart = false;
            },
            error: (err) => {
                alert('Error al registrar la venta');
                console.error(err);
            }
        });
    }

    public onHide() {
        this.cartModalService.closeCart();
    }

    get cartTotal(): number {
        return this.cartArticles.reduce((acc, art) => acc + (art.articlePrice || 0), 0);
    }
}
