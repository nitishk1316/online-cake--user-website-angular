/**
 * Access Token
 */
export class AccessToken {
	status: boolean;
	id: number;
	token: string;
	role: string;
	mobileVerify?: boolean;
	emailVerify?: boolean;
	emailOrMobile: string;
	verificationToken?: string;
}

/**
 * User Payload
 */
export class UserPayload {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	mobileNumber: string;
}

/**
 * Forgot Password Payload
 */
export class EmailMobilePayload {
	emailOrMobile: string;
}

/**
 * OTP Verify Payload
 */
export class OTPVerifyPayload {
	emailOrMobile: string;
	otp: string;
	isForgot?: boolean;
}

/**
 * User Detail
 */
export class UserDetail {
	_id: number;
	firstName: string;
	lastName: string;
	email: string;
	mobileNumber: string;
	emailVerified: boolean;
	walletAmount: number;
}

/**
 * Profile Update Payload
 */
export class ProfileUpdatePayload {
	firstName: string;
	lastName: string;
}

/**
 * Reset Password
 */
export class ResetPasswordPayload {
	verificationToken: string;
	newPassword: string;
	confirmPassword?: string;
}

/**
 * Chnage Password
 */
export class ChangePasswordPayload {
	currentPassword: string;
	newPassword: string;
	confirmPassword?: string;
}

/**
 * Login Payload
 */
export class LoginPayload {
	emailOrMobile: string;
	password: string;
}

/**
 * User
 */
export class User {
	_id: number;
	firstName: string;
	lastName: string;
	email: string;
	mobileNumber: string;
	walletAmount: number;
}

/**
 * Change Email Payload
 */
export class ChangeEmailPayload {
	email: string;
}

/**
 * Update Email Payload
 */
export class UpdateEmailPayload {
	email: string;
	otp: string;
}

/**
 * Change Mobile Payload
 */
export class ChangeMobilePayload {
	mobileNumber: string;
}

/**
 * Update Mobile Payload
 */
export class UpdateMobilePayload {
	mobileNumber: string;
	otp: string;
}