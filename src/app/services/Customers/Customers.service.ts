import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParamsService } from '../ParamsService/Params.service';
import { Customer } from '../../model/Customers/cutomer.model';
import { environment } from '../../../environments/environment.development';
import { CustomerSubmissionDto } from '../../model/Customers/CustomerSubmissionDto.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

    constructor(
        private http: HttpClient
    ) { }

    /**
     * Retrieves a paginated list of registered customers.
     *
     * @returns Observable that emits a paginated response containing Customer.
     *
     * ### API Responses:
     * - 200 OK: Returns a paginated list of customers.
     * - 400 Bad Request: The request contains invalid parameters.
     * - 401 Unauthorized: The user is not authenticated.
    */
    public Get() {
        return this.http.get<[Customer]>(`${environment.baseUrl}/v1/customers`);
    }

    public GetById(id: number) {
        return this.http.get<Customer>(`${environment.baseUrl}/v1/customers/${id}`);
    }

    public Create(request: CustomerSubmissionDto){
        return this.http.post<Customer>(`${environment.baseUrl}/v1/customers`, request);
    }

    public Update(id: number, request: CustomerSubmissionDto){
        return this.http.put<Customer>(`${environment.baseUrl}/v1/customers/${id}`, request);
    }

    public Delete(id: number) {
        return this.http.delete(`${environment.baseUrl}/v1/customers/${id}`);
    }
}
