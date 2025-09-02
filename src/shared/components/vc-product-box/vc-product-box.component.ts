import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Product } from 'src/shared/classes';
import { CartService } from 'src/shared/services';

@Component({
  selector: 'vc-product-box',
  templateUrl: './vc-product-box.component.html',
  styleUrls: ['./vc-product-box.component.scss']
})
export class VcProductBoxComponent implements OnInit, OnDestroy {
	@Input() products: Product[];
	@Input() wishlist: boolean = false;
	@Output() wishlistClick: EventEmitter<any> = new EventEmitter<any>();

	public isLoading = {};

	constructor(
		public cartService: CartService,
	) {
	}

  ngOnInit(): void {
	}

	ngOnDestroy(): void {
	}

	trackBy(index, item){
		return item._id;
 	}

	/**
	 * Remove wishlist
	 * @param productId
	 */
	removeFromWishlist(productId: number) {
		this.wishlistClick.emit(productId);
	}
}
