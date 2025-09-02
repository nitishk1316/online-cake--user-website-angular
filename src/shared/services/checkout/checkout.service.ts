import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeliverySlot, PayMethod } from 'src/shared/classes';
import { ApiService } from '../api/api.service';

@Injectable({
  	providedIn: 'root',
})
export class CheckoutService {
	/**
   * Checkout service.
   * @param apiService - Api service.
   */
	constructor(
		private apiService: ApiService
	) {
	}

	/**
	 * Get all available slots
   * @return DeliverySlot[] - Array of delivery slot
   */
	getDeliverySlot(): Observable<DeliverySlot[]> {
		return this.apiService.get('/delivery-slots');
	}

	/**
   * Get all payment methods
   * @return PayMethod[] - Array of payment methods
   */
	getPayMethods(): Observable<PayMethod[]> {
		return this.apiService.get('/pay-methods');
	}
}
