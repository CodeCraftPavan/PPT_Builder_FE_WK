import { Component, NgModule, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UserService } from '../../shared/service/user.service';


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

    // Pagination properties
    length = 0;
    pageSize = 5;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    pageIndex = 0;

    @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private ApiService: UserService,
    private sanitizer: DomSanitizer,private router: Router
  ) {
    this.getRFQ();
  }

  ngOnInit(): void {}

  getRFQ() {
    this.ApiService.getAllSlides().subscribe(
      (resp: any) => {
      this.metadataList = resp.data;
      this.length = resp.data.length;
      this.updatePageData();
      console.log(this.metadataList, 'all metadata');

    }, (error: any) => {

    })
  }

  

  slideval = 0;
  getslideView(data: any) {

    this.S3ObjUrl = data.objectUrl;
    console.log(this.S3ObjUrl, 'url for load');
    return this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://docs.google.com/gview?url=${this.S3ObjUrl}&embedded=true`);

  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  slideFileKeyList: any = []

  mergeSlides(metadata: any) {
    console.log(metadata, 'metadata');
    let fileLocation = metadata.s3FilePath;
    ;
    this.slideFileKeyList.push(fileLocation)
  }

  onCheckboxChange(mode: any, isChecked: boolean): void {
    debugger;
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
    this.router.navigate(['/feedback'], { queryParams: { 
      MergedpresentationUrl: this.url,
      SlideKeyList: JSON.stringify(this.slideFileKeyList)
      //MergedSlidesKey: JSON.stringify(this.MergedSlidesKey)
     } 
    });
    
    ;
  }
  onHomeClick():void{
    this.router.navigate(["\home"]);
  }

  onPageChange(event: PageEvent): void {
    debugger;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePageData();
  }

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
      console.log(this.MergedSlidesKey,'slideId')

      this.url = resp.data;
      const a = document.createElement('a');
      a.href = this.url;
      a.download = 'merged_presentation.pptx'; // Optionally set a filename
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      //window.open(url);
      setTimeout(() => {
        this.router.navigate(['/feedback'], { 
          queryParams: { 
          presentationUrl: this.url,
          MergedSlidesKey: JSON.stringify(this.MergedSlidesKey)
         } 
        });
      }, 1000);
      },error => {
        console.error('Error downloading presentation', error);
        alert('Error downloading presentation');
      }
    );
  }
}
