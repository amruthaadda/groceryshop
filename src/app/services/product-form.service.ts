import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model-classes/product';

@Injectable({
  providedIn: 'root'
})
export class ProductFormService {

  constructor(private http: HttpClient) { }

  gtAllCategories(): Observable<any> {
    return this.http.get('http://localhost:3000/categories');
  }

  saveAllCategories(cat: any): Observable<any> {
    return this.http.post('http://localhost:3000/categories', cat);
  }

  saveProduct(product: Product): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(product);
    return this.http.post( 'http://localhost:3000/products', body, {headers: headers});
  }

  gtAllProducts(): Observable<any> {
    return this.http.get('http://localhost:3000/products');
  }

  getProductById(productId : number): Observable<any> {
    return this.http.get('http://localhost:3000/products/' + productId);
  }

  updateProduct(product : Product, productId : number): Observable<any> {
    return this.http.put('http://localhost:3000/products/' + productId, product);
  }

  deleteProduct(productId : number): Observable<any> {
    return this.http.delete('http://localhost:3000/products/' + productId);
  }
}
