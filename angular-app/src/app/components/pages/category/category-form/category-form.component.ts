import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Category} from "../../../../model";
import {FormGroup} from "@angular/forms";
import fieldsOptions from "./category-fields-options";

@Component({
  selector: 'category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

    @Input()
    form: FormGroup;

  constructor(private changeRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngOnChanges() {
        this.changeRef.detectChanges();
  }

  get fielfOptions() : any {
      return fieldsOptions;
  }

}
