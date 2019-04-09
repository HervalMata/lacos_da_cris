import {Injectable} from '@angular/core';
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductListComponent} from "./product-list.component";

@Injectable({
    providedIn: 'root'
})
export class ProductInsertService {

    private _productListComponent: ProductListComponent;

    constructor(private notifyMessage: NotifyMessageService) {
    }

    set productListComponent(value: ProductListComponent) {
        this._productListComponent = value;
    }

    showModalInsert() {
        this._productListComponent.productNewModal.showModal();
    }

    onInsertSuccess($event: any) {
        this.notifyMessage.success('Produto cadastrado com sucesso!');
        console.log($event);
        this._productListComponent.getProducts();
    }

    onInsertError($event: HttpErrorResponse) {
        console.log($event);
        this.notifyMessage.error('Não foi possível cadastrar o produto.');
    }
}
