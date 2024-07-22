import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from '../../shared/service/user.service';
import { FeedbackComponent } from '../feedback/feedback.component';
import { MatDialog } from '@angular/material/dialog';
import { PaginatorService } from '../../shared/service/paginator.service';
import { ToastrService } from 'ngx-toastr';
import { ViewPptComponent } from '../view-ppt/view-ppt.component';

@Component({
  selector: 'app-splitppt',
  templateUrl: './splitppt.component.html',
  styleUrls: ['./splitppt.component.scss']
})
export class SplitpptComponent {
  url: any;
  addInfoForm: FormGroup;
  metadataList :any[] =[];
  safeUrl: SafeResourceUrl;
  slideFileKeyList: any = [];
  currentPage: number = 0;
  page: number = 1
  itemsPerPage: number = 3;
  totalItems: number = 0;
  filterText: string = "";
  pageSizeOptions: number[] =  [3,6,9];
  sortOrder: string = "A"

  @Input() maxRating = 5;
  @Input() rating = 0;
  stars: boolean[] = [];
  
 
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private sanitizer: DomSanitizer,
    private toastrService: ToastrService,
    public paginatorService: PaginatorService,
    private  userService: UserService,public dialog: MatDialog) {

    this.addInfoForm = this.formBuilder.group({
      value: [''],
    })
  }
  
  ngOnInit() {
    this.getSplitPptList();
    this.stars = Array(this.maxRating).fill(false);
  }


  getSplitPptList(){
    this.userService.getAllSlides(this.paginatorService.GetPagination(this.itemsPerPage,this.currentPage, this.sortOrder)).subscribe((resp: any) => {
       this.metadataList = resp.data.responseList;
       this.totalItems = resp.data.totalCount;
      // this.length = resp.data.length;
    //   this.dataSource = new MatTableDataSource<any>(this.metadataList);
    //  // this.updatePageData();
    //   this.paginator.length = resp.data.totalCount;
    //   this.paginator.pageIndex = this.pageIndex;
      console.log(this.metadataList, 'all metadata');
    }, (error: any) => {

    })
  }

  handlePageChange(event: number){
    // console.log(event)
    this.currentPage = event;
    this.itemsPerPage = event;
     this.getSplitPptList();
   
     
  }

  search(){
    if(this.addInfoForm.valid){
      let val = this.addInfoForm.controls['value'].value;
      console.log(val,'search text');
      let payload :any = {};
      let pagination:any = {};
      pagination.pageSize = 10;
      pagination.pageNumber =0;
      payload.searchinput = val;
      payload.pagination = pagination;
      this.userService.searchSlides(payload).subscribe((resp: any) => {
        console.log(resp);
        this.metadataList = resp.data.responseList;
        console.log(this.metadataList,'Slide LIst');
      } )
    }
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

  rate(rating: number) {
    this.rating = rating;
  }

  submitRating() {
    let payload :any= {};
    payload.rating= this.rating
   // payload.slideId= this.metadataList.metaData[0].id
    if(this.rating != 0){
    this.userService.addRating(payload).subscribe((response: any) => {
      console.log(response, 'Ratings data');
    })}else{
      this.toastrService.error('Please select a rating')
    }
  }

  viewSlide(element: any) {
    const dialogRef = this.dialog.open(ViewPptComponent, {
      width: '750px', data: { element }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getSplitPptList();
    });
  }

}
