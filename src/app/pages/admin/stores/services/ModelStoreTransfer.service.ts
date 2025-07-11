import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelStoreTransferService <T>{

    private refreshModelSubject = new ReplaySubject<T | null>(1);
    private refreshNumberSubject = new BehaviorSubject<number | null>(null);

    refreshModel$ = this.refreshModelSubject.asObservable();
    refreshNumber$ = this.refreshNumberSubject.asObservable();

    public triggerRefresh(model: T) {
        this.refreshModelSubject.next(model);
    }

    public triggerNumberRefresh(model: number){
        this.refreshNumberSubject.next(model);
    }

    public clearModel() {
        this.refreshModelSubject.next(null);
    }
    public clearNumber() {
        this.refreshNumberSubject.next(null);
    }

}
