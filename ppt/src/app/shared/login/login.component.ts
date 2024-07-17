import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { UserService } from '../service/user.service';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public dialog: MatDialog
  title = 'ppt';
  addInfoForm: FormGroup;
  errorMessage: string;
  loginText = 'Log In';

  constructor(
   
    private formBuilder: FormBuilder,
    private router: Router,
    //private toastrService: ToastrService,
    private ApiService: UserService,
    
  ) {
    this.addInfoForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.email]],
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

      this.ApiService.login(Payload).subscribe((data: any) => {
          console.log(data);
          localStorage.setItem('Token', data.data);
        //  this.router.navigate(['/dashboard/search']);
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

  onLogin() {
    if (this.addInfoForm.valid) {
      this.loginText = 'Logging Please Wait!'
      this.ApiService.login(this.addInfoForm.value).subscribe((data:any) => {
          localStorage.setItem('Token', data.data);
          this.router.navigate(['/dashboard/splitppt']);
          this.loginText = "Log In";
        },(error:any) => {
          console.error('Login failed:', error);
        }
      );
    }
  }

  openForgotPasswordDialog(email: string): void {
    const dialogRef = this.dialog.open(ForgetPasswordComponent, {
      width: '300px',
      data: { email }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
