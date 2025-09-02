import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPayload, AccessToken, Message, User } from 'src/shared/classes';
import { AuthService, CartService, ProfileService } from 'src/shared/services';
import { StorageService, STORAGE_KEYS } from 'src/shared/services/storage/storage.service';

@Component({
  selector: 'vc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	public isLoading: boolean = false;
	//DEMO - Remove login credential in release
	public loginPwdForm: LoginPayload = {
		emailOrMobile: "info@aarivo.com",
		password: "12345678",
	}

	public errorMessage: string = '';
	public successMessage: string = '';
	public loginViaOtp: boolean = false;

	constructor(
		private router: Router,
		private authService: AuthService,
		private profileService: ProfileService,
		private cartService: CartService,
		private storageService: StorageService,
	) { }

  ngOnInit(): void {
	}

	/**
	 * Login
	 */
	public login() {
		if (this.loginViaOtp) {
			this.authService.validateEmailMobile({ emailOrMobile: this.loginPwdForm.emailOrMobile }).subscribe((response: Message) => {
				if (response) this.router.navigate(['/otp-verify'], { queryParams: { emailOrMobile: this.loginPwdForm.emailOrMobile }});
			}, (error: Message) => {
				this._setMessage(null, error.message);
				this.isLoading = false;
			});
		} else {
			this.isLoading = true;
			this.loginPwdForm.emailOrMobile = this.loginPwdForm.emailOrMobile.toString();
			this.authService.login(this.loginPwdForm).subscribe((response: AccessToken) => {
				if (response.status) {
					this._redirectToHome(response);
				} else {
					this.router.navigate(['/otp-verify'], { queryParams: { emailOrMobile: response.emailOrMobile }});
				}
			}, (error: Message) => {
				this._setMessage(null, error.message);
				this.isLoading = false;
			});
		}
	}

	/**
	 * Set User and redirect to dashboard
	 * @param response
	 */
	private _redirectToHome(response: AccessToken) {
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
