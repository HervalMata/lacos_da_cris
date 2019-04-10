import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {User} from "../../../../model";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {UserHttpService} from "../../../../services/http/user-http.service";

@Component({
    selector: 'user-delete-modal',
    templateUrl: './user-delete-modal.component.html',
    styleUrls: ['./user-delete-modal.component.css']
})
export class UserDeleteModalComponent implements OnInit {

    user: User = null;

    @Input()
    _userId: number;

    @ViewChild(ModalComponent) modal: ModalComponent;

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    constructor(
        private userHttp: UserHttpService
    ) {
    }

    ngOnInit() {
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
        const token = window.localStorage.getItem('token');
        this.userHttp.destroy(this._userId)
            .subscribe((user) => {
                this.onSuccess.emit(user);
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
