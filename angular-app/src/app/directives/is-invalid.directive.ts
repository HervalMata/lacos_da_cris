import {Directive, ElementRef, Input} from '@angular/core';
import {NgControl} from "@angular/forms";

@Directive({
  selector: '[isInvalid]'
})
export class IsInvalidDirective {

  constructor(
      private element: ElementRef,
      private control: NgControl
  ) { }

  ngOnInit() {
      toogleClassInvalid(this.control, this.element.nativeElement);
  }
}

@Directive({
    selector: '[isInvalidControl]'
})
export class IsInvalidControlDirective {

  control: NgControl;

    constructor(
        private element: ElementRef
    ) { }

    ngOnInit() {
        toogleClassInvalid(this.control, this.element.nativeElement);
    }

    @Input()
    set isInvalidControl(value) {
      this.control = value;
    }
}

function toogleClassInvalid(control: NgControl, nativeElement: HTMLElement) {
    this.control.valueChanges.subscribe(() => {
        if (this.control.invalid && (this.control.dirty || this.control.touched)) {
            if (!nativeElement.classList.contains('is-invalid')) {
                nativeElement.classList.add('is-invalid');
            }
        } else {
            nativeElement.classList.remove('is-invalid');
        }
    })
}