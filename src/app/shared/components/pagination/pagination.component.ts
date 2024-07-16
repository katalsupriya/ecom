import { Component,EventEmitter,Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent  {
  @Input() page: number|any=1;
  @Input() collectionSize: number=1;
  @Input() maxSize: number=5;
  @Input() pageSize:number =10;
  @Output() onPageChanged:EventEmitter<number> = new EventEmitter();

  onChange(e:any) {
    this.onPageChanged.emit(e);
  }

}
