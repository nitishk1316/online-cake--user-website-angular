import { Component, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { Router } from '@angular/router';
import { Cart, DeliverySlot, Message } from 'src/shared/classes';
import { CartService, CheckoutService } from 'src/shared/services';
import { HelperService } from 'src/shared/services/helper/helper.service';
import { ProfileService } from 'src/shared/services/profile/profile.service';
import { StorageService, STORAGE_KEYS } from 'src/shared/services/storage/storage.service';

@Component({
  selector: 'vc-checkout-select-slot',
  templateUrl: './select-slot.component.html',
  styleUrls: ['./select-slot.component.scss']
})
export class SelectSlotComponent implements OnInit {
	public isLoading: boolean = false;
	public cart: Cart;
	public slotList: DeliverySlot[] = [];
	public selectedSlot: string;

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
		this.getMyCart();
		this.getAllDeliverySlot();
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
	 * Get all available slots
	 */
	 getAllDeliverySlot() {
		this.isLoading = true;
		this.checkoutService.getDeliverySlot().subscribe((slots: DeliverySlot[]) => {
			this.slotList = slots;
			this.isLoading = false;
		}, error => this.isLoading = false);
	}

	/**
	 * Set Delivery Slot
	 * @param options
	 */
	 updateSlot(options: MatListOption[]) {
		const selected = options.map(o => o.value)[0];
		this.selectedSlot = selected;
	}

	/**
	 * Set Slot
	 */
	setSlot() {
		this.isLoading = true;
		this.cartService.setSlot(this.selectedSlot).subscribe((response: Message) => {
			this.isLoading = false;
			this.router.navigate(['/checkout', 'payment']);
		}, (error: Message) => {
			this.helperService.errorMsg(error.message);
			this.isLoading = false
		});
	}
}