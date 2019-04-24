import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

/*
  Generated class for the HttpChatMessageHttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatMessageHttpProvider {

    constructor(public http: HttpClient) {
        console.log('Hello HttpChatMessageHttpProvider Provider');
    }

    create(chatGroupId: number, data: { content, type }): Observable<any> {
        const formData = new FormData();

        formData.append('content', data.content);
        formData.append('type', data.type);

        return this.http.post(`http://localhost:8000/api/chat_groups/${chatGroupId}/messages`, formData)
    }
}