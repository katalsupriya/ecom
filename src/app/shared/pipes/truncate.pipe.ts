import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string |undefined,start:number,end:number): string | undefined {
    let truncate = value!== undefined && value?.length > end ? value.slice(start, end) + '...' : '';
    return truncate;
  }

}
