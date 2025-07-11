import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartModalService {
  private showCartSubject = new BehaviorSubject<boolean>(false);
  showCart$ = this.showCartSubject.asObservable();

  openCart() { this.showCartSubject.next(true); }
  closeCart() { this.showCartSubject.next(false); }
}
