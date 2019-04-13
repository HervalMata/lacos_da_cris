import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../../model";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {UserNewModalComponent} from "../user-new-modal/user-new-modal.component";
import {UserEditModalComponent} from "../user-edit-modal/user-edit-modal.component";
import {UserDeleteModalComponent} from "../user-delete-modal/user-delete-modal.component";
import {UserHttpService} from "../../../../services/http/user-http.service";
import {UserInsertService} from "./user-insert.service";
import {UserEditService} from "./user-edit.service";
import {UserDeleteService} from "./user-delete.service";

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    users: Array<User> = [];
    page = 1;
    pagination = {
        page: 1,
        totalItems: 0,
        itemsPerPage: 10
    }

    sortColumn = {column: '', sort: ''};

    @ViewChild(UserNewModalComponent) userNewModal: UserNewModalComponent;
    @ViewChild(UserEditModalComponent) userEditModal: UserEditModalComponent;
    @ViewChild(UserDeleteModalComponent) userDeleteModal: UserDeleteModalComponent;

    userId: number;
    searchText: string;

    constructor(
        private userHttp: UserHttpService,
        private notifyMessage: NotifyMessageService,
        protected userInsertService: UserInsertService,
        protected userEditService: UserEditService,
        protected userDeleteService: UserDeleteService
    ) {
        this.userInsertService.userListComponent = this;
        this.userEditService.userListComponent = this;
        this.userDeleteService.userListComponent = this;
    }

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
        this.userHttp.list({
            page: this.pagination.page,
            sort: this.sortColumn.column === '' ? null : this.sortColumn,
            search: this.searchText
        })
            .subscribe(response => {
                this.users = response.data;
                this.pagination.totalItems = response.meta.total;
                this.pagination.itemsPerPage = response.meta.per_page;
            })
    }

    pageChanged(page) {
        this.pagination.page = page;
        this.getUsers();
    }

    sort(sortColumn) {
        this.getUsers();
    }

    search(search) {
        this.searchText = search;
        this.getUsers();
    }

}
