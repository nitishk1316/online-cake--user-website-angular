import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { Page } from 'src/shared/classes';
import { ApiService } from '../api/api.service';

@Injectable({
  	providedIn: 'root',
})
export class PageService {
	/**
   * Page service.
   * @param apiService - Api service.
   */
	constructor(
		private apiService: ApiService,
	) {
	}

	/**
   * Get page detail by url
	 * @param url
	 * @return Page - page detail
   */
	getPage(url: string): Observable<Page> {
		return this.apiService.get(`/pages/${url}`);
	}
}