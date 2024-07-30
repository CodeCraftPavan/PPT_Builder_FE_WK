import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  errorMessage: string = '';
  otpSent: boolean = false;
  otpVerified: boolean = false;
  verifyEmailForm: FormGroup;
  OTPVerifyForm : FormGroup;
  signUpForm: FormGroup;
  showVerifyEmailForm : boolean = true;
  showOTPVerifyForm: boolean = false;
  showRegisterForm: boolean = false;
  buttonText = 'Submit';
  emailPattern = '^.+@ecanarys.com$';
  get g(){ return this.verifyEmailForm.controls}; 
  get h(){ return this.OTPVerifyForm.controls};
  get f() { return this.signUpForm.controls; }
  submitted :boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private ApiService: UserService, 
    private toastrService: ToastrService,
    private router:Router
  ) { 

    this.verifyEmailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
    });
    this.OTPVerifyForm = this.formBuilder.group({
      email: [''],
      otp: ['', Validators.required]
    });

    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userEMailId: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
     // confirmPassword: ['', Validators.required]
    });
  }

  
  ngOnInit(): void {
  }

  onVerifyEmail() {
    if (this.verifyEmailForm.valid) {
      this.buttonText = 'Submitting Please Wait!';
      this.ApiService.verifyEmail(this.verifyEmailForm.value).subscribe((data: any) => {
        this.buttonText = "Submit";
        this.toastrService.success('OTP sent to your registered email.');
        this.showOTPVerifyForm = true;
        this.showVerifyEmailForm = false;
        this.OTPVerifyForm.controls['email'].setValue(this.verifyEmailForm.controls['email'].value)
      }
      
    );
    }
      
  }

  onOTPVerifySubmit(){
    if (this.verifyEmailForm.valid) {
      this.buttonText = 'Submitting Please Wait!';
      this.ApiService.verifyOTP(this.OTPVerifyForm.value).subscribe({next:(data: any) => {
        this.buttonText = "Submit";
        this.signUpForm.controls['userEMailId'].setValue(this.OTPVerifyForm.controls['email'].value)

        this.toastrService.success('Email has been verified successfully!');
        this.showOTPVerifyForm = false;
       // this.showLoginForm = true;
       this.showRegisterForm = true;
      },error: (error:any) => {
        //this.errorHandler.HandleError(error);
        
      }});
    }
  }

  onUserRegister(){
    console.log(this.signUpForm.valid,'form valid');
    
    this.submitted =true;
    if (this.signUpForm.valid) {
      this.buttonText = 'Submitting Please Wait!';
      this.ApiService.createUser(this.signUpForm.value).subscribe({next:(data: any) => {
        debugger;
        this.buttonText = "Submit";
        this.toastrService.success('Account created successfully!');
        this.showRegisterForm = true;
        this.router.navigate(['/login']);
      },error: (error:any) => {
        debugger;
        this.buttonText = 'Submit';
        //this.errorHandler.HandleError(error);
        this.toastrService.error("Account already exists, kindly login.")
      }});
    }
 
  }
}
