import { Component, Input,ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from '../../shared/service/user.service';




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

  ngOnInit() {
    this.stars = Array(this.maxRating).fill(false);
  }

  constructor(private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.addInfoForm = this.formBuilder.group({
      metaDataOfSlide: ['',Validators.required],
      keywords: ['',Validators.required],
      notes: ['', Validators.required],
      rating : [0,Validators.required],
     // date:[this.minDate]
    })

    // let value: any = localStorage.getItem("SplitData");
    // this.slideList = JSON.parse(value)
    // this.metadataList = this.slideList;
    // //this.metadataList = this.slideList.metaData
    // if (this.metadataList) {
    //   this.S3ObjUrl = this.metadataList.slideList[0]
    //   this.S3ObjectMetadata = this.metadataList.metaData[0];

      let value: any = localStorage.getItem("SplitData");
      this.slideList = JSON.parse(value)
      this.metadataList = this.slideList;
      //this.metadataList = this.slideList.metaData
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
    if(this.val < 10)
    {
     this.val++;
    }
    else
    {
      alert("You have viewed all the splitted slides.");
      return;
    }
    
      this.addInfoForm.reset();
      this.S3ObjUrl = this.metadataList.listWithUrl[this.val].s3FilePath;
      //this.slideList.slideList[this.val]
      this.S3ObjectMetadata = this.metadataList.listWithUrl[this.val];
      let safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(`https://docs.google.com/gview?url=${this.S3ObjUrl}&embedded=true`);
      //setTimeout(() =>{
        this.safeUrl = safeURL;
      //}, 1000);
      //this.safeUrl = safeURL;
            this.cd.detectChanges();
    
  }

  prev() {
    debugger;
    if(this.val > 0)
    {
      this.val--;
    }
    this.S3ObjUrl = this.metadataList.listWithUrl[this.val].s3FilePath;
    let safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(`https://docs.google.com/gview?url=${this.S3ObjUrl}&embedded=true`);
    this.safeUrl = safeURL;
    this.cd.detectChanges();
  }

  onHomeClick(): void {
    this.router.navigate(["\home"]);
  }

  addMetaData() {
    if (this.addInfoForm.valid) {
      // var Payload: any = {};
      // Payload.id = 0;
      // Payload.metaDataOfSlide = this.addInfoForm.controls['title'].value;
      // Payload.keyWords = this.addInfoForm.controls['keywords'].value;
      // Payload.notes = this.addInfoForm.controls['note'].value;
      //let data: any = localStorage.getItem("SplitData");
      debugger;
      //let metaDataofSlide = JSON.parse(data);
      //let metaDataId: any = metaDataofSlide.listWithUrl[0].id;
      //console.log(metaDataId, 'MetaDataId');
      let payload = this.addInfoForm.value;
      payload.id = this.S3ObjectMetadata.id;

      this.userService.addmetadata(payload).subscribe((data: any) => {
       // console.log(data, 'meta data result');
        alert('Submitted Metadata Successfully');
      })
    }
  }

  rate(rating: number) {
    this.rating = rating;
    this.addInfoForm.controls['rating'].setValue(Number(rating));
  }

  submitRating() {
    debugger;
    let payload = {
      rating: this.rating,
      slideId: this.metadataList.metaData[0].id
    };
    // let payload: any = {};
    // payload.rating = data.rating,
    //   payload.slideId = data.slideId
    this.userService.addRating(payload).subscribe((response: any) => {
      console.log(response, 'Ratings data');
    })
  }

  
}
