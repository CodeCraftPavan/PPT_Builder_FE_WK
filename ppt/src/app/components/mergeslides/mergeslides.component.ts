import { AfterViewInit, Component, NgModule, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UserService } from '../../shared/service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ViewPptComponent } from '../view-ppt/view-ppt.component';
import { FeedbackComponent } from '../feedback/feedback.component';
import { PaginatorService } from '../../shared/service/paginator.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mergeslides',
  templateUrl: './mergeslides.component.html',
  styleUrls: ['./mergeslides.component.scss']
})
export class MergeslidesComponent implements AfterViewInit{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  addInfoForm: FormGroup;
  slideList: any;
  metadataList: any;
  MergedSlidesKey: any;
  url: any;
  safeUrl: SafeResourceUrl;
  S3ObjUrl: any;
  pagedMetadataList: any;
  displayedColumns: string[] = ['slno', 'metaDataOfSlide', 'keywords', 'notes',  'downloadCount', 'rating',  'view', 'add'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  // Pagination properties
  pageSizeOptions: number[] = [10, 20, 50, 100, 200];
  pageSize = 10;
  pageIndex = 1;
  sortOrder ='DEF';
  //sortOrder ='A';
 
  sortDateAscending: boolean = true;

  constructor(
    private toastrService: ToastrService,
    private _liveAnnouncer: LiveAnnouncer,
    private formBuilder: FormBuilder,
    private ApiService: UserService, 
    private sanitizer: DomSanitizer, 
    private router: Router,
    public dialog: MatDialog,
    public paginatorService: PaginatorService) {
      this.addInfoForm = this.formBuilder.group({
        value: ['']
      });
    this.getRFQ();
  }

  ngAfterViewInit(): void {
    
    this.dataSource.sort = this.sort;
    this.customSort(this.sort);
  }
  search(){
    if(this.addInfoForm.valid){
      let val = this.addInfoForm.value.value;
      ;
      const searchPayload = {
        searchInput: val,
        pagination: this.paginatorService.GetPagination(this.pageSize,this.pageIndex,this.sortOrder)
      };
      console.log(searchPayload);

      this.ApiService.searchSlides(searchPayload).subscribe((resp: any) =>{
        this.metadataList = resp.data.responseList;
        this.dataSource = new MatTableDataSource<any>(this.metadataList);
        this.paginator.length = resp.data.totalCount;
        this.paginator.pageIndex = this.pageIndex;
        this.paginator.pageSize = searchPayload.pagination.pageSize; 
        this.ngAfterViewInit();
        console.log(this.metadataList,'Slide LIst in table');
      })
    }
  }

  ngOnInit(): void {
     this.getRFQ();
  }

  getRFQ() {
    ;
    this.ApiService.getAllSlides(this.paginatorService.GetPagination(this.pageSize, this.pageIndex, this.sortOrder)).subscribe((resp: any) => {
      resp.data.responseList.forEach((e: any) => {
        e.metaDataOfSlide = this.toTitleCase(e.metaDataOfSlide);
        e.keyWords = this.toTitleCase(e.keyWords);
        e.notes = this.capitalizeFirstWord(e.notes);
      });
      
      resp.data.responseList.sort((a: any, b: any) => 
      a.metaDataOfSlide.toLowerCase().localeCompare(b.metaDataOfSlide.toLowerCase())
      );

      // resp.data.responseList.forEach((e:any) => {
      //   e['title'] = e.metaDataOfSlide.charAt(0).toUpperCase() + e.metaDataOfSlide.substring(1).toLowerCase()        
      // });
      resp.data.responseList.sort((a:any, b:any) => a.metaDataOfSlide.localeCompare(b.metaDataOfSlide));
      console.log(JSON.stringify(resp.data.responseList) );
      this.metadataList = resp.data.responseList;
      this.dataSource = new MatTableDataSource<any>(this.metadataList);
      this.paginator.length = resp.data.totalCount;
      this.paginator.pageIndex = this.pageIndex;
      this.ngAfterViewInit();
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
      this.toastrService.error('Error downloading presentation', error);
      //alert('Error downloading presentation');
    }
    );
  }

  onSortDateClick(sortDateAscending:boolean){
    ;
    let val = this.addInfoForm.value.value;
    if(val){
      if(sortDateAscending == true) {
        this.sortOrder = 'A';
        this.sortDateAscending = false;
      }else{
           this.sortOrder = 'D';
           this.sortDateAscending = true;
      }
      this.search();
    }
    else{
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

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  customSort(sort: MatSort) {
    this.dataSource.sortingDataAccessor = (data, header) => {
      const value = data[header];
      return typeof value === 'string' ? value.toLowerCase() : value;
    };
    this.dataSource.sort = sort;
  }

  toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  capitalizeFirstWord(str: string): string {
    if (!str) return str;
    const words = str.split(' ');
    if (words.length === 0) return str;
    words[0] = words[0].charAt(0).toUpperCase() + words[0].substr(1).toLowerCase();
    return words.join(' ');
  }
  
}
