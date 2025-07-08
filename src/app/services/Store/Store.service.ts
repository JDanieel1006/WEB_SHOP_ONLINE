import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoreDto } from '../../model/Store/StoreDto.model';
import { StoreSubmissionDto } from '../../model/Store/StoreSubmissionDto.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

    constructor(
        private http: HttpClient
    ) { }

    /**
     * Retrieves a paginated list of registered stores.
     *
     * @returns Observable that emits a paginated response containing store.
     *
     * ### API Responses:
     * - 200 OK: Returns a paginated list of stores.
     * - 400 Bad Request: The request contains invalid parameters.
     * - 401 Unauthorized: The user is not authenticated.
    */
    public Get() {
        return this.http.get<[StoreDto]>(`${environment.baseUrl}/v1/stores`);
    }

    public GetById(id: number) {
        return this.http.get<StoreDto>(`${environment.baseUrl}/v1/stores/${id}`);
    }

    public Create(request: StoreSubmissionDto){
        return this.http.post<StoreDto>(`${environment.baseUrl}/v1/stores`, request);
    }

    public Update(id: number, request: StoreSubmissionDto){
        return this.http.put<StoreDto>(`${environment.baseUrl}/v1/stores/${id}`, request);
    }

    public Delete(id: number) {
        return this.http.delete(`${environment.baseUrl}/v1/stores/${id}`);
    }

}
