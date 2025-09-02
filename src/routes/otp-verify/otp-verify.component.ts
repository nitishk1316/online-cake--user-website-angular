import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailMobilePayload, OTPVerifyPayload, AccessToken, Message, User } from 'src/shared/classes';
import { CartService } from 'src/shared/services';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { ProfileService } from 'src/shared/services/profile/profile.service';
import { StorageService, STORAGE_KEYS } from 'src/shared/services/storage/storage.service';

@Component({
  selector: 'vc-otp-verify',
  templateUrl: './otp-verify.component.html',
  styleUrls: ['./otp-verify.component.scss']
})
export class OtpVerifyComponent implements OnInit {
	public isForgot: boolean = false;
	public isLoading: boolean = false;
	public otpForm: EmailMobilePayload = {
		emailOrMobile: "",
	}
	public verifyForm: OTPVerifyPayload = {
		emailOrMobile: "",
		otp: "",
		isForgot: false
	}
	public errorMessage: string = '';
	public successMessage: string = '';

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private authService: AuthService,
		private profileService: ProfileService,
		private cartService: CartService,
		private storageService: StorageService,
	) { }

  ngOnInit(): void {
		this.route.queryParams.subscribe(query => {
			if (query['emailOrMobile']) {
				if (query['isForgot']) this.verifyForm.isForgot = query['isForgot'];

				this.verifyForm.emailOrMobile = query['emailOrMobile'];
				this.otpForm.emailOrMobile = query['emailOrMobile'];
				this.sendOTP();
			} else {
				this.router.navigate(['/login']);
			}
		});
	}

	/**
	 * Send OTP
	 */
	public sendOTP() {
		this.isLoading = true;
		this.authService.sendOTP(this.otpForm).subscribe((response: Message) => {
			this._setMessage(response.message, null);
			this.successMessage = response.message;
			this.isLoading = false;
		}, (error: Message) => {
			this._setMessage(null, error.message);
			this.isLoading = false;
		});
	}

	/**
	 * Verify OTP
	 */
	public verify() {
		this.isLoading = true;
		this.authService.verifyOTP(this.verifyForm).subscribe((response: AccessToken) => {
			if (this.verifyForm.isForgot)
				this.router.navigate(['/reset-password'], { queryParams: { token: response.verificationToken }});
			else
				this.this_redirectToHome(response);
			this.isLoading = false;
		}, (error: Message) => {
			this._setMessage(null, error.message);
			this.isLoading = false;
		})
	}

	/**
	 * Set User and redirect to dashboard
	 * @param response
	 */
	private this_redirectToHome(response: AccessToken) {
		this.profileService.token = response.token;

		this.profileService.getMyInfo().subscribe((response: User) => {
			this.profileService.user = response;
			this.isLoading = false;
			this.cartService.checkCart();
			const lastPage = this.storageService.getString(STORAGE_KEYS.LAST_PAGE);
			if (lastPage) {
				this.storageService.remove(STORAGE_KEYS.LAST_PAGE);
				this.router.navigateByUrl(lastPage);
			}
			else this.router.navigate(['/']);
		}, (error: Message) =>  {
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
