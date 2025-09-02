import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Occasion } from 'src/shared/classes';
import { ApiService } from '../api/api.service';

@Injectable({
  	providedIn: 'root',
})
export class OccasionService {
	/**
   * Occasion service.
   * @param apiService - Api service.
   */
	constructor(
		private apiService: ApiService,
	) {
	}

	/**
   * Get all
   */
	getAll(): Observable<Occasion[]> {
		return this.apiService.get('/occasions');
	}

	/**
   * Get detail
	 * @param occasionId
	 * @return Occasion
   */
	getOccasion(occasionId: number): Observable<Occasion> {
		return this.apiService.get(`/occasions/${occasionId}`);
	}

	/**
   * Get all popular
   */
	getAllPopular(): Observable<Occasion[]> {
		return this.apiService.get('/occasions/popular');
	}
}