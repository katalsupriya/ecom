import { Injectable } from '@angular/core';
import { SearchModel } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public search: SearchModel = {
    keyword: '',
    max: 10,
    offset: 0,
    filterBy: '',
  };

  searchParams(objs: any) {
    for (let obj in objs) {
      if (objs[obj] === undefined || objs[obj] === null || objs[obj] === '') {
        delete objs[obj];
      }
    }
    return objs
  }
}
