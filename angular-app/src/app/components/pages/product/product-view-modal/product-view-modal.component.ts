import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductHttpService} from "../../../../services/http/product-http.service";
import {Product} from "../../../../model";

@Component({
    selector: 'product-view-modal',
    templateUrl: './product-view-modal.component.html',
    styleUrls: ['./product-view-modal.component.css']
})
export class ProductViewModalComponent implements OnInit {

    product: Product = {
        name: '',
        description: '',
        price: 0,
        active: true
    }

    @Input()
    _productId: number;

    @ViewChild(ModalComponent) modal: ModalComponent;

    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    constructor(private productHttp: ProductHttpService) {
    }

    ngOnInit() {
    }

    @Input()
    set productId(value) {
        this._productId = value;
        if (this._productId) {
            this.productHttp.get(this._productId)
                .subscribe(product => this.product = product,
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

}
