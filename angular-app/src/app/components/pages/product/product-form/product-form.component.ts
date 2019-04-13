import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import fieldsOptions from "../../product/product-form/product-fields-options";
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

    @Input()
    form: FormGroup;

    constructor(
        private changeRef: ChangeDetectorRef
        ) {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.changeRef.detectChanges();
    }

    get fieldsOptions(): any {
        return fieldsOptions;
    }

}
