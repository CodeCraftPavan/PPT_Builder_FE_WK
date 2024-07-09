export class Page {
    size: number = 0;
    totalElements: number = 0;
    totalPages: number = 0;
    pageNumber: number = 0;
  }

export class PagedData<T> {
    data = new Array<T>();
    page = new Page();
  }

