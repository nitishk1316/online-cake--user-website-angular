import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
	AccessToken,
	EmailMobilePayload,
	LoginPayload,
	Message,
	OTPVerifyPayload,
	ResetPasswordPayload,
	UserPayload
} from 'src/shared/classes';
import { ApiService } from '../api/api.service';

@Injectable()
export class AuthService {
	/**
	 * Auth Service
	 * @param apiService
	 */
	constructor(
		private apiService: ApiService,
	) {
	}

	/**
   * Register
   * @param payload -- registration payload
	 * @return Message
	 */
	public register(payload: UserPayload): Observable<Message> {
		return this.apiService.save('/register', payload);
	}

	/**
   * Login
   * @param payload -- login payload
	 * @return AccessToken
	 */
	public login(payload: LoginPayload): Observable<AccessToken> {
		return this.apiService.save('/login', payload);
	}

	/**
   * validateEmailMobile
   * @param payload -- login payload
	 * @return AccessToken
	 */
	 public validateEmailMobile(payload: EmailMobilePayload): Observable<Message> {
		return this.apiService.save('/validate-email-mobile', payload);
	}

	/**
   * Login via otp
   * @param payload -- OTP Payload
	 * @return SuccessMessage
	 */
	public sendOTP(payload: EmailMobilePayload): Observable<Message> {
		return this.apiService.save('/send-otp', payload);
	}

	/**
	 * Forgot password
	 * @param payload
	 * @return ForgotSuccess
	 */
	forgotPassword(payload: EmailMobilePayload): Observable<Message> {
		return this.apiService.save(`/forgot-password`, payload);
	}

	/**
	 * Reset password
	 * @param payload
	 * @return ForgotSuccess
	 */
	resetPassword(payload: ResetPasswordPayload): Observable<Message> {
		return this.apiService.save(`/reset-password`, payload);
	}

	/**
	 * Verify OTP
	 * @param payload
	 * @return VerifySuccess
	 */
	verifyOTP(payload: OTPVerifyPayload): Observable<AccessToken> {
		return this.apiService.save(`/verify`, payload);
	}
}