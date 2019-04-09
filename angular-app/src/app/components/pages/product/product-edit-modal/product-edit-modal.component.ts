import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ProductHttpService} from "../../../../services/http/product-http.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {Product} from "../../../../model";

@Component({
  selector: 'product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.css']
})
export class ProductEditModalComponent implements OnInit {

    product: Product = {
        name: '',
        description: '',
        price: 0,
        active: true
    };

    _productId: number;

    @ViewChild(ModalComponent) modal: ModalComponent;

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    constructor(
        private productHttp: ProductHttpService
    ) {
    }

    ngOnInit() {
    }

    submit() {
        this.productHttp.update(this._productId, this.product)
            .subscribe((product) => {
                this.onSuccess.emit(product);
                this.modal.hide();
            }, error => this.onError.emit(error));
    }

    @Input()
    set productId(value) {
        this._productId = value;
        if (this._productId) {
            this.productHttp.get(this._productId)
                .subscribe(product => this.product = product)
        }

    }

    showModal() {
        this.modal.show();
    }

    hideModal($event: Event) {
        console.log($event);
    }

}
