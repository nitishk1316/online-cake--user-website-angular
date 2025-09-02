import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable } from 'rxjs';
import {
	ChangeEmailPayload,
	ChangeMobilePayload,
	ChangePasswordPayload,
	Message,
	ProfileUpdatePayload,
	UpdateEmailPayload,
	UpdateMobilePayload,
	User
} from 'src/shared/classes';
import { Wallet } from 'src/shared/classes/wallet/wallet';
import { ApiService } from '../api/api.service';
import { StorageService, STORAGE_KEYS } from '../storage/storage.service';

@Injectable({
  	providedIn: 'root'
})
export class ProfileService {
	private isAuthenticated = new BehaviorSubject<boolean>(false);
	private _token: string;
	private _user: User;

	/**
	 * Profile Service
	 * @param router
	 * @param apiService
	 * @param storageService
	 */
	constructor(
		private router: Router,
		private apiService: ApiService,
		private storageService: StorageService,
	) {
		this.user = this.storageService.getJson(STORAGE_KEYS.USER);
		this.token = this.storageService.getString(STORAGE_KEYS.TOKEN);
	}

	/**
	 * Get token from localStorage
	 * @return token
	 */
	get token(): string {
		return this._token;
	}

	/**
   * Set token in localStorage
   * @param token -- token fetched after login
	 */
	set token(token:  string) {
		if (token) {
			this._token = token;
			this.storageService.setString(STORAGE_KEYS.TOKEN, token);
			this.authenticated = true;
		}
	}

	/**
	 * Set authenticated
	 */
	set authenticated(value: boolean) {
		this.isAuthenticated.next(value);
	}

	/**
	 * Get authenticated
	 */
	get authenticated(): boolean {
		return this.isAuthenticated.getValue();
	}

	/**
	 * Set user
	 */
	set user(user: User) {
		if (user) {
			this._user = user;
			this.storageService.setJson(STORAGE_KEYS.USER, user);
		}
	}

	/**
	 * Get user
	 */
	get user(): User {
		return this._user;
	}

	/**
	 * Get My Profile
	 */
	public getMyInfo(): Observable<User> {
		return this.apiService.get('/profile/me');
	}

	/**
   * Update my profile
   * @param payload
	 * @return Message - success message
   */
	update(payload: ProfileUpdatePayload): Observable<Message> {
		return this.apiService.update(`/profile/me`, payload);
	}

	/**
	 * Change email
	 * @param payload
	 * @return Message - success message
	 */
	changeEmail(payload: ChangeEmailPayload): Observable<Message> {
		return this.apiService.update(`/profile/change-email`, payload);
	}

	/**
	 * Update email
	 * @param payload
	 * @return Message - success message
	 */
	updateEmail(payload: UpdateEmailPayload): Observable<Message> {
		return this.apiService.update(`/profile/update-email`, payload);
	}

	/**
	 * Change mobile number
	 * @param payload
	 * @return Message - success message
	 */
	changeMobile(payload: ChangeMobilePayload): Observable<Message> {
		return this.apiService.update(`/profile/change-mobile`, payload);
	}

	/**
	 * Update mobile number
	 * @param payload
	 * @return Message - success message
	 */
	updateMobile(payload: UpdateMobilePayload): Observable<Message> {
		return this.apiService.update(`/profile/update-mobile`, payload);
	}

	/**
	 * Update password
	 * @param payload
	 * @return Message - success message
	 */
	updatePassword(payload: ChangePasswordPayload): Observable<Message> {
		return this.apiService.update(`/profile/change-password`, payload);
	}

	/**
	 * Logout User
	 */
	logout() {
		this.token = null;
		this.user = null;
		this.authenticated = false;
		this.storageService.remove(STORAGE_KEYS.TOKEN);
		this.storageService.remove(STORAGE_KEYS.USER);
		const lastPage = this.storageService.getString(STORAGE_KEYS.LAST_PAGE);
		if (lastPage) this.router.navigate(['/login']);
		else this.router.navigate(['/']);
	}

	/**
	 * Get My Wallet
	 */
	 public getMyWallet(): Observable<Wallet[]> {
		return this.apiService.get('/profile/wallet');
	}
}
