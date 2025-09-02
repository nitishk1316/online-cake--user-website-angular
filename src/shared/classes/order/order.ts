import { Address } from "../address/address";
import { User } from "../user/user";
import { Tax } from "../setting/setting";
import { CartCoupon } from "../cart/cart";

/**
 * Order Product
 */
export interface OrderProduct {
	orderId?: number;
	productId: number;
	title: string;
	thumbnail: string;
	capacity: string;
	sellingPrice: number;
	originalPrice: number;
	discount?: number;
	quantity: number;
	total: number;
}

/**
 * Slot
 */
export interface Slot {
	time: string;
	date: string;
}

export class PaymentPayload {
	method: string;
	id?: string;
}

/**
 * Order
 */
export interface Order {
	_id: number;
	createdAt: string;
	payTotal: number;
	grandTotal: number;
	count: number;
	method: string;
	slot: Slot;
	status: string;
	paymentStatus: string;
}

/**
 * Order Detail
 */
export interface OrderDetail extends Order {
	products: OrderProduct[];
	deliveryAddress: Address;
	coupon: CartCoupon;
	subTotal: number;
	deliveryCharges: number;
	tax: Tax,
	taxType: string;
	isWalletUsed: boolean;
	walletAmount: number;
}