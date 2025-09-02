import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flavour } from 'src/shared/classes';
import { ApiService } from '../api/api.service';

@Injectable({
  	providedIn: 'root',
})
export class FlavourService {
	/**
   * Flavour service.
   * @param apiService - Api service.
   */
	constructor(
		private apiService: ApiService,
	) {
	}

	/**
   * Get all
   */
	getAll(): Observable<Flavour[]> {
		return this.apiService.get('/flavours');
	}

	/**
   * Get detail
	 * @param flavourId
	 * @return Flavour
   */
	getFlavour(flavourId: number): Observable<Flavour> {
		return this.apiService.get(`/flavours/${flavourId}`);
	}

	/**
   * Get all popular
   */
	 getAllPopular(): Observable<Flavour[]> {
		return this.apiService.get('/flavours/popular');
	}
}