import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Type } from 'src/shared/classes';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class TypeService {
	/**
   * Type service.
   * @param apiService - Api service.
	 */
	constructor(
		private apiService: ApiService,
	) {

	}

	/**
   * Get all
   */
	getAll(): Observable<Type[]> {
		return this.apiService.get('/types');
	}

	/**
   * Get detail
	 * @param typeId
	 * @return Type
   */
	getType(typeId: number): Observable<Type> {
		return this.apiService.get(`/types/${typeId}`);
	}

	/**
   * Get all popular
   */
	getAllPopular(): Observable<Type[]> {
		return this.apiService.get('/types/popular');
	}
}
