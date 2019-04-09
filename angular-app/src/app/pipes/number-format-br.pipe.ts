import { Pipe, PipeTransform } from '@angular/core';
import {style} from "@angular/animations";

@Pipe({
  name: 'numberFormatBr'
})
export class NumberFormatBrPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(value);
  }

}
