import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { Cart, Message, OrderPlace, PaymentType, PayMethod, User } from 'src/shared/classes';
import { CartService, CheckoutService } from 'src/shared/services';
import { HelperService } from 'src/shared/services/helper/helper.service';
import { ProfileService } from 'src/shared/services/profile/profile.service';
import { StorageService, STORAGE_KEYS } from 'src/shared/services/storage/storage.service';

@Component({
  selector: 'vc-checkout-select-payment',
  templateUrl: './select-payment.component.html',
  styleUrls: ['./select-payment.component.scss']
})
export class SelectPaymentComponent implements OnInit {
	public isLoading: boolean = false;
	public cart: Cart;
	public paymentList: PayMethod[] = [];
	public wallet = {
		used: false,
		amount: 0
	}
	public stripe: any;
	public apiKey: string = environment.STRIPE_PUBLISHER_KEY;
	public coupon = {
		code: ''
	};

	constructor(
		private router: Router,
		public profileService: ProfileService,
		public helperService: HelperService,
		public cartService: CartService,
		public checkoutService: CheckoutService,
		public storageService: StorageService,
	) {
		if (!this.profileService.authenticated) {
			this.storageService.setString(STORAGE_KEYS.LAST_PAGE, this.router.url);
			this.router.navigate(['/login']);
			return;
		}
	}

  async ngOnInit() {
		this.getMyProfile();
		this.getMyCart();
		this.getAllPayMethods();
		this.stripe = await loadStripe(this.apiKey);
	}

	/**
	 * Get My Cart
	 */
	getMyProfile() {
		this.profileService.getMyInfo().subscribe((user: User) => {
			this.wallet.amount = user.walletAmount;
		});
	}

	/**
	 * Get My Cart
	 */
	getMyCart() {
		this.cartService.getCart().subscribe((cart: Cart) => {
			this.cart = cart;
			if (cart.products.length == 0) this.router.navigate(['/']);
			this.wallet.used = this.cart.isWalletUsed;
			if (cart.coupon.code) this.coupon.code = cart.coupon.code;
		});
	}

	/**
	 * Get all available payment methods
	 */
	 getAllPayMethods() {
		this.isLoading = true;
		this.checkoutService.getPayMethods().subscribe((response: PayMethod[]) => {
			this.paymentList = response;
			this.isLoading = false;
		}, error => this.isLoading = false);
	}

	/**
	 * Apply coupon
	 */
	 applyCoupon() {
		this.isLoading = true;
		this.cartService.applyCoupon(this.coupon.code).subscribe((response: Cart) => {
			this.cart = response;
			this.wallet.used = this.cart.isWalletUsed;
			this.helperService.successMsg(response.message);
			this.isLoading = false;
		}, (error: Message) => {
			this.helperService.errorMsg(error.message);
			this.isLoading = false;
		});
	}

	/**
	 * Remove coupon
	 */
	 removeCoupon() {
		this.isLoading = true;
		this.cartService.removeCoupon().subscribe((response: Cart) => {
			this.cart = response;
			this.wallet.used = this.cart.isWalletUsed;
			this.helperService.successMsg(response.message);
			this.coupon.code = null;
			this.isLoading = false;
		}, (error: Message) => {
			this.helperService.errorMsg(error.message);
			this.isLoading = false;
		});
	}

	/**
	 * Apply wallet
	 */
	 applyWallet() {
		this.isLoading = true;
		this.cartService.updateWallet(this.cart.isWalletUsed).subscribe((response: Cart) => {
			this.cart = response;
			this.wallet.used = this.cart.isWalletUsed;
			this.helperService.successMsg(response.message);
			this.isLoading = false;
		}, (error: Message) => {
			this.helperService.errorMsg(error.message);
			this.isLoading = false;
		});
	}

	/**
	 * Place order as COD
	 */
	placeOrder(method: string) {
		this.isLoading = true;
		this.cartService.placeOrder({ method: method }).subscribe((response: OrderPlace) => {
			this.isLoading = false;
			if (response.status && method == PaymentType.COD) this.router.navigate(['/order-success']);
			else if (response.status && method == PaymentType.CARD) {
				this.stripe.redirectToCheckout({ sessionId: response.id })
				.then(({ error }) => {
					this.helperService.errorMsg(error);
				})
			}
		}, (error: Message) => {
			this.helperService.errorMsg(error.message);
			this.isLoading = false;
		});
	}
}