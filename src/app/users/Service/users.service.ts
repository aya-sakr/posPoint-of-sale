import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Iusers } from 'src/app/Models/iusers';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {


  constructor(private http: HttpClient) {}
  getAllUsers(): Observable<Iusers[]> {
    return this.http.get<Iusers[]>(`${environment.apiUrl}/users`);
  }
  postnewUser(newUser: Iusers):Observable<Iusers[]> {
    return this.http.post<Iusers[]>(`${environment.apiUrl}/users`,newUser);
  }
  
    
  deletUser(id: any) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }

  getUserById(id: string): Observable<Iusers> {
    return this.http.get<Iusers>(`${environment.apiUrl}/users/${id}`);
  }

  updateUsers(id: string, model: Iusers):Observable<Iusers>  {
    return this.http.put<Iusers>(`${environment.apiUrl}/users/${id}`, model);
  }
}
