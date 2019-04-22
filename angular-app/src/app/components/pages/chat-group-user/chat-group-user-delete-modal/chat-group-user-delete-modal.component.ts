import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ChatGroup, User} from "../../../../model";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {ChatGroupHttpService} from "../../../../services/http/chat-group-http.service";
import {ChatGroupUserHttpService} from "../../../../services/http/chat-group-user-http.service";
import {UserHttpService} from "../../../../services/http/user-http.service";

@Component({
    selector: 'chat-group-user-delete-modal',
    templateUrl: './chat-group-user-delete-modal.component.html',
    styleUrls: ['./chat-group-user-delete-modal.component.css']
})
export class ChatGroupUserDeleteModalComponent implements OnInit {

    chatGroup: ChatGroup;
    user: User;

    _chatGroupId: number;
    _userId: number;

    @ViewChild(ModalComponent) modal: ModalComponent;

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    constructor(
        private chatGroupHttp: ChatGroupHttpService,
        private chatGroupUserHttp: ChatGroupUserHttpService,
        private userHttp: UserHttpService
    ) {
    }

    ngOnInit() {
    }

    @Input()
    set chatGroupId(value) {
        this._chatGroupId = value;
        if (this._chatGroupId) {
            this.chatGroupHttp.get(this._chatGroupId)
                .subscribe(chatGroup => this.chatGroup = chatGroup)
        }

    }

    @Input()
    set userId(value) {
        this._userId = value;
        if (this._userId) {
            this.userHttp.get(this._userId)
                .subscribe(user => this.user = user)
        }

    }

    destroy() {
        this.chatGroupUserHttp.destroy(this.chatGroupId, this.userId)
            .subscribe((chatGroup) => {
                this.onSuccess.emit(chatGroup);
                this.modal.hide();
            }, error => this.onError.emit(error));
    }

    showModal() {
        this.modal.show();
    }

    hideModal($event: Event) {
        console.log($event);
    }

}
