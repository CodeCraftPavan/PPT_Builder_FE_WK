import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../shared/service/user.service';
import { ToastrService } from 'ngx-toastr';

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
   private dailogRef: MatDialogRef<ViewPptComponent>,private userService: UserService,
  private toastr : ToastrService){}

  ngOnInit() {
    this.getslideView();
    this.stars = Array(this.maxRating).fill(false);
  
  }

  getslideView() {
    this.S3ObjUrl = this.filData.element.objectUrl;
    console.log(this.S3ObjUrl);
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://docs.google.com/gview?url=${this.S3ObjUrl}&embedded=true` + '#toolbar=0');
  }

  rate(rating: number) {
    this.rating = rating;
  }

  submitRating() {
    let payload :any= {};
    payload.rating= this.rating,
    payload.slideId= this.filData.element.id
    if(this.rating != 0){
    this.userService.addRating(payload).subscribe((response: any) => {
      console.log(response, 'Ratings data');
      this.dailogRef.close()
    })}else{
      this.toastr.error('Please select a rating')
    }
  }


}
