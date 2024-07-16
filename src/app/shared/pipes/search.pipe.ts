import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arr: any, value: string): any {
    if(value !== '') return  arr.filter((elm: { email: string; })=> elm.email.toLowerCase().includes(value.toLowerCase()))
else return arr
  }

}

