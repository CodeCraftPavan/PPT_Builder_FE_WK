import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MasterService } from '../services/master.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss']
})
export class MetadataComponent {

  slideList: any;
  content: any;
  urlvale: any
  url = ""
  safeUrl: SafeResourceUrl;

  addInfoForm: FormGroup;
 metadataList:any;


  pavan: any;
  pramod:any;

  constructor(private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private ApiService: MasterService,
    private router: Router
  ) {

    this.addInfoForm = this.formBuilder.group({
      title: [''],
      keywords: [''],
      note:['']
    })
    
    let value: any = localStorage.getItem("SplitData");
    this.slideList = JSON.parse(value)
    console.log(this.slideList,'slideList');
    console.log(this.slideList);
    this.metadataList = this.slideList;
    //this.metadataList = this.slideList.metaData
    console.log(this.metadataList,'metadata');
    
    
    this.pavan = this.metadataList.slideList[0]
    this.pramod = this.metadataList.metaData[0];


   this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://docs.google.com/gview?url=${this.pavan}&embedded=true`);

   
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.content);
  }

  val = 0;

  update(){
    this.val++;
    this.addInfoForm.reset();
    this.pavan = this.slideList.slideList[this.val]
    
    this.pramod = this.metadataList.metaData[this.val];
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://docs.google.com/gview?url=${this.pavan}&embedded=true`);
  }

  prev() {
    this.val--;

    this.pavan = this.slideList.slideList[this.val]

    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://docs.google.com/gview?url=${this.pavan}&embedded=true`);

  }

  onHomeClick():void{
    this.router.navigate(["\home"]);
  }

  dataAdd(item:any) {
    
    console.log(item,'item');
    
    console.log(this.addInfoForm.value,'formvalue');
    
        if(this.addInfoForm.valid){
          ;
        var Payload: any = {};
        Payload.id = item.id;
        Payload.metaDataOfSlide = this.addInfoForm.controls['title'].value;
        Payload.keyWords =  this.addInfoForm.controls['keywords'].value;
        Payload.notes = this.addInfoForm.controls['note'].value;

        this.ApiService.addmetadata(Payload).subscribe((data: any) => {
          console.log(data,'meta data result');
          alert('Submitted Metadata Successfully');
        } ) }
    }
}
