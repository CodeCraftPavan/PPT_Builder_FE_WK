import { Component, Inject  } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { UserService } from '../service/user.service';
import { OtpVerificationComponent } from '../otp-verification/otp-verification.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { passwordReset } from 'src/app/utils/passwordReset';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  verifyEmailForm: FormGroup;
  OTPVerifyForm : FormGroup;
  resetPasswordForm: FormGroup;
  emailPattern = '^.+@ecanarys.com$';
  buttonText = 'Submit';
  email: string;

  showVerifyEmailForm : boolean = true;
  showOTPVerifyForm: boolean = false;
  showResetPasswordForm:boolean = false;
  submitted :boolean = false;
  
  get g(){ return this.verifyEmailForm.controls}; 
  get h(){ return this.OTPVerifyForm.controls};
  get i() { return this.resetPasswordForm.controls; }

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
    this.resetPasswordForm = this.formBuilder.group({
      // newPassword: ['', [Validators.required, Validators.minLength(6)]],
      // confirmPassword: ['', Validators.required]
      newPassword: [''],
      confirmPassword: ['']
    }, { validator: this.mustMatch('newPassword', 'confirmPassword') });
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
        this.toastrService.success('Email has been verified successfully!');
        this.showOTPVerifyForm = false;
        this.showResetPasswordForm = true;
       // this.showLoginForm = true;
       
      },error: (error:any) => {
        //this.errorHandler.HandleError(error);
        
      }});
    }
  }

  onResetPassword() {
    debugger;
    console.log(this.resetPasswordForm.valid,'form valid');
    this.submitted = true;
    if (this.resetPasswordForm.valid) {
      this.buttonText = 'Resetting Password Please Wait!';
      const resetPassword : passwordReset = {
        newPWD : this.resetPasswordForm.controls['newPassword'].value,
        email: this.OTPVerifyForm.controls['email'].value
      }
      // let resetData = {
      //   newPWD: this.resetPasswordForm.controls['newPassword'].value,
      //   email: this.OTPVerifyForm.controls['email'].value
      // };
      this.ApiService.resetPassword(resetPassword).subscribe({
        next: (data: any) => {
          this.buttonText = 'Submit';
          this.toastrService.success('Password reset successfully.');
          this.showResetPasswordForm = true;
        },
        error: (error) => {
          debugger;
          this.toastrService.error('Password reset failed' );
          this.buttonText = 'Submit';
        }
      });
    }
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}


