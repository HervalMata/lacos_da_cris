import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Category} from "../../model";
import {HttpResource, SearchParams} from "./http-resource";

@Injectable({
    providedIn: 'root'
})
export class CategoryHttpService implements HttpResource<Category> {

    private baseUrl = 'http://localhost:8000/api/categories';

    constructor(private http: HttpClient) {
    }

    list(serchParams: SearchParams): Observable<{ data: Array<Category>, meta: any }> {
        const token = window.localStorage.getItem('token');
        const sParams: any = {
            page: serchParams.page + "",
        };
        if (serchParams.all) {
            sParams.all = 1;
            delete sParams.page;
        }
        const params = new HttpParams({
            fromObject: sParams
        });
        return this.http.get<{ data: Array<Category>, meta }>(this.baseUrl, {
            params,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    get(id: number): Observable<Category> {
        const token = window.localStorage.getItem('token');
        return this.http.get<{ data: Category }>(`${this.baseUrl}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .pipe(map(response => response.data))
    }

    create(data: Category): Observable<Category> {
        const token = window.localStorage.getItem('token');
        return this.http.post<{ data: Category }>(this.baseUrl, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .pipe(map(response => response.data))
    }

    update(id: number, data: Category) : Observable<Category> {
        const token = window.localStorage.getItem('token');
        return this.http.put<{ data: Category }>(`${this.baseUrl}/${id}`, data, {
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
