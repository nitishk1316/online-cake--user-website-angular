import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductDetail, ProductList } from 'src/shared/classes';
import { ApiService } from '../api/api.service';

@Injectable({
  	providedIn: 'root',
})
export class ProductService {
	/**
   * Product service.
   * @param apiService - Api service.
   */
	constructor(
		private apiService: ApiService,
	) { }

	/**
   * Get product detail by id
	 * @param productId - product id
   * @return Product - product Detail
   */
	getById(productId: number): Observable<ProductDetail> {
		return this.apiService.get(`/products/${productId}`);
	}

	/**
   * Get All product and also serach product
	 * @param search - search text for product title
	 * @param page - Page number for pagination
	 * @param limit - Limit for per api call data
   * @return ProductList - List of product with total
   */
	getAll(search: string = null, page: number = 1, limit: number = 20): Observable<ProductList> {
		let params: any = { page: page, limit: limit };
		if (search) params['q'] = search;
		return this.apiService.get(`/products`, params);
	}

	/**
   * Get All product based on cake type
	 * @param typeId - cake type id
	 * @param page - Page number for pagination
	 * @param limit - Limit for per api call data
   * @return ProductList - List of product with total
   */
	getAllByType(typeId: number, page: number = 1, limit: number = 20): Observable<ProductList> {
		return this.apiService.get(`/products/type/${typeId}?page=${page}&limit=${limit}`);
	}

	/**
   * Get All product based on flavour
	 * @param flavourId - flavour id
	 * @param page - Page number for pagination
	 * @param limit - Limit for per api call data
   * @return ProductList - List of product with total
   */
	 getAllByFlavour(flavourId: number, page: number = 1, limit: number = 20): Observable<ProductList> {
		return this.apiService.get(`/products/flavour/${flavourId}?page=${page}&limit=${limit}`);
	}

	/**
   * Get All product based on occasion
	 * @param occasionId - occasion id
	 * @param page - Page number for pagination
	 * @param limit - Limit for per api call data
   * @return ProductList - List of product with total
   */
		getAllByOccasion(occasionId: number, page: number = 1, limit: number = 20): Observable<ProductList> {
			return this.apiService.get(`/products/occasion/${occasionId}?page=${page}&limit=${limit}`);
		}

	/**
   * Get All product based on deal
	 * @param dealId - Deal id
	 * @param page - Page number for pagination
	 * @param limit - Limit for per api call data
   * @return ProductList - List of product with total
   */
	getAllByDeal(dealId: number, page = 1, limit = 20): Observable<ProductList> {
		return this.apiService.get(`/products/deal/${dealId}?page=${page}&limit=${limit}`);
	}

	/**
   * Get products for home page
	 * @return ProductList - List of product with total
   */
	getForHome(): Observable<Product[]> {
		return this.apiService.get(`/products/popular`);
	}
}
