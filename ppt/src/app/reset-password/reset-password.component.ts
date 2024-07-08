import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ApiService: MasterService,
  ) {}

  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    this.ApiService.resetPassword(this.data.email, this.newPassword).subscribe(
      response => {
        console.log('Password reset successful:', response);
        this.dialogRef.close();
      },
      error => {
        console.error('Password reset failed:', error);
      }
    );
  }


}
