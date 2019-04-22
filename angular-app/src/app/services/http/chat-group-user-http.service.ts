import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ChatGroup, User} from "../../model";
import {map} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {SearchParams, SearchParamsBuilder} from "./http-resource";

@Injectable({
    providedIn: 'root'
})
export class ChatGroupUserHttpService {

    private baseApi = `${environment.api.url}`;

    constructor(
        private http: HttpClient
    ) {
    }

    list(chatGroupId: number, searchParams: SearchParams): Observable<{ data: { chat_group: ChatGroup, users: User[] }, meta: any }> {
        const sParams = new SearchParamsBuilder(searchParams).makeObject();
        const params = new HttpParams({
            fromObject: (<any>sParams)
        });

        return this.http.get<{ data: { chat_group: ChatGroup, users: User[] }, meta: any }>
        (this.getBaseUrl(chatGroupId), {params});
    }

    create(chatGroupId: number, usersId: number[]): Observable<{ chat_group: ChatGroup, users: User[] }> {
        return this.http.post<{ data: { chat_group: ChatGroup, users: User[] } }>
        (this.getBaseUrl(chatGroupId), {users: usersId})
            .pipe(map(response => response.data))
    }

    destroy(chatGroupId: number, userId: number) : Observable<any> {
        return this.http.delete(this.getBaseUrl(chatGroupId, userId))
    }

    getBaseUrl(chatGroupId: number, userId: number = null): string {
        let baseUrl = `${environment.api.url}/chat_groups/${chatGroupId}/users`;
        if (userId) {
            baseUrl += `/${userId}`;
        }
        return baseUrl;
    }


}
