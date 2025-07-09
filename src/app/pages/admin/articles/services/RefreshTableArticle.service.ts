import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshTableArticleService {

    private refreshTableSubject = new BehaviorSubject<boolean>(false);
    refreshTable$ = this.refreshTableSubject.asObservable();

    triggerRefresh() {
        this.refreshTableSubject.next(true);
    }

    resetRefresh() {
        this.refreshTableSubject.next(false);
    }
}
