import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {CategoryNewModalComponent} from "../category-new-modal/category-new-modal.component";
import {CategoryEditModalComponent} from "../category-edit-modal/category-edit-modal.component";
import {CategoryDeleteModalComponent} from "../category-delete-modal/category-delete-modal.component";
import {CategoryHttpService} from "../../../../services/http/category-http.service";
import {NotifyMessageService} from "../../../../services/notify-message.service";

declare let $;

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

    categories: Array<Category> = [];

    @ViewChild(CategoryNewModalComponent) categoryNewModal: CategoryNewModalComponent;
    @ViewChild(CategoryEditModalComponent) categoryEditModal: CategoryEditModalComponent;
    @ViewChild(CategoryDeleteModalComponent) categoryDeleteModal: CategoryDeleteModalComponent;

    categoryId: number;

    constructor(
        public categoryHttp: CategoryHttpService,
        private notifyMessage: NotifyMessageService
    ) {
    }

    ngOnInit() {
        console.log('ngOnInit');
        this.getCategories();
    }

    getCategories() {
        this.categoryHttp.list()
            .subscribe(response => {
                this.categories = response.data
            })
    }

    showModalInsert() {
        this.categoryNewModal.showModal();
    }

    showModalEdit(categoryId: number) {
        this.categoryId = categoryId;
        this.categoryEditModal.showModal();
    }

    showModalDelete(categoryId: number) {
        this.categoryId = categoryId;
        this.categoryDeleteModal.showModal();
    }

    onInsertSuccess($event: any) {
        this.notifyMessage.success('Categoria cadastrada com sucesso!');
        console.log($event);
        this.getCategories();
    }

    onInsertError($event: HttpErrorResponse) {
        console.log($event);
        this.notifyMessage.error('Não foi possível cadastrarr a categoria.');
    }

    onEditSuccess($event: any) {
        this.notifyMessage.success('Categoria atualizada com sucesso!');
        console.log($event);
        this.getCategories();
    }

    onEditError($event: HttpErrorResponse) {
        console.log($event);
        this.notifyMessage.error('Não foi possível atualizar a categoria.');
    }

    onDeleteSuccess($event: any) {
        this.notifyMessage.success('Categoria removida com sucesso!');
        console.log($event);
        this.getCategories();
    }

    onDeleteError($event: HttpErrorResponse) {
        console.log($event);
        this.notifyMessage.error('Não foi possível excluir a categoria. Verifique se a mesma não está relacionada com produtos.');
    }
}
