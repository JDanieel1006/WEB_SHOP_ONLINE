import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoreDto } from '../../model/Store/StoreDto.model';
import { StoreSubmissionDto } from '../../model/Store/StoreSubmissionDto.model';
import { environment } from '../../../environments/environment.development';
import { StoreArticleDto } from '../../model/Store/StoreArticleDto.model';
import { StoreArticleSubmissionDto } from '../../model/Store/StoreArticleSubmissionDto.model';

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

    public GetStoreArticle(storeId: number, articleId: number){
        return this.http.get<StoreArticleDto>(`${environment.baseUrl}/v1/stores/${storeId}/articles/${articleId}`);
    }

    public GetArticlesByStore(storeId: number){
        return this.http.get<[StoreArticleDto]>(`${environment.baseUrl}/v1/stores/${storeId}/articles`);
    }

    public Create(formData: FormData){
        return this.http.post<StoreDto>(`${environment.baseUrl}/v1/stores`, formData);
    }

    public AddArticleToStore(storeId: number, request: StoreArticleSubmissionDto){
        return this.http.post<StoreArticleDto>(`${environment.baseUrl}/v1/stores/${storeId}/articles`, request);
    }

    public Update(id: number, formData: FormData){
        return this.http.put<StoreDto>(`${environment.baseUrl}/v1/stores/${id}`, formData);
    }

    public Delete(id: number) {
        return this.http.delete(`${environment.baseUrl}/v1/stores/${id}`);
    }

}
