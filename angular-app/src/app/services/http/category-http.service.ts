import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Category} from "../../model";
import {HttpResource, SearchParams, SearchParamsBuilder} from "./http-resource";
import {AuthService} from "../auth.service";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CategoryHttpService implements HttpResource<Category> {

    private baseUrl = `${environment.api.url}/categories`;

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {
    }

    list(serchParams: SearchParams): Observable<{ data: Array<Category>, meta: any }> {
        const params = new HttpParams({
            fromObject: new SearchParamsBuilder(serchParams).makeObject()
        });
        return this.http.get<{ data: Array<Category>, meta: any }>(this.baseUrl, {
            params,
        });
    }

    get(id: number): Observable<Category> {
        return this.http.get<{ data: Category }>(`${this.baseUrl}/${id}`, )
            .pipe(map(response => response.data))
    }

    create(data: Category): Observable<Category> {
        return this.http.post<{ data: Category }>(this.baseUrl, data, )
            .pipe(map(response => response.data))
    }

    update(id: number, data: Category) : Observable<Category> {
        return this.http.put<{ data: Category }>(`${this.baseUrl}/${id}`, data, )
            .pipe(map(response => response.data))
    }

    destroy(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`, )
    }
}
