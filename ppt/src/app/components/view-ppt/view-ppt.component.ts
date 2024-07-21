import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../shared/service/user.service';

@Component({
  selector: 'app-view-ppt',
  templateUrl: './view-ppt.component.html',
  styleUrls: ['./view-ppt.component.scss']
})
export class ViewPptComponent {

  S3ObjUrl: any;
  safeUrl :any;
  @Input() maxRating = 5;
  @Input() rating = 0;
  stars: boolean[] = [];
  metadataList: any;

  constructor(private sanitizer: DomSanitizer,@Inject(MAT_DIALOG_DATA) public filData: any,
   private dailogRef: MatDialogRef<ViewPptComponent>,private userService: UserService,){}

  ngOnInit() {
    this.getslideView();
    this.stars = Array(this.maxRating).fill(false);
    let value: any = localStorage.getItem("SplitData");
    this.metadataList =JSON.parse(value);
  }

  getslideView() {
    this.S3ObjUrl = this.filData.element.objectUrl;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://docs.google.com/gview?url=${this.S3ObjUrl}&embedded=true` + '#toolbar=0');
  }

  rate(rating: number) {
    this.rating = rating;
  }

  submitRating() {
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
