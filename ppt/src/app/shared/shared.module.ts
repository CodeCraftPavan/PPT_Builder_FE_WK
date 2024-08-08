import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';

import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';
import { CommonModule } from '@angular/common';
import { WelcomeDialogComponent } from './welcome-dialog/welcome-dialog.component';
import { DocumentationComponent } from './documentation/documentation.component';
//import { DataNotFoundComponent } from './data-not-found/data-not-found.component';

@NgModule({
  imports: [
    MaterialModule, CommonModule
  ],
  declarations: [
    LoginComponent,
    ForgetPasswordComponent,
    OtpVerificationComponent,
    ResetPasswordComponent,
    SignupComponent,
    WelcomeDialogComponent,
    DocumentationComponent,
   
  ]
})

export class SharedModule {}
