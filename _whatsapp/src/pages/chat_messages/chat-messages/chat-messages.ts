import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ChatGroup, ChatMessage} from "../../../app/model";
import {FirebaseAuthProvider} from "../../../providers/auth/firebase-auth";
import { Observable } from "rxjs/Observable";
import {ChatMessageFbProvider} from "../../../providers/firebase/chat-message-fb";

/**
 * Generated class for the ChatMessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-chat-messages',
    templateUrl: 'chat-messages.html',
})
export class ChatMessagesPage {

    messages: ChatMessage[] = [];
    chatGroup: ChatGroup;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private chatMessageFb: ChatMessageFbProvider) {
        this.chatGroup = this.navParams.get('chat_group');
    }

    ionViewDidLoad() {
        this.chatMessageFb.latest(this.chatGroup)
            .subscribe((messages) => {
                this.messages = messages;
            });
    }

}
