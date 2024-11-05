import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../modules/products';
import { Stock } from '../modules/stock';
@Injectable({
  providedIn: 'root'
})

export class CrudService {
 //private url = "https://api-stockmarobra.onrender.com/products"
 //private url = "http://localhost:3000/products"
  constructor(private http: HttpClient) { }

  add(url: string): Observable<any> {
    let stock = new Stock();
    stock.current_quantity = parseInt((document.getElementById("currentQ") as HTMLInputElement)?.value)
    let product = new Product()
    product.name = (document.getElementById("name") as HTMLInputElement)?.value
    product.width = parseFloat((document.getElementById("width") as HTMLInputElement)?.value)
    product.height = parseFloat((document.getElementById("height") as HTMLInputElement)?.value)
    product.length = parseFloat((document.getElementById("length") as HTMLInputElement)?.value)
    product.stock = stock
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
}
