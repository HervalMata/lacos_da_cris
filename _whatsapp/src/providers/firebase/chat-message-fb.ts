import {Injectable} from "@angular/core";
import {FirebaseAuthProvider} from "../auth/firebase-auth";
import {Observable} from "rxjs";
import {ChatGroup, ChatMessage, Role} from "../../app/model";
import {AuthProvider} from "../auth/auth";

@Injectable()
export class ChatMessageFbProvider {

    database;

    constructor(
        private firebaseAuth: FirebaseAuthProvider,
        private auth: AuthProvider
        ) {
        this.database = this.firebaseAuth.firebase.database();
    }

    latest(group: ChatGroup, limit: number) {
        return Observable.create((observer) => {
            this.database.ref(`chat_groups/${group.id}/messages`)
                .orderByKey()
                .limitToLast(limit)
                .once('value',  (data) => {
                const messages = [];
                data.forEach((child) => {
                    const message = child.val() as ChatMessage;
                    message.user$ = this.getUser(message.user_id);
                    messages.push(message);
                });

                observer.next(messages);
            }, (error) => console.log(error));
        })
    }

    private getUser(userId) : Observable<{name: string, photo_url: string}> {
        return Observable.create(observer => {
            this.database
                .ref(`users/${userId}`)
                .on('value', (data) => {
                    const user = data.val();
                    observer.next(user);
                });
        })
    }
}