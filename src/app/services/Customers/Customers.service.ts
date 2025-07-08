import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParamsService } from '../ParamsService/Params.service';
import { Customer } from '../../model/Customers/cutomer.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

    constructor(
        private http: HttpClient,
        private paramsService:ParamsService
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
}
