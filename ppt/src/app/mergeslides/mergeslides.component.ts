import { Component } from '@angular/core';
import { MasterService } from '../services/master.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

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
  pavan: any;

  constructor(private ApiService: MasterService,
    private sanitizer: DomSanitizer,private router: Router
  ) {
    this.getRFQ();
  }


  getRFQ() {
    this.ApiService.getAllSlides().subscribe((resp: any) => {
      this.metadataList = resp.data;
      console.log(this.metadataList, 'all metadata');

    }, (error: any) => {

    })
  }

  slideval = 0;
  getslideView(data: any) {

    this.pavan = data.objectUrl;
    console.log(this.pavan, 'url for load');
    return this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://docs.google.com/gview?url=${this.pavan}&embedded=true`);

  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  slideFileKeyList: any = []

  mergeSlides(metadata: any) {
    console.log(metadata, 'metadata');
    let fileLocation = metadata.s3FilePath;
    debugger;
    this.slideFileKeyList.push(fileLocation)
  }
  onMergeClick(): void {
    this.router.navigate(['/feedback'], { queryParams: { 
      MergedpresentationUrl: this.url,
      SlideKeyList: JSON.stringify(this.slideFileKeyList)
      //MergedSlidesKey: JSON.stringify(this.MergedSlidesKey)
     } 
    });
    
    debugger;
  }
  onHomeClick():void{
    this.router.navigate(["\home"]);
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
        this.router.navigate(['/feedback'], { queryParams: { 
          presentationUrl: this.url,
          MergedSlidesKey: JSON.stringify(this.MergedSlidesKey)
         } 
        });
      }, 1000);
      },error => {
        console.error('Error downloading presentation', error);
        alert('Error downloading presentation');
      });
  }
}
