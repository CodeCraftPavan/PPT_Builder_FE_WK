import { Component, NgModule, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UserService } from '../../shared/service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ViewPptComponent } from '../view-ppt/view-ppt.component';
import { FeedbackComponent } from '../feedback/feedback.component';
import { PaginatorService } from '../../shared/service/paginator.service';

@Component({
  selector: 'app-mergeslides',
  templateUrl: './mergeslides.component.html',
  styleUrls: ['./mergeslides.component.scss']
})
export class MergeslidesComponent {

  slideList: any;
  metadataList: any;
  MergedSlidesKey: any;
  url: any;
  safeUrl: SafeResourceUrl;
  S3ObjUrl: any;
  pagedMetadataList: any;
  displayedColumns: string[] = ['slno', 'keywords', 'metaDataOfSlide', 'downloadCount', 'rating', 'notes', 'view', 'add'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  // Pagination properties
  pageSizeOptions: number[] = [10, 20, 50, 100, 200];
  pageSize = 10;
  pageIndex = 0;
  sortOrder ='A';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  sortDateAscending: boolean = true;

  constructor(private ApiService: UserService, private sanitizer: DomSanitizer, private router: Router,
    public dialog: MatDialog,public paginatorService: PaginatorService) {
    this.getRFQ();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    //   this.getRFQ();
  }

  getRFQ() {
    this.ApiService.getAllSlides(this.paginatorService.GetPagination(this.pageSize, this.pageIndex, this.sortOrder)).subscribe((resp: any) => {
      this.metadataList = resp.data.responseList;
      this.dataSource = new MatTableDataSource<any>(this.metadataList);
      this.paginator.length = resp.data.totalCount;
      this.paginator.pageIndex = this.pageIndex;
      // console.log(this.metadataList, 'all metadata');
    }, (error: any) => {
    })
  }

  pageChanged(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getRFQ();
  }


  viewSlide(element: any) {
    const dialogRef = this.dialog.open(ViewPptComponent, {
      width: '750px', data: { element }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }



  slideval = 0;

  getslideView(element: any) {
    this.S3ObjUrl = element.objectUrl;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://docs.google.com/gview?url=${this.S3ObjUrl}&embedded=true`);


  }


  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  slideFileKeyList: any = []

  mergeSlides(metadata: any) {
    console.log(metadata, 'metadata');
    let fileLocation = metadata.s3FilePath;
    this.slideFileKeyList.push(fileLocation)
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

  onMergeClick(): void {
    let data: any = {};
    data.SlideKeyList = JSON.stringify(this.slideFileKeyList);
    data.MergedSlidesKey = JSON.stringify(this.MergedSlidesKey);
    data.MergedpresentationUrl = this.url
    console.log(data)
    const dialogRef = this.dialog.open(FeedbackComponent, {
      width: '500px', data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    //   this.router.navigate(['/dashboard/keypoints'],{ queryParams: { 
    //     MergedpresentationUrl: this.url,
    //     SlideKeyList: JSON.stringify(this.slideFileKeyList),
    //     MergedSlidesKey: JSON.stringify(this.MergedSlidesKey)
    //    } 
    //  })
  }
  onHomeClick(): void {
    this.router.navigate(["\home"]);
  }

  // onPageChange(event: PageEvent): void {
  //   this.pageIndex = event.pageIndex;
  //   this.pageSize = event.pageSize;
  //   this.updatePageData();
  // }

  updatePageData(): void {
    this.metadataList = this.metadataList.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
  }

  download() {
    let Payload = {
      slideFileKeys: this.slideFileKeyList
    }
    console.log(Payload, 'merge payload');

    this.ApiService.mergeSlides(Payload).subscribe((resp: any) => {
      console.log(resp, 'meta data result');
      this.MergedSlidesKey = resp.data.mergedSlideKeyId
      console.log(this.MergedSlidesKey, 'slideId')

      this.url = resp.data;
      const a = document.createElement('a');
      a.href = this.url;
      a.download = 'merged_presentation.pptx'; // Optionally set a filename
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      //window.open(url);
      setTimeout(() => {
        this.router.navigate(['/download/keypoints'], {
          queryParams: {
            presentationUrl: this.url,
            MergedSlidesKey: JSON.stringify(this.MergedSlidesKey)
          }
        });
      }, 1000);
    }, error => {
      console.error('Error downloading presentation', error);
      alert('Error downloading presentation');
    }
    );
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
      this.dataSource = new MatTableDataSource<any>(this.metadataList);
      this.paginator.length = resp.data.totalCount;
      this.paginator.pageIndex = this.pageIndex;
      // console.log(this.metadataList, 'all metadata');
    }, (error: any) => {
    })

  }
}
