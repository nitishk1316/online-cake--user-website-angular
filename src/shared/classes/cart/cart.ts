import { Tax } from "../setting/setting";

/*
* Cart product payload
*/
export interface CartPayload {
	_id: number;
	quantity: number;
}

/**
 * Cart Coupon
 */
 export class CartCoupon {
	code: string;
	discount: number;
}

/**
 * Cart Product Obj
 */
export interface CartProductInfo {
	[key: number]: number;
}

/**
 * Cart Product
 */
 export class CartProduct {
	_id: number;
	title: string;
	thumbnail: string;
	sku: string;
	capacity: string;
	sellingPrice: number;
	originalPrice: number;
	discount?: number;
	quantity: number;
	total: number;
	message?: string;
}

/**
 * Cart
 */
 export interface Cart {
	_id: number;
	count: number;
	products: CartProduct[];
	subTotal: number;
	payTotal: number;
	grandTotal: number;
	deliveryCharges: number;
	tax: Tax;
	taxType: string;
	currency: string;
	taxPrice: number;
	address: number;
	coupon: CartCoupon;
	slot: string;
	status: boolean;
	message?: string;
	isWalletUsed: boolean;
	walletAmount: number;
}

export interface OrderPlace {
	id?: number;
	status: boolean;
	message?: string;
}