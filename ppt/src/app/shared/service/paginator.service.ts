import { Injectable } from '@angular/core';
import { Paginator } from '../../models/paginator';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {

  constructor() { }

  public GetPagination(pageSize: number, pageNumber: number) {
    var filterCondition = new Paginator();
    filterCondition.pageNumber = pageNumber;
    filterCondition.pageSize = pageSize;
    return filterCondition;
  }

}
