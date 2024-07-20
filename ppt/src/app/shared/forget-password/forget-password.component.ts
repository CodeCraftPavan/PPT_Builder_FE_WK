import { Component, Inject  } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { UserService } from '../service/user.service';
import { OtpVerificationComponent } from '../otp-verification/otp-verification.component';

export interface DialogData {
  email: string;
}
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  email: string = '';

  constructor(
    public dialogRef: MatDialogRef<ForgetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private ApiService: UserService,
    public dialog: MatDialog
  ) {
    this.email = data.email;
  }

  sendResetPasswordEmail() {
    // this.ApiService.sendResetPasswordEmail(this.email).subscribe(
    //   response => {
    //     console.log('Reset password email sent:', response);
    //     this.dialogRef.close();
    //     this.openOtpDialog();
    //   },
    //   error => {
    //     console.error('Error sending reset password email:', error);
    //   }
    // );
  }

  openOtpDialog(): void {
    const dialogRef = this.dialog.open(OtpVerificationComponent, {
      width: '300px',
      data: { email: this.email, context: 'reset' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === 'verify') {
        this.openResetPasswordDialog();
      }
    });
  }

  openResetPasswordDialog(): void {
    this.dialog.open(ResetPasswordComponent, {
      width: '300px',
      data: { email: this.email }
    });
  }
}
