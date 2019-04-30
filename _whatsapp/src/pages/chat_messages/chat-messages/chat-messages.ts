import {Component, ViewChild} from '@angular/core';
import {Content, InfiniteScroll, IonicPage, NavController, NavParams} from 'ionic-angular';
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

    messages: {key: string, value: ChatMessage}[] = [];
    chatGroup: ChatGroup;
    limit = 20;
    canMoreMessages = true;
    showContent = false;

    @ViewChild(Content)
    content: Content;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private chatMessageFb: ChatMessageFbProvider) {
        this.chatGroup = this.navParams.get('chat_group');
    }

    ionViewDidLoad() {
        this.chatMessageFb.latest(this.chatGroup, this.limit)
            .subscribe((messages) => {
                // @ts-ignore
                this.messages = messages;
                setTimeout(() => {
                    this.content.scrollToBottom(0);
                    this.showContent = true;
                }, 600);

            });
    }

    doInfinite(infiniteScroll: InfiniteScroll) {
        this.chatMessageFb.oldest(this.chatGroup, this.limit, this.messages[0].key)
            .subscribe((messages) => {
                // @ts-ignore
                if (!messages.length) {
                    this.canMoreMessages = false;
                }
                // @ts-ignore
                this.messages.unshift(...messages);
                infiniteScroll.complete();
            }, () => infiniteScroll.complete());
    }

}
