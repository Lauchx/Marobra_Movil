import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../modules/products';
import { Stock } from '../modules/stock';
import { ProductSold } from '../modules/productSold';
@Injectable({
  providedIn: 'root'
})

export class CrudService {
 //private url = "https://api-stockmarobra.onrender.com/products"
 //private url = "http://localhost:3000/products"
  constructor(private http: HttpClient) { }

  add(url: string, product: Object): Observable<any> {
    return this.http.post(url, product, { observe: 'response' })
  }

  get(url: string): Observable<any> {
    return this.http.get(url)
  }
  delete(id: string, url: string): Observable<any> {
    return this.http.delete(url + "/" + id)
  }
  upgrade(product: Product, url: string): Observable<any> {
    return this.http.put(url + "/" + product.id, product)
  }
  getById(id: string, url: string): Observable<any>{
    return this.http.get(url + "/" + id)
  }
  upgradeProductSold(productSold: ProductSold, url: string): Observable<any> {
    return this.http.put(url + "/" + productSold.id, productSold)
  }
}
