import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Deal } from 'src/shared/classes';
import { ApiService } from '../api/api.service';

@Injectable({
  	providedIn: 'root',
})
export class DealService {
	/**
   * Deal service.
   * @param apiService - Api service.
   */
	constructor(
		private apiService: ApiService,
	) {
	}

	/**
   * Get all
   */
	getAll(): Observable<Deal[]> {
		return this.apiService.get('/deals');
	}

	/**
   * Get detail
	 * @param dealId
	 * @return Deal
   */
	getDeal(dealId: number): Observable<Deal> {
		return this.apiService.get(`/deals/${dealId}`);
	}
}