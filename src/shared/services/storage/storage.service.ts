import { Injectable } from '@angular/core';

export const STORAGE_KEYS = {
	TOKEN: 'token',
	USER: 'user',
	DEFAULT_LANGUAGE: 'defaultLang',
	ANONYMOUS: 'anonymous',
	LAST_PAGE: 'lastPage'
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

	constructor() { }
	/**
   * Set json values from localStorage for specified key
   * @param key
	 */
	public getJson(key: string): any {
		let value = localStorage.getItem(key);
		return JSON.parse(value);
	}

	/**
   * Set string in localStorage
   * @param key
	 * @param value
	 */
	public setString(key: string, value: any): void {
		localStorage.setItem(key, value);
	}

	/**
   * Set string values from localStorage for specified key
   * @param key
	 */
	public getString(key: string): any {
		let value = localStorage.getItem(key);
		return value;
	}

	/**
   * Set key , value in localStorage
   * @param key
	 * @param value
	 */
	public setJson(key: string, value: any): void {
		value = JSON.stringify(value);
		localStorage.setItem(key, value);
	}
	/**
   * Remove the key stored in localStorage
   * @param key
	 */
	public remove(key: string): void {
		localStorage.removeItem(key);
	}

}
