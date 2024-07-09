import { Component } from '@angular/core';
import { UserService } from '../../shared/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mergeppt',
  templateUrl: './mergeppt.component.html',
  styleUrls: ['./mergeppt.component.scss']
})
export class MergepptComponent {

  reportFile:any;
  isLoading = false;

  constructor( private ApiService: UserService,
    private router: Router,
  ){

  }

  SubmitFile(){
    this.isLoading = true;
    let formData = new FormData();
    formData.append('file',this.AttachFiles);

    this.ApiService.mergePPt(formData).subscribe((data: any) => {
      console.log(data);
      let value = JSON.stringify(data)
      localStorage.setItem('SplitData',value)
      
      this.router.navigate(['/metadata']);
    } )
  }

  onHomeClick():void{
    this.router.navigate(["\home"]);
  }

  AttachFiles:any;
  uploadFile(e: any) {
    this.AttachFiles = e.target.files[0];
    console.log(this.AttachFiles,'file');
 
  }

}
