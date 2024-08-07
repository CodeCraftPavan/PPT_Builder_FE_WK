import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { UserService } from '../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from '../service/master.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public dialog: MatDialog
  title = 'ppt';
  loginForm: FormGroup;
  errorMessage: string;
  showLoginForm : boolean = true;
  showRegisterForm : boolean = false;
  loginText = 'Log In';
  get f(){ return this.loginForm.controls};
  submitted :boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private toastrService: ToastrService,
    private router: Router,
    private ApiService: UserService) {
    this.loginForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(){
    
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.loginText = 'Logging Please Wait!'
      this.ApiService.login(this.loginForm.value).subscribe({next:(data: any) => {
        if(data.data){
        localStorage.setItem('Token', data.data.token);
        localStorage.setItem('firstName', data.data.firstName);
        localStorage.setItem('lastName', data.data.lastName);
        this.masterService.saveToken(data.data.token);
        this.router.navigate(['/dashboard/mergeppt']);

        this.loginText = "Log In";
        }
      },error: (error:any) => {
        this.toastrService.error('Login Failed. Please try again.')
        this.loginText = 'Log In'
      }});
     
    }
  }

  goToVerifyEmail(){
    this.showLoginForm = false;
    this.showRegisterForm = true;
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
