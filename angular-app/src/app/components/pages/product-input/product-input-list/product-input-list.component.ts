import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductInput} from "../../../../model";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ProductInputNewModalComponent} from "../product-input-new-modal/product-input-new-modal.component";
import {ProductInputInsertService} from "./product-input-insert.service";
import {ProductInputHttpService} from "../../../../services/http/product-input-http.service";

@Component({
  selector: 'product-input-list',
  templateUrl: './product-input-list.component.html',
  styleUrls: ['./product-input-list.component.css']
})
export class ProductInputListComponent implements OnInit {

    inputs: Array<ProductInput> = [];
    page = 1;
    pagination = {
        page: 1,
        totalItems: 0,
        itemsPerPage: 10
    }

    sortColumn = {column: '', sort: ''};

    @ViewChild(ProductInputNewModalComponent) inputNewModal: ProductInputNewModalComponent;

    productId: number;
    searchText: string;

    constructor(
        private productInputHttp: ProductInputHttpService,
        private notifyMessage: NotifyMessageService,
        protected productInputInsertService: ProductInputInsertService,
    ) {
        this.productInputInsertService.inputListComponent = this;
    }

    ngOnInit() {
        this.getInputs();
    }

    getInputs() {
        this.productInputHttp.list({
            page: this.pagination.page,
            sort: this.sortColumn.column === '' ? null : this.sortColumn,
            search: this.searchText
        })
            .subscribe(response => {
                this.inputs = response.data;
                this.pagination.totalItems = response.meta.total
            })
    }

    pageChanged(page) {
        this.pagination.page = page;
        this.getInputs();
    }

    sort(sortColumn) {
        this.getInputs();
    }

    search(search) {
        this.searchText = search;
        this.getInputs();
    }

}
