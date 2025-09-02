import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService, STORAGE_KEYS } from '../storage/storage.service';

@Injectable({
  	providedIn: 'root'
})
export class LocaleService {
	/**
	 * Locale Service
	 * @param translate
	 * @param storageService
	 */
	constructor(
		private translate: TranslateService,
		private storageService: StorageService,
	) {
	}

	/**
	 * Get Default language
	 */
	public getDefault() {
		return this.storageService.getString(STORAGE_KEYS.DEFAULT_LANGUAGE);
	}

	/**
   * Set language and use
	 * @param selectedLang Language code
	 * @return boolean
	 */
	public setLanguage(selectedLang: string): void {
		this.translate.setDefaultLang(selectedLang);
		this.translate.use(selectedLang);
		this.storageService.setString(STORAGE_KEYS.DEFAULT_LANGUAGE, selectedLang);
	}

	/**
	 * Get language translation by key
	 * @param key
	 * @param params
	 */
	public getTranslation(key: string, params?: object): string {
		return this.translate.instant(key, params);
	}

	/**
	 * Fire event on language change
	 */
	onLangChange() {
		return this.translate.onLangChange;
	}
}
