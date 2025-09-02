import { Component, OnInit } from '@angular/core';
import { ChangePasswordPayload, Message } from 'src/shared/classes';
import { ProfileService } from 'src/shared/services';
import { HelperService } from 'src/shared/services/helper/helper.service';

@Component({
  selector: 'vc-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
	public passwordObj: ChangePasswordPayload = {
		currentPassword: '',
		newPassword: '',
		confirmPassword: ''
	};
	public isPasswordSame: boolean = true;
	public isLoading: boolean = false;
	public errorMessage: string = null;

  constructor(
		private profileService: ProfileService,
		private helperService: HelperService
	) { }

  ngOnInit(): void {
	}

	/**
	 * Update password
	 */
	updatePassword() {
		this.isLoading = true;
		this.profileService.updatePassword(this.passwordObj).subscribe((response: Message) => {
			this.helperService.successMsg(response.message);
			this.errorMessage = null;
			this.passwordObj.currentPassword = null;
			this.passwordObj.newPassword = null;
			this.passwordObj.confirmPassword = null;
			this.isLoading = false;
		}, (error:  Message) => {
			this.errorMessage = error.message;
			this.isLoading = false;
		});
	}

	/**
	 * Validate new and confirm password as same
	 */
	validatePassword() {
		this.isPasswordSame = this.passwordObj.confirmPassword === this.passwordObj.newPassword;
	}
}
