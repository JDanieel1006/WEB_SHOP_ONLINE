import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SaleSubmissionDto } from '../../model/Sales/SaleSubmissionDto.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

   constructor(
        private http: HttpClient
    ) { }

    public RegisterSale(request: SaleSubmissionDto) {
        return this.http.post(`${environment.baseUrl}/v1/sales`, request);
    }
}
