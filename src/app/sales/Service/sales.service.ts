import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sales } from 'src/app/Models/sales';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  apiUrl: string = 'http://localhost:3000/sales'

  constructor(private http: HttpClient) {
    
  }
 postnewProduct(newProduct:Sales):Observable<Sales[]> {
    return this.http.post<Sales[]>(this.apiUrl, newProduct);
 }
  getAllSalesProduct():Observable<Sales[]>
  {
    return this.http.get<Sales[]>(this.apiUrl)
  }
}
