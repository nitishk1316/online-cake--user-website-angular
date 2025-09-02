import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, OrderDetail, Message } from 'src/shared/classes';
import { ApiService } from '../api/api.service';
import { LocaleService } from '../locale/locale.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
	/**
   * Order service.
   * @param apiService - Api service.
   */
	constructor(
		private apiService: ApiService,
		private localeService: LocaleService
	) {
	}

	/**
   * Get my all orders
   * @return Order[] - Order list
   */
	getMyOrder(status: string = 'UPCOMING'): Observable<Order[]> {
		return this.apiService.get(`/orders?status=${status}`);
	}

	/**
   * Get order detail by order id
	 * @param orderId - order id
   * @return OrderDetail - order Detail
   */
	getDetail(orderId: number): Observable<OrderDetail> {
		return this.apiService.get(`/orders/${orderId}`);
	}

	/**
   * Cancel order by order id
	 * @param orderId - order id
   * @return Message - Get success message
   */
	cancelOrder(orderId: number): Observable<Message> {
		return this.apiService.delete(`/orders/${orderId}/cancel`);
	}

	getPaymentStatus(paymentId: string): Observable<Message> {
		return this.apiService.get(`/orders/payment-status/${paymentId}`);
	}

}
