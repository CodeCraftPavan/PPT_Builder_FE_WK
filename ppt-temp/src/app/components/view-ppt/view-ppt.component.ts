import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-ppt',
  templateUrl: './view-ppt.component.html',
  styleUrls: ['./view-ppt.component.scss']
})
export class ViewPptComponent {

  S3ObjUrl: any;
  safeUrl :any;

  constructor(private sanitizer: DomSanitizer,@Inject(MAT_DIALOG_DATA) public filData: any, private dailogRef: MatDialogRef<ViewPptComponent>){}

  ngOnInit() {
    this.getslideView();
  }

  getslideView() {
    this.S3ObjUrl = this.filData.element.objectUrl;
    console.log(this.filData, 'url for load');
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://docs.google.com/gview?url=${this.S3ObjUrl}&embedded=true` + '#toolbar=0');
    console.log(this.safeUrl, '')


  }

}
