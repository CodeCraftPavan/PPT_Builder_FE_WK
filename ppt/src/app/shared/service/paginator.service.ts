import { Injectable } from '@angular/core';
import { Paginator, SearchPaginator } from '../../models/paginator';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {

  constructor() { }

  public GetPagination(pageSize: number, pageNumber: number, sortOrder: string) {
    var filterCondition = new Paginator();
    filterCondition.pageNumber = pageNumber;
    filterCondition.pageSize = pageSize;
    filterCondition.sortOrder = sortOrder;
    return filterCondition;
  }

  public GetSearchPagination(pageSize: number, pageNumber: number, sortOrder: string, searchinput:string) {
    var filterCondition = new SearchPaginator();
    filterCondition.pageNumber = pageNumber;
    filterCondition.pageSize = pageSize;
    filterCondition.sortOrder = sortOrder;
    filterCondition.searchinput = searchinput;
    return filterCondition;
  }

}
