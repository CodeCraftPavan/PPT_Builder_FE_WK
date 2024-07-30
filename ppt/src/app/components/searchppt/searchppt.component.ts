import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/service/user.service';
import { FeedbackComponent } from '../feedback/feedback.component';
import { ToastrService } from 'ngx-toastr';
import { PaginatorService } from '../../shared/service/paginator.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-searchppt',
  templateUrl: './searchppt.component.html',
  styleUrls: ['./searchppt.component.scss']
})
export class SearchpptComponent {
  url: any;
  addInfoForm: FormGroup;
  metadataList :any[] =[];
  safeUrl: SafeResourceUrl;
  slideFileKeyList: any = [];

  showRefreshButton: boolean = false

  // Pagination properties
  pageSizeOptions: number[] = [5, 10, 20, 50, 100, 200];
  pageSize = 5;
  pageIndex = 1;
  sortOrder ='DEF';
  //sortOrder ='A';
  @ViewChild(MatPaginator) paginator: MatPaginator;

  totalItems: number = 0;
  currentPage: number = 0;
  itemsPerPage: number = 5;  
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  
  //sortOrder ='DEF';
  //sortOrder ='A';
  //pageSize = 10;
  //pageIndex = 0;
  sortDateAscending: boolean = true;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private sanitizer: DomSanitizer,
    private toastrService: ToastrService,public paginatorService: PaginatorService,
    private ApiService: UserService,public dialog: MatDialog) {

    this.addInfoForm = this.formBuilder.group({
      value: [''],
    })
  }
  
  ngOnInit() {
   // this.getSplitPptList();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  pageChanged(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.search();
  }

  getSplitPptList(){
    let pagination:any = {};
    pagination.pageSize = 10;
    pagination.pageNumber =0;

    this.ApiService.getAllSlides(pagination).subscribe((resp: any) => {
       this.metadataList = resp.data.responseList
    //   this.length = resp.data.length;
    //   this.dataSource = new MatTableDataSource<any>(this.metadataList);
    //   this.updatePageData();
    //   this.paginator.length = resp.data.totalCount;
    //   this.paginator.pageIndex = this.pageIndex;
      console.log(this.metadataList, 'all metadata');
    }, (error: any) => {

    })
  }

  search(){
    if(this.addInfoForm.valid){
      let val = this.addInfoForm.controls['value'].value;

      const searchPayload = {
        searchinput: val,
        pagination: this.paginatorService.GetSearchPagination(this.pageSize, this.pageIndex, this.sortOrder)
      }
      // let payload :any = {};
      // let pagination:any = {};
      // pagination.pageSize = 10;
      // pagination.pageNumber =0;
      // payload.searchinput = val;
      // payload.pagination = pagination;
      debugger;
      this.ApiService.searchSlides(searchPayload).subscribe((resp: any) => {
      //this.ApiService.searchSlides(this.paginatorService.GetSearchPagination(this.pageSize, this.pageIndex, this.sortOrder, val)).subscribe((resp: any) => {
        console.log(resp, 'testData');
        this.metadataList = resp.data.responseList;
        this.dataSource = new MatTableDataSource<any>(this.metadataList);
        this.paginator.length = resp.data.totalCount; 
        this.paginator.pageIndex = this.pageIndex;
        this.paginator.pageSize = searchPayload.pagination.pageSize;
        this.itemsPerPage = searchPayload.pagination.pageSize;
        console.log(this.metadataList,'Slide LIst');
      } )
    }
  }

  refreshResults() {
    this.search();
  }

  getslideView(data: any) { 
   this.url = data.objectUrl;
   // console.log(this.url, 'url for load');
    return this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://docs.google.com/gview?url=${this.url}&embedded=true`);

  }
  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  mergeSlides(metadata: any) {
    console.log(metadata, 'metadata');
    let fileLocation = metadata.s3FilePath;
    ;
    this.slideFileKeyList.push(fileLocation)
  }

  onMergeClick(): void {
   
    let data:any = {};
      data.SlideKeyList = JSON.stringify(this.slideFileKeyList);
      const dialogRef = this.dialog.open(FeedbackComponent, {width: '500px',data: data
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      }); 
  }

  onCheckboxChange(mode: any, isChecked: boolean): void {

    let fileLocation = mode.s3FilePath;
    if (isChecked) {
      this.slideFileKeyList.push(fileLocation);
    } else {
      const index = this.slideFileKeyList.indexOf(fileLocation);
      if (index > -1) {
        this.slideFileKeyList.splice(index, 1);
      }
    }
  }

  onAddPptClick(){
    this.router.navigate(['/dashboard/addppt'])
    // const dialogRef = this.dialog.open(AddpptComponent, {width: '500px'});
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // }); 
  }

  onSortDateClick(sortDateAscending:boolean){
    if(sortDateAscending == true) {
      this.sortOrder = 'A';
      this.sortDateAscending = false;
    }else{
         this.sortOrder = 'D';
         this.sortDateAscending = true;
    }

    this.ApiService.getAllSlides(this.paginatorService.GetPagination(this.pageSize, this.pageIndex, this.sortOrder)).subscribe((resp: any) => {
      this.metadataList = resp.data.responseList;
     
      // console.log(this.metadataList, 'all metadata');
    }, (error: any) => {
    })

  }
}
