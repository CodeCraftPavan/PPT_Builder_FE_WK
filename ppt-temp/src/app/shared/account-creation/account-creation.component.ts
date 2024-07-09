import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.scss']
})
export class AccountCreationComponent {
  otpSent = false;
  otpVerified = false;

  constructor(private masterService: UserService) {}

  sendOtp(email: string) {
    this.masterService.sendOtp(email).subscribe(
      response => {
        console.log('Email sent successfully', response);
        this.otpSent = true; // Set otpSent to true upon successful sending of OTP
      },
      error => {
        console.error('Error sending email:', error);
        // Handle error, display error message to the user
        if (error.error && error.error.email) {
          // Handle specific validation error for email field
          // For example, display an error message on the form
          // You can bind this error message to a UI element in your template
        }
      }
    );
  }
  
  sendOtpFromForm(accountForm: NgForm) {
    const email = accountForm.value.email; 
    console.log(email, "emailid"); // Extract email from form
    this.sendOtp(email); // Call sendOtp with the extracted email
  }

  verifyOtp(form: NgForm) {
    if (form.value.otp && form.value.email) {
      this.masterService.verifyOtp(form.value.email, form.value.otp).subscribe(
        () => {
          this.otpVerified = true;
          alert('OTP verification successful.');
        },
        error => {
          console.error('Error verifying OTP:', error);
          this.otpVerified = false;
          alert('OTP verification unsuccessful. Please enter the correct OTP.');
        }
      );
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid && this.otpVerified) {
      const accountData = {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        userEMailId: form.value.email,
        password: form.value.password
      };
      this.masterService.createUser(accountData).subscribe(
        response => {
          debugger;
          console.log('Account created successfully', response);
          alert('Account successfully created.'); // Alert for successful account creation
        },
        error => {
          console.error('Error creating account:', error);
          alert('Account creation failed. Please try again.'); // Alert for account creation failure
        }
      );
    }
  }
}
