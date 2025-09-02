import { MapLocation } from '../common/common';

/**
 * Tax
 */
export interface Tax {
	title: string;
	percent: number;
}

/**
 * Currency
 */
export interface Currency {
	code: string;
	symbol: string;
}

/**
 * Setting
 */
export interface Setting {
	storeName: string;
	address: string;
	email: string;
	phoneNumber: string;
	location: MapLocation;
	deliveryCharges: number;
	minimumForFree: number;
	taxType: string;
	tax: Tax;
	currency: Currency;
}