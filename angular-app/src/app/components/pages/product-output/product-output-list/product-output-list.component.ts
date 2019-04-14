import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductOutput} from "../../../../model";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ProductOutputNewModalComponent} from "../product-output-new-modal/product-output-new-modal.component";
import {ProductOutputHttpService} from "../../../../services/http/product-output-http.service";
import {ProductOutputInsertService} from "./product-output-insert.service";

@Component({
    selector: 'product-output-list',
    templateUrl: './product-output-list.component.html',
    styleUrls: ['./product-output-list.component.css']
})
export class ProductOutputListComponent implements OnInit {

    outputs: Array<ProductOutput> = [];
    page = 1;
    pagination = {
        page: 1,
        totalItems: 0,
        itemsPerPage: 10
    }

    sortColumn = {column: '', sort: ''};

    @ViewChild(ProductOutputNewModalComponent) outputNewModal: ProductOutputNewModalComponent;

    productId: number;
    searchText: string;

    constructor(
        private productOutputHttp: ProductOutputHttpService,
        private notifyMessage: NotifyMessageService,
        protected productOutputInsertService: ProductOutputInsertService,
    ) {
        this.productOutputInsertService.outputListComponent = this;
    }

    ngOnInit() {
        this.getOutputs();
    }

    getOutputs() {
        this.productOutputHttp.list({
            page: this.pagination.page,
            sort: this.sortColumn.column === '' ? null : this.sortColumn,
            search: this.searchText
        })
            .subscribe(response => {
                this.outputs = response.data;
                this.pagination.totalItems = response.meta.total
            })
    }

    pageChanged(page) {
        this.pagination.page = page;
        this.getOutputs();
    }

    sort(sortColumn) {
        this.getOutputs();
    }

    search(search) {
        this.searchText = search;
        this.getOutputs();
    }

}
