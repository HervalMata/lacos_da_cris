import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "../../model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ProductHttpService {

    private baseUrl = 'http://localhost:8000/api/products';

    constructor(private http: HttpClient) {
    }

    list(page: number): Observable<{ data: Array<Product>, meta: any }> {
        const token = window.localStorage.getItem('token');
        const params = new HttpParams({
            fromObject: {
                page: page + ""
            }
        });
        return this.http.get<{ data: Array<Product>, meta }>(this.baseUrl, {
            params,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    get(id: number): Observable<Product> {
        const token = window.localStorage.getItem('token');
        return this.http.get<{ data: Product }>(`${this.baseUrl}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .pipe(map(response => response.data))
    }

    create(data: Product): Observable<Product> {
        const token = window.localStorage.getItem('token');
        return this.http.post<{ data: Product }>(this.baseUrl, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .pipe(map(response => response.data))
    }


    update(id: number, data: Product) {
        const token = window.localStorage.getItem('token');
        return this.http.put<{ data: Product }>(`${this.baseUrl}/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .pipe(map(response => response.data))
    }

    destroy(id: number): Observable<any> {
        const token = window.localStorage.getItem('token');
        return this.http.delete(`${this.baseUrl}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
}
