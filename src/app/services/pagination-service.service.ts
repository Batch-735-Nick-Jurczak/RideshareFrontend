import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth-service/auth.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PaginationServiceService {

  constructor(private http: HttpClient, private router: Router,private authService: AuthService) { }
  url: string = environment.userUri + "/";

  user: User[];
	getAllUsers(user:User,filter:number,page:number): Observable<User[]> {
		return this.http.post<User[]>(this.url+filter+"/"+page,user);
	}
}
