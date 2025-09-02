import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message,  UserPayload } from 'src/shared/classes';
import { AuthService } from 'src/shared/services/auth/auth.service';

@Component({
  selector: 'vc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	public isLoading: boolean = false;
	public registerForm: UserPayload = {
		firstName: '',
		lastName: '',
		mobileNumber: null,
		email: '',
		password: ''
	};

	public errorMessage: string = '';
	public successMessage: string = '';

  constructor(
		private router: Router,
		private authService: AuthService,
	) { }

  ngOnInit(): void {
	}

	/**
	 * Register User
	 * @param payload
	 */
	public register() {
		this.isLoading = true;
		this.authService.register(this.registerForm).subscribe((response: Message) => {
			this._setMessage(response.message, null);
			this.router.navigate(['/otp-verify'], { queryParams: { emailOrMobile: this.registerForm.mobileNumber }});
			this.isLoading = false;
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
