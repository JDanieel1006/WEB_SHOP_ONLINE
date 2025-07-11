import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleDto } from '../../model/Article/ArticleDto.model';
import { environment } from '../../../environments/environment.development';
import { ArticleSubmissionDto } from '../../model/Article/ArticleSubmissionDto.model';
import { StoreArticleSubmissionDto } from '../../model/Store/StoreArticleSubmissionDto.model';
import { StoreArticleDto } from '../../model/Store/StoreArticleDto.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

    constructor(
        private http: HttpClient
    ) { }

    /**
     * Retrieves a paginated list of registered articles.
     *
     * @returns Observable that emits a paginated response containing Article.
     *
     * ### API Responses:
     * - 200 OK: Returns a paginated list of articles.
     * - 400 Bad Request: The request contains invalid parameters.
     * - 401 Unauthorized: The user is not authenticated.
    */
    public Get() {
        return this.http.get<[ArticleDto]>(`${environment.baseUrl}/v1/articles`);
    }

    public GetById(id: number) {
        return this.http.get<ArticleDto>(`${environment.baseUrl}/v1/articles/${id}`);
    }

    public Create(formData: FormData){
        return this.http.post<ArticleDto>(`${environment.baseUrl}/v1/articles`, formData);
    }

    public Update(id: number, formData: FormData){
        return this.http.put<ArticleDto>(`${environment.baseUrl}/v1/articles/${id}`, formData);
    }

    public Delete(id: number) {
        return this.http.delete(`${environment.baseUrl}/v1/articles/${id}`);
    }

}
