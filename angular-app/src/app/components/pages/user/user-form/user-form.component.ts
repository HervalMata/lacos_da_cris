import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import fieldsOptions from "../../user/user-form/user-fields-options";

@Component({
    selector: 'user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

    @Input()
    form: FormGroup;

    constructor(private changeRef: ChangeDetectorRef) {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.changeRef.detectChanges();
    }

    get fielfOptions(): any {
        return fieldsOptions;
    }

}
