import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailMobilePayload, Message } from 'src/shared/classes';
import { AuthService } from 'src/shared/services';

@Component({
  selector: 'vc-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
	public isLoading: boolean = false;
	public forgotPwdForm: EmailMobilePayload = {
		emailOrMobile: "",
	}
	public errorMessage: string = '';
	public successMessage: string = '';

  constructor(
		private router: Router,
		private authService: AuthService,
	) { }

  ngOnInit(): void {
  }

	/**
	 * Submit forgot password
	 */
	submit() {
		this.isLoading = true;
		this.forgotPwdForm.emailOrMobile = this.forgotPwdForm.emailOrMobile.toString();
		this.authService.validateEmailMobile(this.forgotPwdForm).subscribe((response: Message) => {
			this._setMessage(response.message, null);
			this.isLoading = false;
			this.router.navigate(['/otp-verify'], { queryParams: { emailOrMobile: this.forgotPwdForm.emailOrMobile, isForgot: true }});
		}, (error: Message) => {
			this._setMessage(null, error.message);
			this.isLoading = false;
		});
	}

	/**
	 * Set success or error message alert
	 * @param success
	 * @param error
	 */
	 private _setMessage(success: string, error: string) {
		this.errorMessage = null;
		this.successMessage = null;
		if (success) this.successMessage = success;
		else if(error) this.errorMessage = error;
	}
}
