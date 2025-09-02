import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Banner } from 'src/shared/classes';
import { ApiService } from '../api/api.service';

@Injectable({
  	providedIn: 'root',
})
export class BannerService {
	/**
   * Banner service.
   * @param apiService - Api service.
   */
	constructor(
		private apiService: ApiService,
	) {
	}

	/**
   * Get all
   */
	getAll(): Observable<Banner[]> {
		return this.apiService.get('/banners');
	}
}