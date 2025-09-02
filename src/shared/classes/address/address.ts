import { MapLocation } from '../common/common';
/**
 * Address Type
 */
export enum AddressType {
	HOME = 'HOME',
	WORK = 'WORK',
	OTHER = 'OTHER'
}

/**
 * Address Payload
 */
export interface AddressPayload {
	name: string;
	address: string;
	flat: string;
	street: string;
	mobileNumber?: string;
	addressType: string;
	location: MapLocation;
	country: string;
}

/**
 * Address
 */
export interface Address {
	_id: number;
	name: string;
	address: string;
	flat: string;
	street: string;
	mobileNumber?: string;
	addressType: string;
	location: MapLocation;
	country: string;
}