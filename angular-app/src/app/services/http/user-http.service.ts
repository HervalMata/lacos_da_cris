import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {SearchParams, SearchParamsBuilder} from "./http-resource";
import {Observable} from "rxjs";
import {User} from "../../model";
import {map} from "rxjs/operators";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserHttpService {

    private baseUrl = `${environment.api.url}/users`;

    constructor(private http: HttpClient) {
    }

    list(serchParams: SearchParams): Observable<{ data: Array<User>, meta: any }> {
        const params = new HttpParams({
            fromObject: new SearchParamsBuilder(serchParams).makeObject()
        });
        return this.http.get<{ data: Array<User>, meta }>(this.baseUrl, {
            params,
        });
    }

    get(id: number): Observable<User> {
        return this.http.get<{ data: User }>(`${this.baseUrl}/${id}`)
            .pipe(map(response => response.data))
    }

    create(data: User): Observable<User> {
        return this.http.post<{ data: User }>(this.baseUrl, data)
            .pipe(map(response => response.data))
    }


    update(id: number, data: User): Observable<User> {
        return this.http.put<{ data: User }>(`${this.baseUrl}/${id}`, data)
            .pipe(map(response => response.data))
    }

    destroy(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`)
    }
}
