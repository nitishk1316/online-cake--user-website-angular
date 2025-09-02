import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
	Cart,
	CartProduct,
	CartProductInfo,
	Message,
	PaymentPayload
} from 'src/shared/classes';
import { ApiService } from '../api/api.service';

let cartProducts = {};
/**
 * Cart Service
 */
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartProducts = new BehaviorSubject<CartProductInfo>({});
  public cartProducts$ = this.cartProducts.asObservable();

  private cartCount = new BehaviorSubject<number>(null);
  public cartCount$ = this.cartCount.asObservable();

  /**
   * Constructor
   * @param apiService
   * @param utilService
   */
  constructor(
    private apiService: ApiService,
  ) {}

	public updateCartProducts(products: CartProduct[], count: number) {
		cartProducts = {};
		products.map(t => cartProducts[t.sku] = t.quantity);
		this.cartCount.next(count);
    this.cartProducts.next(cartProducts);

	}
  /**
   * Add product to cart
   * @param productId - product
   * @param quantity - quantity
   */
  public addToCart(productId: number, sku: string, quantity: number, eggless?: boolean): Observable<Cart> {
		const qty = quantity ? quantity : 1;
    return this.apiService.save(`/carts`, { _id: productId, quantity: qty, sku: sku, eggless: eggless });
  }

  /**
   * Increament quantity in cart
   * @param productId - product
   */
  public inc(productId: number, sku: string, eggless?: boolean): Observable<Cart> {
		let count: number = cartProducts[sku];
    if (cartProducts[sku]) count += 1;
    return this.apiService.save(`/carts`, { _id: productId, quantity: count, sku: sku, eggless: eggless });
  }

  /**
   * Decrement quantity in cart
   * @param variant - variant
   */
  public dec(productId: number, sku: string, eggless?: boolean): Observable<Cart> {
		let count: number = cartProducts[sku];
    if (cartProducts[sku]) count -= 1;
    return this.apiService.save(`/carts`, { _id: productId, quantity: count, sku: sku, eggless: eggless });
  }

  /**
   * Set cart on app init
   */
  public init() {
    this.apiService.get(`/carts`)
		.subscribe((response: Cart) => {
			this.updateCartProducts(response.products, response.count);
		});
  }

  public getCart(): Observable<Cart> {
    return this.apiService.get(`/carts`);
  }

	public checkCart(): void {
    this.apiService.get(`/carts/check`).subscribe((response: Cart) => {
			this.updateCartProducts(response.products, response.count);
		});
  }

  /**
   * Set address
   * @param addressId - address id
   * @return Message
   */
  public setAddress(addressId: number): Observable<Message> {
    return this.apiService.update(`/carts/address/${addressId}`, {});
  }

  /**
   * Set slot
   * @param slotKey - slot time key
   * @return Message
   */
  public setSlot(slotKey: string): Observable<Message> {
    return this.apiService.update(`/carts/delivery-slots/${slotKey}`, {});
  }

  /**
   * Apply coupon
   * @param code
   * @return Cart
   */
  applyCoupon(code: string): Observable<Cart> {
    return this.apiService.update(`/carts/coupon/${code}`, {});
  }

	/**
   * Remove coupon
   * @return Cart
   */
	removeCoupon(): Observable<Cart> {
    return this.apiService.delete(`/carts/coupon`);
  }

  /**
   * Place order
   * @return Order|Payment
   */
  placeOrder(payload: PaymentPayload): Observable<any> {
    return this.apiService.update('/carts/place?isWeb=true', payload);
  }

	/**
   * Apply or remove wallet
   * @return Cart
   */
	updateWallet(isWalletUsed: boolean): Observable<Cart> {
		if (isWalletUsed) return this.apiService.update('/carts/wallet/remove', {});
		else return this.apiService.update('/carts/wallet/apply', {});
	}

	/**
   * Update Message
	 * @param sku
   * @return Cart
   */
	updateMessage(sku: string, message: string): Observable<Message> {
		return this.apiService.save(`/carts/${sku}/message`, { message: message });
	}
}
