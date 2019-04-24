import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ChatMessagesPage} from './chat-messages';
import {ChatAvatarComponent} from "../chat-avatar/chat-avatar";
import {ChatContentDetailComponent} from "../chat-content-detail/chat-content-detail";
import {ChatContentLeftComponent} from "../chat-content-left/chat-content-left";
import {ChatContentRightComponent} from "../chat-content-right/chat-content-right";
import {ChatFooterComponent} from "../chat-footer/chat-footer";
import {MomentModule} from "ngx-moment";
import {IsCurrentUserPipe} from "../../../pipes/is-current-user/is-current-user";
import {BuildUrlPipe} from "../../../pipes/build-url/build-url";
import {PipesModule} from "../../../pipes/pipes.module";

@NgModule({
    declarations: [
        ChatMessagesPage,
        ChatAvatarComponent,
        ChatContentDetailComponent,
        ChatContentLeftComponent,
        ChatContentRightComponent,
        ChatFooterComponent
    ],
    imports: [
        IonicPageModule.forChild(ChatMessagesPage),
        MomentModule,
        PipesModule
    ],
    entryComponents: [ChatMessagesPage]
})
export class ChatMessagesPageModule {
}