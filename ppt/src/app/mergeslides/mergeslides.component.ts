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

  Devika: any = []

  mergeSlides(metadata: any) {
    console.log(metadata, 'metadata');
    let fileLocation = metadata.s3FilePath;
    
    this.Devika.push(fileLocation)
  }

  download() {
    let Payload = {
      slideFileKeys: this.Devika
    }
    console.log(Payload, 'merge payload');

    this.ApiService.mergeSlides(Payload).subscribe((resp: any) => {
      console.log(resp, 'meta data result');

      let url = resp.data;

      window.open(url);
      setTimeout(() => {
        this.router.navigate(['/feedback'], { queryParams: { presentationUrl: url } });
      }, 1000);
      },error => {
        console.error('Error downloading presentation', error);
        alert('Error downloading presentation');
      });
  }
}
