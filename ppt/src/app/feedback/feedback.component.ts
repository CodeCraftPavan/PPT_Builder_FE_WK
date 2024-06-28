import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MasterService } from '../services/master.service';
import { PresentationPurpose } from '../models/presentation-purpose.enum';
import { getEnumValues } from '../utils/enum-utils';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  MergedSlidesKey: any;
  SlideKeyList: any;
  MergedpresentationUrl: any;
  presentationPurpose = PresentationPurpose;
  purposeValues: string[];
  presentationUrl: string;
  

  constructor(private formBuilder: FormBuilder, private apiService: MasterService,private router: Router, private route: ActivatedRoute) {
    this.purposeValues = getEnumValues(this.presentationPurpose);
  }

  ngOnInit(): void {
    ;
    this.feedbackForm = this.formBuilder.group({
      SlideTitle: ['', Validators.required],
      UsagePurposeType: ['', Validators.required]
    });

      this.route.queryParams.subscribe(params => {
      this.presentationUrl = params['presentationUrl'];
      this.MergedSlidesKey = params['MergedSlidesKey'];
      this.SlideKeyList = params['SlideKeyList'];
      this.MergedpresentationUrl = params['url'];

    });
  }

  // onSubmit(): void {
  //   ;

  //   let Payload = {
  //     slideFileKeys: JSON.parse(this.SlideKeyList)
  //   }
      
  //   this.apiService.mergeSlides(Payload).subscribe((resp: any) => {
  //     console.log(resp, 'meta data result');
  //     this.MergedSlidesKey = resp.data.mergedSlideKeyId
  //     console.log(this.MergedSlidesKey,'slideId')

  //     //this.url = resp.data;
      
  //     this.MergedpresentationUrl = resp.data.objectUrl;
  //     const a = document.createElement('a');
  //     a.href = this.MergedpresentationUrl;
  //     //a.href = this.url;
  //     a.download = 'merged_presentation.pptx'; // Optionally set a filename
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);

  //     //window.open(url);
      
  //     },error => {
  //       console.error('Error downloading presentation', error);
  //       alert('Error downloading presentation');
  //     });


  //   if (this.feedbackForm.valid) {
      
  //     const feedbackPayload = {
  //       mergedSlidesKeyId: this.MergedSlidesKey,
  //       SlideTitle: this.feedbackForm.controls['SlideTitle'].value,
  //       UsagePurposeType: this.feedbackForm.controls['UsagePurposeType'].value
  //     };
      
  //     ; // need to check about setting timeout.
  //     this.apiService.submitFeedback(feedbackPayload).subscribe(response => {
  //       ;
  //       console.log('Feedback submitted successfully', response);
  //       alert('Feedback submitted successfully');
  //     }, error => {
  //       console.error('Error submitting feedback', error);
  //       alert('Error submitting feedback');
  //     });

  //     //simultaneosly download the file
        
  //     // let Payload = {
  //     //   slideFileKeys: this.SlideKeyList
  //     // }

  //     // this.apiService.mergeSlides(Payload).subscribe((resp: any) => {
  //     //   console.log(resp, 'meta data result');
  //     //   this.MergedSlidesKey = resp.data.mergedSlideKeyId
  //     //   console.log(this.MergedSlidesKey,'slideId')
  
  //     //   //this.url = resp.data;
  //     //   this.MergedpresentationUrl = resp.data;
  //     //   const a = document.createElement('a');
  //     //   a.href = this.MergedpresentationUrl;
  //     //   //a.href = this.url;
  //     //   a.download = 'merged_presentation.pptx'; // Optionally set a filename
  //     //   document.body.appendChild(a);
  //     //   a.click();
  //     //   document.body.removeChild(a);
  
  //     //   //window.open(url);
        
  //     //   },error => {
  //     //     console.error('Error downloading presentation', error);
  //     //     alert('Error downloading presentation');
  //     //   });


  //   }
  // }

  onHomeClick():void{
    this.router.navigate(["\home"]);
  }

  onSubmit(): void {
    ;
  
    let Payload = {
      slideFileKeys: JSON.parse(this.SlideKeyList)
    }
      
    this.apiService.mergeSlides(Payload).subscribe((resp: any) => {
      console.log(resp, 'meta data result');
      this.MergedSlidesKey = resp.data.mergedSlideKeyId;
      console.log(this.MergedSlidesKey, 'slideId');
  
      this.MergedpresentationUrl = resp.data.objectUrl;
      const a = document.createElement('a');
      a.href = this.MergedpresentationUrl;
      a.download = 'merged_presentation.pptx'; // Optionally set a filename
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  
      // After mergeSlides API call is successful, call submitFeedback API
      if (this.feedbackForm.valid) {
        const feedbackPayload = {
          mergedSlidesKeyId: this.MergedSlidesKey,
          SlideTitle: this.feedbackForm.controls['SlideTitle'].value,
          UsagePurposeType: this.feedbackForm.controls['UsagePurposeType'].value
        };
  
        ; 
        this.apiService.submitFeedback(feedbackPayload).subscribe(response => {
          ;
          console.log('Feedback submitted successfully', response);
          alert('Feedback submitted successfully');
        }, error => {
          console.error('Error submitting feedback', error);
          alert('Error submitting feedback');
        });
      }
    }, error => {
      console.error('Error downloading presentation', error);
      alert('Error downloading presentation');
    });
  }
  
}