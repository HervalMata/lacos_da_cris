import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {SearchParams, SearchParamsBuilder} from "./http-resource";
import {Observable} from "rxjs";
import {ChatGroup} from "../../model";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ChatGroupHttpService {

    private baseUrl = `${environment.api.url}/chat_groups`;

    constructor(
        private http: HttpClient
    ) {
    }

    list(searchParams: SearchParams): Observable<{ data: Array<ChatGroup>, meta: any }> {
        const sParams = new SearchParamsBuilder(searchParams).makeObject();
        const params = new HttpParams({
            fromObject: (<any>sParams)
        });
        return this.http.get<{ data: Array<ChatGroup>, meta: any }>(this.baseUrl, {
            params,
        });
    }

    get(id: number): Observable<ChatGroup> {
        return this.http.get<{ data: ChatGroup }>(`${this.baseUrl}/${id}`,)
            .pipe(map(response => response.data))
    }

    create(data: ChatGroup): Observable<ChatGroup> {
        return this.http.post<{ data: ChatGroup }>(this.baseUrl, data,)
            .pipe(map(response => response.data))
    }

    update(id: number, data: ChatGroup): Observable<ChatGroup> {
        const formData = this.formDataToSend(data);
        formData.append('_method', 'PUT');

        return this.http.post<{ data: ChatGroup }>(`${this.baseUrl}/${id}`, formData,)
            .pipe(map(response => response.data))
    }

    destroy(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`,)
    }

    private formDataToSend(data): FormData {
        const formData = new FormData();

        if (data.photo) {
            formData.append('photo', data.photo);
        }

        return formData;
    }
}
