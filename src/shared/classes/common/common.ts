/**
 * MapLocation
 */
export interface MapLocation {
	latitude: number;
	longitude: number;
}

/**
 * Message
 */
export interface Message {
	message: string;
	status?: boolean;
	errors?: Array<string>;
}

/**
 * FileUrl
 */
export interface FileUrl {
	url: string;
}