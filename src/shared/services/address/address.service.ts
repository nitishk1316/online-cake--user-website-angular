import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address, AddressPayload, Message } from 'src/shared/classes';
import { ApiService } from '../api/api.service';

@Injectable({
  	providedIn: 'root',
})
export class AddressService {
	/**
   * Address service.
   * @param apiService - Api service.
   */
	constructor(
		private apiService: ApiService
	) {
	}

	/**
   * Get all address
   * @return Address[] - Array of address
   */
	getAll(): Observable<Address[]> {
		return this.apiService.get('/address');
	}

	/**
   * Get address by id
   * @return Address - Address detail
   */
	getById(id: number): Observable<Address> {
		return this.apiService.get(`/address/${id}`);
	}

	/**
   * Save address
   * @param payload - address payload
   * @return Message - Success message
   */
	save(payload: AddressPayload): Observable<Message> {
		return this.apiService.save('/address', payload);
	}

	/**
   * Update address by id
	 * @param id - address id
   * @param payload - address payload
   * @return Message - Success message
   */
	update(id: number, payload: AddressPayload): Observable<Message> {
		return this.apiService.update(`/address/${id}`, payload);
	}
	
	/**
   * Delete address by id
	 * @param id - address id
   * @return Message - Success message
   */
	delete(id: number): Observable<Message> {
		return this.apiService.delete(`/address/${id}`);
	}
}
