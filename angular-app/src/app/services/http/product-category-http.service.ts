import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Product, ProductCategory} from "../../model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryHttpService {

  constructor(private http: HttpClient) { }

  list(productId: number) : Observable<ProductCategory> {
      const token = window.localStorage.getItem('token');
      return this.http.get<{ data: ProductCategory }>
      (`http://localhost:8000/api/products/${productId}/categories`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
          .pipe(map(response => response.data))
  }

  create(productId: number, categoriesId: number[]) : Observable<ProductCategory> {
      const token = window.localStorage.getItem('token');
      return this.http.post<{ data: ProductCategory }>
      (`http://localhost:8000/api/products/${productId}/categories`, {categories: categoriesId}, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
          .pipe(map(response => response.data))
  }
}
