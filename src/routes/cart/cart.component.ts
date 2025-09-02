import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cart, Message } from 'src/shared/classes';
import { CartService } from 'src/shared/services';
import { HelperService } from 'src/shared/services/helper/helper.service';

@Component({
  selector: 'vc-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
	public subscription: Subscription;
	public isLoading: boolean = false;
	public cart: Cart;

  constructor(
		private router: Router,
		private cartService: CartService,
		private helperService: HelperService,
	) { }

  ngOnInit(): void {
		this.getMyCart();
	}

	/**
	 * Get My Cart
	 */
	getMyCart(checkout: boolean = false) {
		this.isLoading = true;
		this.cartService.getCart().subscribe((response: Cart) => {
			this.cart = response;
			this.cartService.updateCartProducts(response.products, response.count);
			this.isLoading = false;
			if (checkout && response.status)
				this.router.navigate(['/checkout', 'address']);
		}, error => this.isLoading = false);
	}

	inc(productId: number, sku: string) {
		this.isLoading = true;
		this.cartService.inc(productId, sku).subscribe((response: Cart) => {
			this.isLoading = false;
			this.cart = response;
			this.cartService.updateCartProducts(response.products, response.count);
		}, (error:  Message) => {
			this.isLoading = false;
			this.helperService.errorMsg(error.message);
		});
	}

	dec(productId: number, sku: string) {
		this.isLoading = true;
		this.cartService.dec(productId, sku).subscribe((response: Cart) => {
			this.isLoading = false;
			this.cart = response;
			this.cartService.updateCartProducts(response.products, response.count);
		}, (error:  Message) => {
			this.isLoading = false;
			this.helperService.errorMsg(error.message);
		});
	}
}
