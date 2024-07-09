import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from '../../shared/service/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

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
    private ApiService: UserService) {

    this.addInfoForm = this.formBuilder.group({
      value: [''],
    })
  }   

  search(){
    if(this.addInfoForm.valid){
      let val = this.addInfoForm.controls['value'].value;
      console.log(val,'search text');
      this.ApiService.searchSlides(val).subscribe((resp: any) => {
         this.metadataList = resp.data;
        console.log(this.metadataList,'Slide LIst');
      } )
    }
  }

  getslideView(data: any) {
    debugger;
   this.url = data.objectUrl;
    console.log(this.url, 'url for load');
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
    debugger;
    this.router.navigate(['/feedback'], { queryParams: { 
     // MergedpresentationUrl: this.url,
      SlideKeyList: JSON.stringify(this.slideFileKeyList)
      //MergedSlidesKey: JSON.stringify(this.MergedSlidesKey)
     } 
    });
    
    ;
  }

  onHomeClick():void{
    this.router.navigate(["\home"]);
  }

}
