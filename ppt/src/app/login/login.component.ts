import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent {
  title = 'ppt';

  addInfoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    // private toastrService: ToastrService,
    private ApiService: MasterService) {

    this.addInfoForm = this.formBuilder.group({
      username: [''],
      password: [''],
    })
  }   
  
  signUp() {
console.log(this.addInfoForm.value,'formvalue');

    if(this.addInfoForm.valid){
    var Payload: any = {};
    Payload.userEmail = this.addInfoForm.controls['username'].value;
    Payload.password =  this.addInfoForm.controls['password'].value;

    this.ApiService.login(Payload).subscribe((data: any) => {
      console.log(data);

      localStorage.setItem('Token',data.data)

      this.router.navigate(['splitPPt']);

    } )


    }
}

}
