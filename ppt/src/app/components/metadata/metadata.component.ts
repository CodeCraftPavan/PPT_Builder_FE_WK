import { Component, Input,ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from '../../shared/service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss']
})
export class MetadataComponent {

  @Input() maxRating = 5;
  @Input() rating = 0;
  stars: boolean[] = [];
  @Input() id: number;  // Assuming each item being rated has an ID

  slideList: any;
  content: any;
  urlvale: any
  url = ""
  safeUrl: SafeResourceUrl;

  addInfoForm: FormGroup;
  metadataList: any;
  S3ObjUrl: any;
  S3ObjectMetadata: any;
  minDate = new Date();
  metadataDate = new Date();
  fileUploaded = false;
  prevButtonCount: number = 0;
  ratingsDisplay: number = 0;

  ngOnInit() {
    this.stars = Array(this.maxRating).fill(false);
  }

  constructor(private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private ApiService: UserService,
    private userService: UserService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
      this.addInfoForm = this.formBuilder.group({
       metaDataOfSlide: ['',Validators.required],
       keywords: ['',Validators.required],
       notes: ['', Validators.required],
       rating : [0,Validators.required],
    })
      let value: any = localStorage.getItem("SplitData");
      this.slideList = JSON.parse(value)
      this.metadataList = this.slideList;
      if (this.metadataList) {
        this.S3ObjUrl = this.metadataList.listWithUrl[0].s3FilePath
        this.S3ObjectMetadata = this.metadataList.metaData[0];
    }
    console.log(this.metadataList,'metaDataList');
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://docs.google.com/gview?url=${this.S3ObjUrl}&embedded=true`);
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.content);
  }

  val = 0;

  update() {
    debugger;
    if(this.val < (this.metadataList.listWithUrl.length - 1)){
     this.val++;
    }
    else{
      this.toastrService.show('You have viewed all the splitted slides.');
      return;
    }
    this.updateNextSlide();
  }

  updateNextSlide(){
    if(this.metadataList != null){
      this.ApiService.getMetaData(this.metadataList.listWithUrl[this.val].id).subscribe((resp: any) => {
      resp.data.metadata
      //continue with further logic
      });

    }
    this.addInfoForm.reset();
      this.S3ObjUrl = this.metadataList.listWithUrl[this.val].s3FilePath;
      //this.slideList.slideList[this.val]
      this.S3ObjectMetadata = this.metadataList.listWithUrl[this.val];
      let safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(`https://docs.google.com/gview?url=${this.S3ObjUrl}&embedded=true`);
      this.rating = 0;  // Reset the rating
      this.addInfoForm.controls['rating'].setValue(this.rating);
      this.safeUrl = safeURL;
      this.cd.detectChanges();
  }

  updateNestSlideWithoutmetaData(){
    if(this.val < (this.metadataList.listWithUrl.length - 1)){
     this.val++;
    }
    else{
      if(this.addInfoForm.invalid){
        this.toastrService.warning("Please add the details of the slide for the future use. Or else the slide will not be stored in the application.", " ", {timeOut: 10000});
      }
      else{
        this.toastrService.show('You have viewed all the splitted slides.');
      }
      return;
    }
    if(this.addInfoForm.invalid){
      this.toastrService.warning("Please add the details of the slide for the future use. Or else the slide will not be stored in the application.", " ", {timeOut: 10000});    
    }
    this.updateNextSlide();
  }
  prev() {
    if(this.val > 0)
    {
      this.val--;
      this.prevButtonCount ++;
    }
    debugger;
    let data : any; 
    data = this.ApiService.getMetaData(this.metadataList.listWithUrl[this.val].id ).subscribe((resp: any) => {
      console.log(resp, 'slide data');
      console.log(resp.data.metadata.metaDataOfSlide, 'slide metadata');
      this.addInfoForm.controls['metaDataOfSlide'].setValue(resp.data.metadata.metaDataOfSlide);
      this.addInfoForm.controls['keywords'].setValue(resp.data.metadata.keyWords);
      this.addInfoForm.controls['notes'].setValue(resp.data.metadata.notes);
      this.rating = resp.data.ratings;
      this.addInfoForm.controls['rating'].setValue(this.rating);
    });
    this.S3ObjUrl = this.metadataList.listWithUrl[this.val].s3FilePath;
    let safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(`https://docs.google.com/gview?url=${this.S3ObjUrl}&embedded=true`);
    this.safeUrl = safeURL;
    this.cd.detectChanges();
    this.resetForm();
  }

  onHomeClick(): void {
    this.router.navigate(["\home"]);
  }

  addMetaData() {
    debugger;
    if (this.addInfoForm.valid && this.prevButtonCount > 0) {
      let payload = this.addInfoForm.value;
      payload.id = this.metadataList.listWithUrl[this.val].id ;
      this.userService.addmetadata(payload).subscribe((data: any) => {
      this.toastrService.success('Edited the submitted key details successfully');
      this.update();
      })
    }
    else if (this.addInfoForm.valid){
      let payload = this.addInfoForm.value;
      payload.id = this.S3ObjectMetadata.id ;
      this.userService.addmetadata(payload).subscribe((data: any) => {
       this.toastrService.success('Submitted details Successfully');
       this.update();
      })
    }
    this.resetForm();
  }

  rate(rating: number) {
    this.rating = rating;
    this.addInfoForm.controls['rating'].setValue(Number(rating));
  }

  submitRating() {
    let payload = {
      rating: this.rating,
      slideId: this.metadataList.metaData[0].id
    };
    this.userService.addRating(payload).subscribe((response: any) => {
      console.log(response, 'Ratings data');
    })
  }

  resetForm() {
    this.addInfoForm.reset();
    this.rating = 0;
  }
}
