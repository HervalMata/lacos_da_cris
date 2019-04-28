import {Injectable} from "@angular/core";
import {FirebaseAuthProvider} from "../auth/firebase-auth";
import {Observable} from "rxjs";
import {ChatGroup} from "../../app/model";

@Injectable()
export class ChatGroupFbProvider {

    database;

    constructor(
        private firebaseAuth: FirebaseAuthProvider
        ) {
        this.database = this.firebaseAuth.firebase.database();
    }

    list() : Observable<ChatGroup[]> {
        return Observable.create((observer) => {
            this.database.ref('chat_groups').once('value',  (data) => {
                const groupsRaw = data.val() as Array<ChatGroup>;
                const groupsKey = Object.keys(groupsRaw);
                const groups = [];

                for (const key of groupsKey) {
                    groups.push(groupsRaw[key]);
                }

                observer.next(groups);
            }, (error) => console.log(error));
        })
    }
}