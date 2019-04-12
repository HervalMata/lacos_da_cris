import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Category} from "../../../../model";
import {FormGroup} from "@angular/forms";

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

  get fielfOptions() {
      return {
          name: {
              id: 'name',
              label: 'Nome',
              validationMessage: {
                    maxLength: 255
              }
          },
          active: {
              id: 'active',
              label: 'Ativo',
          }
      }
  }

}
