import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'chat-group-search-form',
    templateUrl: './chat-group-search-form.component.html',
    styleUrls: ['./chat-group-search-form.component.css']
})
export class ChatGroupSearchFormComponent implements OnInit {

    search = "";

    @Output()
    onSearch: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit() {
    }

    submit() {
        this.onSearch.emit(this.search);
        return false;
    }

}
