import {Injectable} from "@angular/core";
import {FirebaseAuthProvider} from "../auth/firebase-auth";
import {Observable} from "rxjs";
import {ChatGroup, ChatMessage, Role} from "../../app/model";
import {AuthProvider} from "../auth/auth";

@Injectable()
export class ChatGroupFbProvider {

    database;

    constructor(
        private firebaseAuth: FirebaseAuthProvider,
        private auth: AuthProvider
        ) {
        this.database = this.firebaseAuth.firebase.database();
    }

    list() : Observable<ChatGroup[]> {
        return Observable.create((observer) => {
            this.database.ref('chat_groups').orderByChild('updated_at').once('value',  (data) => {
                const groupsRaw = data.val() as Array<ChatGroup>;
                const groupsKey = Object.keys(groupsRaw).reverse();
                const groups = [];

                for (const key of groupsKey) {
                    groupsRaw[key].is_member = this.getMember(groupsRaw[key]);
                    groupsRaw[key].last_message = this.getLastMessage(groupsRaw[key]);
                    groups.push(groupsRaw[key]);
                }

                observer.next(groups);
            }, (error) => console.log(error));
        })
    }

    private getMember(group: ChatGroup) : Observable<boolean> {
        return Observable.create(observer => {
            if (this.auth.me.role === Role.SELLER) {
                observer.next(true);
                return;
            }
            this.database.ref(`chat_groups_users/${group.id}/${this.auth.me.profile.firebase_uid}`)
                .on('value', (data) => {
                    return data.exists() ? observer.next(true) : observer.next(false);
                });
        })
    }

    private getLastMessage(group: ChatGroup) : Observable<ChatMessage> {
        return Observable.create(observer => {
            this.database
                .ref(`chat_groups_messages/${group.id}/last_message_id`)
                .on('value', (data) => {
                    if (!data.exists()) {
                        return;
                    }

                    const lastMessageId = data.val();
                    this.getMessage(group, lastMessageId)
                        .subscribe(message => {
                            observer.next(message);
                            console.log(message);
                        });
                });
        });
    }

    private getMessage(group: ChatGroup, lastMessageId: string) : Observable<ChatMessage> {
        return Observable.create(observer => {
            this.database
                .ref(`chat_groups_messages/${group.id}/messages/${lastMessageId}`)
                .once('value', (data) => {
                    const message = data.val();
                    observer.next(message);
                });
        });
    }
}