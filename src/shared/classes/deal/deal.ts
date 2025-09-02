import { Type } from "../type/type";

/**
 * Deal
 */
export class Deal  {
	_id?: number;
	title: string;
	image?: string;
	dealType?: string;
	value: number;
	type: Type;
	slug: string;
}