import { Injectable } from '@angular/core';
import {ProductInputListComponent} from "../../product-input/product-input-list/product-input-list.component";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductOutputListComponent} from "./product-output-list.component";

@Injectable({
  providedIn: 'root'
})
export class ProductOutputInsertService {

    private _outputListComponent: ProductOutputListComponent;

    constructor(private notifyMessage: NotifyMessageService) {
    }

    set outputListComponent(value: ProductOutputListComponent) {
        this._outputListComponent = value;
    }

    showModalInsert() {
        this._outputListComponent.outputNewModal.showModal();
    }

    onInsertSuccess($event: any) {
        this.notifyMessage.success('Saida de produto cadastrada com sucesso!');
        console.log($event);
        this._outputListComponent.getOutputs();
    }

    onInsertError($event: HttpErrorResponse) {
        console.log($event);
        this.notifyMessage.error('Não foi possível cadastrar a saida do produto.');
    }
}
