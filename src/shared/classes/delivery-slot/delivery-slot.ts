/**
 * Timing
 */
export interface Timing {
	key: string;
	time: string;
}

/**
 * Slot
 */
export interface DeliverySlot {
	_id: number;
	day: string;
	date: string;
	timings: Timing[];
}