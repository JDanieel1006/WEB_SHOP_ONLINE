import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelCustomerTransferService<T> {

    private refreshModelSubject = new ReplaySubject<T | null>(1);

    refreshModel$ = this.refreshModelSubject.asObservable();

    public triggerRefresh(model: T) {
      this.refreshModelSubject.next(model);
    }

    public clearModel() {
      this.refreshModelSubject.next(null);
    }
}
