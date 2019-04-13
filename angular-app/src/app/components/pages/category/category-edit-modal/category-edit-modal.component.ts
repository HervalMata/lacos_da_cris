import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {CategoryHttpService} from "../../../../services/http/category-http.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'category-edit-modal',
    templateUrl: './category-edit-modal.component.html',
    styleUrls: ['./category-edit-modal.component.css']
})
export class CategoryEditModalComponent implements OnInit {

    form: FormGroup;
    errors = {};
    _categoryId: number;

    @ViewChild(ModalComponent) modal: ModalComponent;

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    constructor(
        private categoryHttp: CategoryHttpService,
        private formBuilder: FormBuilder
    ) {
        this.form = this.formBuilder.group({
            name: '',
            active: true
        });
    }

    ngOnInit() {
    }

    submit() {
        this.categoryHttp.update(this._categoryId, this.form.value)
            .subscribe((category) => {
                this.onSuccess.emit(category);
                this.modal.hide();
            }, error => this.onError.emit(error));
    }

    @Input()
    set categoryId(value) {
        this._categoryId = value;
        if (this._categoryId) {
            this.categoryHttp.get(this._categoryId)
                .subscribe(category => this.form.patchValue(category),
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
