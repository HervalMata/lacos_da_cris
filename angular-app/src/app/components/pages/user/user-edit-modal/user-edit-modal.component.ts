import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {User} from "../../../../model";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {UserHttpService} from "../../../../services/http/user-http.service";

@Component({
    selector: 'user-edit-modal',
    templateUrl: './user-edit-modal.component.html',
    styleUrls: ['./user-edit-modal.component.css']
})
export class UserEditModalComponent implements OnInit {

    user: User = {
        name: '',
        email: '',
    };

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

    submit() {
        this.userHttp.update(this._userId, this.user)
            .subscribe((user) => {
                this.onSuccess.emit(user);
                this.modal.hide();
            }, error => this.onError.emit(error));
    }

    @Input()
    set userId(value) {
        this._userId = value;
        if (this._userId) {
            this.userHttp.get(this._userId)
                .subscribe(user => this.user = user)
        }

    }

    showModal() {
        this.modal.show();
    }

    hideModal($event: Event) {
        console.log($event);
    }
}
