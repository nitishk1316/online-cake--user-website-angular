import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message, Product, Wishlist } from 'src/shared/classes';
import { ApiService } from '../api/api.service';
import { StorageService, STORAGE_KEYS } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
	/**
	 * Wishlist service
	 * @param apiService
	 * @param storageService
	 */
	constructor(
		private apiService: ApiService,
		private storageService: StorageService,
	) {
	}

	/**
   * Check product is in wishlist or not
	 * @param id - product id
   * @return boolean
   */
	isWishlisted(id: number): Observable<Message> {
		return this.apiService.get(`/wishlist/${id}`);
	}

	/**
	 * Get user wishlist products
	 */
	getAll(): Observable<Product[]> {
		return this.apiService.get('/wishlist');
	}

	/**
   * Add product to wishlist
	 * @param id - product id
   * @return Message - Success message
   */
	add(id: number): Observable<Message> {
		return this.apiService.update(`/wishlist/${id}`, {});
	}

	/**
   * Remove product from wishlist
	 * @param  id - product id
   * @return SuccessMessage - Success message
   */
	remove(id: number): Observable<Message> {
		return this.apiService.delete(`/wishlist/${id}`);
	}

}
