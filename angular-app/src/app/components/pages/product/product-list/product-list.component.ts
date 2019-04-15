import {Component, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../../../model";
import {ProductNewModalComponent} from "../product-new-modal/product-new-modal.component";
import {ProductEditModalComponent} from "../product-edit-modal/product-edit-modal.component";
import {ProductDeleteModalComponent} from "../product-delete-modal/product-delete-modal.component";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ProductHttpService} from "../../../../services/http/product-http.service";
import {ProductInsertService} from "./product-insert.service";
import {ProductEditService} from "./product-edit.service";
import {ProductDeleteService} from "./product-delete.service";
import {ProductViewModalComponent} from "../product-view-modal/product-view-modal.component";
import {ProductViewService} from "./product-view.service";

@Component({
    selector: 'product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    products: Array<Product> = [];
    page = 1;
    pagination = {
        page: 1,
        totalItems: 0,
        itemsPerPage: 10
    }

    sortColumn = {column: '', sort: ''};

    @ViewChild(ProductViewModalComponent) productViewModal: ProductViewModalComponent;
    @ViewChild(ProductNewModalComponent) productNewModal: ProductNewModalComponent;
    @ViewChild(ProductEditModalComponent) productEditModal: ProductEditModalComponent;
    @ViewChild(ProductDeleteModalComponent) productDeleteModal: ProductDeleteModalComponent;

    productId: number;
    searchText: string;

    constructor(
        private productHttp: ProductHttpService,
        private notifyMessage: NotifyMessageService,
        protected productViewService: ProductViewService,
        protected productInsertService: ProductInsertService,
        protected productEditService: ProductEditService,
        protected productDeleteService: ProductDeleteService
    ) {
        this.productViewService.productListComponent = this;
        this.productInsertService.productListComponent = this;
        this.productEditService.productListComponent = this;
        this.productDeleteService.productListComponent = this;
    }

    ngOnInit() {
        this.getProducts();
    }

    getProducts() {
        this.productHttp.list({
            page: this.pagination.page,
            sort: this.sortColumn.column === '' ? null : this.sortColumn,
            search: this.searchText
        })
            .subscribe(response => {
                this.products = response.data;
                this.pagination.totalItems = response.meta.total
            })
    }

    pageChanged(page) {
        this.pagination.page = page;
        this.getProducts();
    }

    sort(sortColumn) {
        this.getProducts();
    }

    search(search) {
        this.searchText = search;
        this.getProducts();
    }
}
