import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {SearchParams, SearchParamsBuilder} from "./http-resource";
import {Observable} from "rxjs";
import {User} from "../../model";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class UserHttpService {

    private baseUrl = 'http://localhost:8000/api/users';

    constructor(private http: HttpClient) {
    }

    list(serchParams: SearchParams): Observable<{ data: Array<User>, meta: any }> {
        const token = window.localStorage.getItem('token');
        const params = new HttpParams({
            fromObject: new SearchParamsBuilder(serchParams).makeObject()
        });
        return this.http.get<{ data: Array<User>, meta }>(this.baseUrl, {
            params,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    get(id: number): Observable<User> {
        const token = window.localStorage.getItem('token');
        return this.http.get<{ data: User }>(`${this.baseUrl}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .pipe(map(response => response.data))
    }

    create(data: User): Observable<User> {
        const token = window.localStorage.getItem('token');
        return this.http.post<{ data: User }>(this.baseUrl, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .pipe(map(response => response.data))
    }


    update(id: number, data: User): Observable<User> {
        const token = window.localStorage.getItem('token');
        return this.http.put<{ data: User }>(`${this.baseUrl}/${id}`, data, {
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
