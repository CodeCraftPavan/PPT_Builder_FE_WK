import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MasterService } from '../services/master.service';
import { PresentationPurpose } from '../models/presentation-purpose.enum';
import { getEnumValues } from '../utils/enum-utils';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  presentationPurpose = PresentationPurpose;
  purposeValues: string[];
  presentationUrl: string;

  constructor(private formBuilder: FormBuilder, private apiService: MasterService, private route: ActivatedRoute) {
    this.purposeValues = getEnumValues(this.presentationPurpose);
  }

  ngOnInit(): void {
    this.feedbackForm = this.formBuilder.group({
      SlideTitle: ['', Validators.required],
      //title: ['', Validators.required],
      UsagePurposeType: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      this.presentationUrl = params['presentationUrl'];
    });
  }

  onSubmit(): void {
    if (this.feedbackForm.valid) {
      const feedbackPayload = {
        ...this.feedbackForm.value
        //presentationUrl: this.presentationUrl
      };
      this.apiService.submitFeedback(feedbackPayload).subscribe(response => {
        console.log('Feedback submitted successfully', response);
        alert('Feedback submitted successfully');
      }, error => {
        console.error('Error submitting feedback', error);
        alert('Error submitting feedback');
      });
    }
  }
}