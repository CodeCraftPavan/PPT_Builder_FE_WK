import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/service/user.service';

@Component({
  selector: 'app-addppt',
  templateUrl: './addppt.component.html',
  styleUrls: ['./addppt.component.scss']
})
export class AddpptComponent {
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
