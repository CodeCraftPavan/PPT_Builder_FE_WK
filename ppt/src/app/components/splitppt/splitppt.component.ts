import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from '../../shared/service/user.service';
import { FeedbackComponent } from '../feedback/feedback.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-splitppt',
  templateUrl: './splitppt.component.html',
  styleUrls: ['./splitppt.component.scss']
})
export class SplitpptComponent {
  url: any;
  addInfoForm: FormGroup;
  metadataList :any;
  safeUrl: SafeResourceUrl;
  slideFileKeyList: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private sanitizer: DomSanitizer,
    // private toastrService: ToastrService,
    private ApiService: UserService,public dialog: MatDialog) {

    this.addInfoForm = this.formBuilder.group({
      value: [''],
    })
  }
  
  ngOnInit() {
    this.getSplitPptList();
  }


  getSplitPptList(){
    let pagination:any = {};
    pagination.pageSize = 10;
    pagination.pageNumber =0;

    this.ApiService.getAllSlides(pagination).subscribe((resp: any) => {
       this.metadataList = resp.data.responseList
      // this.length = resp.data.length;
    //   this.dataSource = new MatTableDataSource<any>(this.metadataList);
    //  // this.updatePageData();
    //   this.paginator.length = resp.data.totalCount;
    //   this.paginator.pageIndex = this.pageIndex;
      console.log(this.metadataList, 'all metadata');
    }, (error: any) => {

    })
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
      this.ApiService.searchSlides(payload).subscribe((resp: any) => {
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

  onHomeClick():void{
    this.router.navigate(["\home"]);
  }

}
