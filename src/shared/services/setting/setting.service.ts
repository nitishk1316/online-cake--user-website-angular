import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Setting } from 'src/shared/classes';
import { ApiService } from '../api/api.service';

@Injectable({
  	providedIn: 'root',
})
export class SettingService {
	public setting = new BehaviorSubject<Setting>(null);
	/**
   * Setting service.
   * @param apiService - Api service.
   */
	constructor(
		private apiService: ApiService,
	) {
	}

	/**
	 * Get all settings for website
	 */
	public getAllSettings(): Observable<Setting> {
		return this.apiService.get('/settings');
	}

	/**
	 * Get Anonymous
	 */
	 public getAnonymous(): Observable<{ id: string }> {
		return this.apiService.get('/anonymous');
	}
}