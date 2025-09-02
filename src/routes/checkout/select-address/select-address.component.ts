import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address, Cart, Message } from 'src/shared/classes';
import { CartService, AddressService, CheckoutService } from 'src/shared/services';
import { HelperService } from 'src/shared/services/helper/helper.service';
import { ProfileService } from 'src/shared/services/profile/profile.service';
import { StorageService, STORAGE_KEYS } from 'src/shared/services/storage/storage.service';

@Component({
  selector: 'vc-checkout-select-address',
  templateUrl: './select-address.component.html',
  styleUrls: ['./select-address.component.scss']
})
export class SelectAddressComponent implements OnInit {
	public isLoading: boolean = false;
	public cart: Cart;
	public addressList: Address[] = [];

	constructor(
		private router: Router,
		public profileService: ProfileService,
		public helperService: HelperService,
		public cartService: CartService,
		private addressService: AddressService,
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
		this.getMyCart();
		this.getAllAddress();
	}

	/**
	 * Get My Cart
	 */
	getMyCart() {
		this.cartService.getCart().subscribe((cart: Cart) => {
			this.cart = cart;
			if (this.cart.products.length == 0) this.router.navigate(['/']);
		});
	}

	/**
	 * Get all user address
	 */
	getAllAddress() {
		this.isLoading = true;
		this.addressService.getAll().subscribe((response: Address[]) => {
			this.isLoading = false;
			this.addressList = response;
		}, error => this.isLoading = false);
	}

	/**
	 * Set Delivery address
	 * @param id
	 */
	updateAddress(id: number) {
		this.isLoading = true;
		this.cartService.setAddress(id).subscribe((response: Message) => {
			this.isLoading = false;
			this.router.navigate(['/checkout', 'slot']);
		}, (error: Message) => {
			this.helperService.errorMsg(error.message);
			this.isLoading = false
		});
	}
}