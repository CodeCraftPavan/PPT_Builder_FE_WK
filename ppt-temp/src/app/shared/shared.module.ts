import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { AccountCreationComponent } from './account-creation/account-creation.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    MaterialModule, CommonModule
  ],
  declarations: [
    LoginComponent,
    AccountCreationComponent,
    ForgetPasswordComponent,
    OtpVerificationComponent,
    ResetPasswordComponent,
    SignupComponent
  ]
})

export class SharedModule {}
