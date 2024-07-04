import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    // private toastrService: ToastrService,
    private ApiService: MasterService
  ) {
    this.addInfoForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }   
  
  signUp() {
    console.log(this.addInfoForm.value, 'formvalue');

    if (this.addInfoForm.valid) {
      var Payload: any = {
        userEmail: this.addInfoForm.controls['username'].value,
        password: this.addInfoForm.controls['password'].value
      };

      this.ApiService.login(Payload).subscribe(
        (data: any) => {
          console.log(data);
          localStorage.setItem('Token', data.data);
          this.router.navigate(['/home']);
        },
        (error: any) => {
          console.error('Error during login:', error);
          this.errorMessage = error.error.message || 'Login failed. Please try again.';
          alert(this.errorMessage); // Show alert with error message
        }
      );
    }
  }

  onClickCreateAccount(): void {
    this.router.navigate(['/accountCreation']);
  }
}
