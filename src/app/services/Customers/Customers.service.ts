import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../../model/Customers/cutomer.model';
import { environment } from '../../../environments/environment.development';
import { CustomerSubmissionDto } from '../../model/Customers/CustomerSubmissionDto.model';
import { CustomerArticleDto } from '../../model/Customers/CustomerArticleDto.mode';
import { CustomerArticleSubmissionDto } from '../../model/Customers/CustomerArticleSubmissionDto.model';
import { CustomerArticleStatus } from '../../enums/Customer/CustomerArticleStatus';

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

    public GetArticlesByCustomer(id: number, status: CustomerArticleStatus) {
        return this.http.get<CustomerArticleDto[]>(`${environment.baseUrl}/v1/customers/${id}/articles?status=${status}`);
    }

    public Create(request: CustomerSubmissionDto){
        return this.http.post<Customer>(`${environment.baseUrl}/v1/customers`, request);
    }

    public AddArticleToCustomer(id: number, request: CustomerArticleSubmissionDto){
        return this.http.post<CustomerArticleDto>(`${environment.baseUrl}/v1/customers/${id}/articles`, request);
    }

    public Update(id: number, request: CustomerSubmissionDto){
        return this.http.put<Customer>(`${environment.baseUrl}/v1/customers/${id}`, request);
    }

    public Delete(id: number) {
        return this.http.delete(`${environment.baseUrl}/v1/customers/${id}`);
    }
}
