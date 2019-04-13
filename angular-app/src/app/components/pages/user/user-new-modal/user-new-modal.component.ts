import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {UserHttpService} from "../../../../services/http/user-http.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import fieldsOptions from "../../user/user-form/user-fields-options";

@Component({
    selector: 'user-new-modal',
    templateUrl: './user-new-modal.component.html',
    styleUrls: ['./user-new-modal.component.css']
})
export class UserNewModalComponent implements OnInit {

    form: FormGroup;
    errors = {};

    @ViewChild(ModalComponent) modal: ModalComponent;

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    constructor(
        private userHttp: UserHttpService,
        private formBuilder: FormBuilder
    ) {
        const maxLength = fieldsOptions.password.validationMessage.maxlength;
        const minLength = fieldsOptions.password.validationMessage.minlength;
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required, Validators.email],
            password: ['', Validators.required, Validators.maxLength(maxLength), Validators.minLength]
        });
    }

    ngOnInit() {
    }

    submit() {
        this.userHttp.create(this.form.value)
            .subscribe((user) => {
                this.form.reset({
                    name: '',
                    email: '',
                    password: ''
                })
                this.onSuccess.emit(user);
                this.modal.hide();
            }, responseError => {
                if (responseError.status === 422) {
                    this.errors = responseError.error.errors
                }
                this.onError.emit(responseError)
            });
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
