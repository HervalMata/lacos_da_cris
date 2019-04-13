import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ProductHttpService} from "../../../../services/http/product-http.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {Product} from "../../../../model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserHttpService} from "../../../../services/http/user-http.service";
import fieldsOptions from "../../product/product-form/product-fields-options";

@Component({
    selector: 'product-edit-modal',
    templateUrl: './product-edit-modal.component.html',
    styleUrls: ['./product-edit-modal.component.css']
})
export class ProductEditModalComponent implements OnInit {

    form: FormGroup;
    errors = {};

    _productId: number;

    @ViewChild(ModalComponent) modal: ModalComponent;

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    constructor(
        private productHttp: ProductHttpService,
        private formBuilder: FormBuilder
    ) {
        const maxLength = fieldsOptions.name.validationMessage.maxlength;
        this.form = this.formBuilder.group({
            name: ['', Validators.required, Validators.maxLength(maxLength)],
            description: ['', [Validators.required]],
            price: ['', [Validators.required, Validators.min(fieldsOptions.price.validationMessage.min(1))]],
            active: true
        });
    }

    ngOnInit() {
    }

    submit() {
        this.productHttp.update(this._productId, this.form.value)
            .subscribe((product) => {
                this.form.reset({
                    name: '',
                    description: '',
                    price: '',
                    active: true
                })
                this.onSuccess.emit(product);
                this.modal.hide();
            }, responseError => {
                if (responseError.status === 422) {
                    this.errors = responseError.error.errors;
                }
                this.onError.emit(responseError)
            });
    }

    @Input()
    set productId(value) {
        this._productId = value;
        if (this._productId) {
            this.productHttp.get(this._productId)
                .subscribe(product => this.form.patchValue(product),
                    responseError => {
                        if (responseError.status === 401) {
                            this.modal.hide();
                        }
                    }
                );
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
