/**
 * Coupon
 */
export interface Coupon {
	code: string;
	couponType: string;
	discount: number;
	minAmount: number;
	maxDiscount: number;
	startDate: Date;
	endDate: Date;
	type: number;
}