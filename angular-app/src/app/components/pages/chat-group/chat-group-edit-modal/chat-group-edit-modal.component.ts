import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {ChatGroupHttpService} from "../../../../services/http/chat-group-http.service";
import fieldsOptions from "../chat-group-form/chat-group-fields.options";

@Component({
    selector: 'chat-group-edit-modal',
    templateUrl: './chat-group-edit-modal.component.html',
    styleUrls: ['./chat-group-edit-modal.component.css']
})
export class ChatGroupEditModalComponent implements OnInit {

    form: FormGroup;
    errors = {};
    _chatGroupId: number;

    @ViewChild(ModalComponent) modal: ModalComponent;

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    constructor(
        private chatGroupHttp: ChatGroupHttpService,
        private formBuilder: FormBuilder
    ) {
        const maxlength = fieldsOptions.name.validationMessage.maxLength;
        const minlength = fieldsOptions.name.validationMessage.minLength;
        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(maxlength), Validators.minLength(minlength)]],
            photo: null
        });
    }

    ngOnInit() {
    }

    submit() {
        this.chatGroupHttp.update(this._chatGroupId, this.form.value)
            .subscribe((chatGroup) => {
                this.onSuccess.emit(chatGroup);
                this.modal.hide();
            }, error => this.onError.emit(error));
    }

    @Input()
    set chatGroupId(value) {
        this._chatGroupId = value;
        if (this._chatGroupId) {
            this.chatGroupHttp.get(this._chatGroupId)
                .subscribe(chatGroup => this.form.patchValue(chatGroup),
                    responseError => {
                        if (responseError.status == 401) {
                            this.modal.hide();
                        }
                    })
        }

    }

    showModal() {
        this.modal.show();
    }

    hideModal($event: Event) {
        console.log($event);
    }

    showErrors() {
        return Object.keys(this.errors).length != 0;
    }

}
