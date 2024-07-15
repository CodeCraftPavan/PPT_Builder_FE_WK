import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from '../../shared/service/user.service';

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
