import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  emailForm: FormGroup;
  otpForm: FormGroup;
  signUpForm: FormGroup;
  errorMessage: string = '';
  otpSent: boolean = false;
  otpVerified: boolean = false;


  constructor(private fb: FormBuilder, private ApiService: UserService, private router: Router) { 
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  
  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });

    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Ensure email is included
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  sendOTP(): void {
    debugger;
    const email = this.emailForm.value.email;
    this.ApiService.sendOtp(email).subscribe(response => {
      console.log(response);
      if (response.success) {
        this.otpSent = true;
      } else {
        alert('Failed to send OTP');
      }
    },  
    error => {
      console.error('Error sending reset password email:', error);
    });
  }

  verifyOTP(): void {
    debugger;
    const email = this.emailForm.value.email;
    const otp = this.otpForm.value.otp;
    this.ApiService.verifyOtp( otp, email ).subscribe(response => {
      console.log(response);
      if (response.success) {
        this.otpVerified = true;
      } else {
        alert('Invalid OTP');
      }
    });
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      debugger;
      const signUpData = {
        firstName: this.signUpForm.value.firstName,
        lastName: this.signUpForm.value.lastName,
        userEMailId: this.emailForm.value.email,
        password: this.signUpForm.value.password
      };
      this.ApiService.signUp({
              firstName: this.signUpForm.value.firstName,
              lastName: this.signUpForm.value.lastName,
              userEMailId: this.signUpForm.value.email,
              password: this.signUpForm.value.password
            }).subscribe(response => {
        console.log(response);
        if (response.success) {
          alert('Account created successfully');
        } else {
          alert('Failed to create account');
        }
      });
    }
  }

  // onSubmit() {
  //   if (this.signUpForm.valid) {
  //     if (this.signUpForm.value.password !== this.signUpForm.value.confirmPassword) {
  //       this.errorMessage = "Password and Confirm Password must match";
  //       return;
  //     }

  //     this.ApiService.signUp({
  //       firstName: this.signUpForm.value.firstName,
  //       lastName: this.signUpForm.value.lastName,
  //       userEMailId: this.signUpForm.value.email,
  //       password: this.signUpForm.value.password
  //     }).subscribe(
  //       response => {
  //         console.log('Sign up successful:', response);
  //         this.router.navigate(['/login']);
  //       },
  //       error => {
  //         console.error('Sign up failed:', error);
  //         this.errorMessage = error.message;
  //       }
  //     );
  //   } else {
  //     this.errorMessage = "Please fill in all required fields.";
  //   }
  // }

}
