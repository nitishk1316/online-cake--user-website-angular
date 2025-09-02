export interface Variant {
	sku: string;
	capacity: string;
	stock: number;
	originalPrice: number;
	sellingPrice: number;
	discount?: number;
}

/**
 * Product
 */
export interface Product {
	_id: number;
	slug: string;
	title: string;
	desc: string;
	thumbnail: string;
	images: string[];
	variants: Variant[];
}

/**
 * Product List
 */
export interface ProductList {
	data: Product[];
	total: number;
}

export interface ProductDetail {
	_id: number;
	slug: string;
	title: string;
	desc: string;
	thumbnail: string;
	images: string[];
	variants: Variant[];
	type: number;
	flavour: number;
	occasion: number;
}

export enum ProductFilterType {
	TYPE = 'TYPE',
	FLAVOUR = 'FLAVOUR',
	OCCASION = 'OCCASION',
	DEAL = 'DEAL',
}