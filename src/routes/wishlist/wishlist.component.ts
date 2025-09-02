import { Component, OnInit } from '@angular/core';
import { Message, Product } from 'src/shared/classes';
import { WishlistService } from 'src/shared/services';
import { HelperService } from 'src/shared/services/helper/helper.service';

@Component({
  selector: 'vc-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
	public products: Product[] = [];
	public isLoading: boolean = false;

  constructor(
		private wishlistService: WishlistService,
		private helperService: HelperService,
	) { }

  ngOnInit(): void {
		this.getAllProducts();
	}

	/**
	 * Get all wishlist products
	 */
	getAllProducts(): void {
		this.isLoading = true;
		this.wishlistService.getAll().subscribe((response: Product[]) => {
			this.products = response;
			this.isLoading = false;
		}, error => this.isLoading = false);
	}

	/**
	 * Reload list
	 * @param data
	 */
	refresh(data: boolean) {
		if (data)
			this.getAllProducts();
	}

	removeFromWishlist(productId: number) {
		this.isLoading = true;
		this.wishlistService.remove(productId).subscribe((response: Message) => {
			this.helperService.successMsg(response.message);
			this.isLoading = false;
			this.getAllProducts();
		}, error => this.isLoading = false);
	}
}
