import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { StoreDto } from '../../../model/Store/StoreDto.model';
import { StoreService } from '../../../services/Store/Store.service';
import { Router, RouterModule } from '@angular/router';


interface Shop {
  name: string;
  description: string;
  image: string;
  location: string;
  category: string;
  url: string;
}

@Component({
  selector: 'app-index-store',
  imports: [CommonModule, RouterModule],
  templateUrl: './index-store.component.html',
  styleUrl: './index-store.component.scss'
})
export class IndexStoreComponent {

    /**
     * Global variables
    */
    public stores : StoreDto[] = [];

    /**
     * Injection of services
    */
    private storeService = inject(StoreService);

    constructor(private router: Router) {}

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.Get();
    }

    private Get(){
        this.storeService.Get().subscribe({
            next: (response: StoreDto[]) => {
                this.stores = response;
            },
            error: (error) => {
                console.error('Error fetching customers:', error);
            }
        });
    }

    public ViewStore(store: StoreDto) {
        this.router.navigate(['/store', store.id]);
    }

    public goToAdmin(){
        this.router.navigate(['/dashboard']);
    }

}
