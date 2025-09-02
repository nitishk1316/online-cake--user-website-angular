import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, ResetPasswordPayload } from 'src/shared/classes';
import { AuthService } from 'src/shared/services';
import { HelperService } from 'src/shared/services/helper/helper.service';

@Component({
  selector: 'vc-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
	public isLoading: boolean = false;
	public resetPwdForm: ResetPasswordPayload = {
		verificationToken: null,
		newPassword: null,
		confirmPassword: null,
	}
	public errorMessage: string = '';
	public successMessage: string = '';
	public isPasswordSame: boolean = true;

  constructor(
		private route: ActivatedRoute,
		private router: Router,
		private authService: AuthService,
		private helperService: HelperService,
	) { }

  ngOnInit(): void {
		this.route.queryParams.subscribe((data) => {
			if (data['token']) this.resetPwdForm.verificationToken = data['token'];
			else this.router.navigate(['/forgot-password']);
		});
  }

	/**
	 * Reset password
	 */
	 resetPassword() {
		this.isLoading = true;
		this.authService.resetPassword(this.resetPwdForm).subscribe((response: Message) => {
			this.successMessage = response.message;
			this.helperService.successMsg(response['message']);
			this.router.navigate(['/login']);
			this.isLoading = false;
		}, (error: Message) => {
			this.errorMessage = error.message;
			this.isLoading = false;
		});
	}

	/**
	 * Validate new and confirm password as same
	 */
	 validatePassword() {
		this.isPasswordSame = this.resetPwdForm.confirmPassword === this.resetPwdForm.newPassword;
	}
}
