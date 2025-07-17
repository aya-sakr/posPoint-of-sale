import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Items } from 'src/app/Models/items';
import { environment } from 'src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  constructor(private http: HttpClient) {
   
  }

  getAllItems():Observable<Items[]> {
    return  this.http.get<Items[]>(`${environment.apiUrl}/items`)

  }
  postnewUser(newItem: Items):Observable<Items[]> {
      return this.http.post<Items[]>(`${environment.apiUrl}/items`, newItem);
  }
  
  getItemById(id: string):Observable<Items>
   {
    return this.http.get<Items>(`${environment.apiUrl}/items/${id}`)
  }

  updateItem(id:string,updateItem:Items) :Observable<Items>{
    return this.http.put<Items>(`${environment.apiUrl}/items/${id}`,updateItem)
  }

  deletItem(id: string):Observable<Items> {
    return this.http.delete<Items>(`${environment.apiUrl}/items/${id}`);
    
  }
  getProductByBarcode(barcode: string):any {
    const params = new HttpParams().set('barcode',barcode)
    return this.http.get(`${environment.apiUrl}/items`,{params});
  }
 
  getProductByName(query: string) {
    const params = new HttpParams().set('name',query)
    return this.http.get(`${environment.apiUrl}/items`,{params});
    
  }
  updateBarcodeOnly(id: string, barcode: any) {
    return this.http.patch(`${environment.apiUrl}/items/${id}`, {
      barcode: barcode
    });
  }
  updateQuantity(id: string, quantity: any) {
    return this.http.patch(`${environment.apiUrl}/items/${id}`, {
      quantity: quantity
    });
  }
}


