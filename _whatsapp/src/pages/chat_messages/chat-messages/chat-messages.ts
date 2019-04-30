import {Component, ViewChild} from '@angular/core';
import {Content, InfiniteScroll, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ChatGroup, ChatMessage} from "../../../app/model";
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

    chatGroup: ChatGroup;
    messages: {key: string, value: ChatMessage}[] = [];

    limit = 20;
    canMoreMessages = true;
    countNewMessages = 20;
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
                    this.scrollToBottom();
                    this.showContent = true;
                }, 500);

            });

        this.chatMessageFb.onAdded(this.chatGroup)
            .subscribe(message => {
                // @ts-ignore
                this.messages.push(message)
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

    scrollToBottom() {
        this.countNewMessages = 0;
        this.content.scrollToBottom(0);
    }

    showButtonScrollBottom() {
        const dimensions = this.content.getContentDimensions();
        const contentHeight = dimensions.contentHeight;
        const scrollTop = dimensions.scrollTop;
        const scrollHeigth = dimensions.scrollHeight;

        return scrollHeigth > scrollTop + contentHeight;
    }
}
