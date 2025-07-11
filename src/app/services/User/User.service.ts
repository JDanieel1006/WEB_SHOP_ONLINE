import { Injectable } from '@angular/core';
import { UserSubmissionDto } from '../../model/User/UserSubmissionDto.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(
          private http: HttpClient
    ) { }

  public Login(request: UserSubmissionDto){
    return this.http.post<{ token: string }>(`${environment.baseUrl}/v1/user/login`, request);
  }

}
