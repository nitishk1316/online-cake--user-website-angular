import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import {
	CartProductInfo,
	Message, Cart,
	Variant,
	ProductDetail,
	Flavour,
	Occasion,
	Type
} from 'src/shared/classes';
import {
	ProductService,
	CartService,
	WishlistService,
	ProfileService,
	OccasionService,
	FlavourService,
	TypeService
} from 'src/shared/services';
import { HelperService } from 'src/shared/services/helper/helper.service';
import { StorageService, STORAGE_KEYS } from 'src/shared/services/storage/storage.service';

@Component({
  selector: 'vc-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
	private sub: Subscription;
	customOptions: OwlOptions = {
		loop: true,
		nav: true,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
	}
	public product: ProductDetail;
	public cartProducts: CartProductInfo = {};
	public selectedVariant = null;
	public productId: number = null;
	public isWishist: boolean = false;
	public isLoading: boolean  = false;
	public flavour: Flavour;
	public occasion: Occasion;
	public type: Type;
	public cakeMessage = {};
	public eggless = {};

  constructor(
		private route: ActivatedRoute,
		private router: Router,
		private productService: ProductService,
		private cartService: CartService,
		private wishlistService: WishlistService,
		private helperService: HelperService,
		private profileService: ProfileService,
		private storageService: StorageService,
		private flavourService: FlavourService,
		private occasionService: OccasionService,
		private typeService: TypeService,
	) {
		this.route.params.subscribe(r => {
			if (r['pid']) {
				this.productId = r['pid'];
				this.getById(this.productId);
				if (this.profileService.authenticated) {
					this.getWishlistStatus();
				}
			}
		});
	}

	ngOnInit(): void {
		this.sub = this.cartService.cartProducts$.subscribe((response) => {
			this.cartProducts = response;
		})
	}

	ngOnDestroy() {
		if(this.sub) this.sub.unsubscribe();
	}

	/**
	 * Get product detail by id
	 * @param id
	 */
	getById(id: number) {
		this.isLoading = true;
		this.productService.getById(id).subscribe((response: ProductDetail) => {
			this.product = response;
			this.selectedVariant = this.product.variants.length ? this.product.variants[0] : null;
			this.eggless[this.selectedVariant.sku] = false;
			this.isLoading = false;
			if (this.product.flavour) this.getFlavour(this.product.flavour);
			if (this.product.occasion) this.getOccasion(this.product.occasion);
			if (this.product.type) this.getType(this.product.type);
		}, (error: Message) => {
			this.isLoading = false;
			this.router.navigate(['/products']);
		});
	}

	/**
	 * Change variant
	 * @param variant
	 */
	changeVariant(variant: Variant) {
		this.selectedVariant = variant;
		this.eggless[this.selectedVariant.sku] = false;
	}

	/**
	 * Add product to wishlist
	 */
	addToWishlist() {
		if (!this.profileService.authenticated) {
			this.storageService.setString(STORAGE_KEYS.LAST_PAGE, this.router.url);
			this.router.navigate(['/login']);
			return;
		}
		this.wishlistService.add(this.productId).subscribe((response: Message) => {
			this.isWishist = true;
			this.helperService.successMsg(response.message);
		}, (error: Message) => {
			this.helperService.errorMsg(error.message);
		});
	}

	/**
	 * Remove product from wishlist
	 */
	removeFromWishlist() {
		if (!this.profileService.authenticated) {
			this.storageService.setString(STORAGE_KEYS.LAST_PAGE, this.router.url);
			this.router.navigate(['/login']);
			return;
		}
		this.wishlistService.remove(this.productId).subscribe((response: Message) => {
			this.isWishist = false;
			this.helperService.successMsg(response.message);
		}, (error: Message) => {
			this.helperService.errorMsg(error.message);
		});
	}

	addToCart() {
		this.isLoading = true;
		this.cartService.addToCart(this.productId, this.selectedVariant.sku, 1, this.eggless[this.selectedVariant.sku]).subscribe((response: Cart) => {
			this.isLoading = false;
			this.cartService.updateCartProducts(response.products, response.count);
		}, (error:  Message) => {
			this.isLoading = false;
			this.helperService.errorMsg(error.message);
		});
	}

	inc() {
		this.isLoading = true;
		this.cartService.inc(this.productId, this.selectedVariant.sku, this.eggless[this.selectedVariant.sku]).subscribe((response: Cart) => {
			this.isLoading = false;
			this.cartService.updateCartProducts(response.products, response.count);
		}, (error:  Message) => {
			this.isLoading = false;
			this.helperService.errorMsg(error.message);
		});
	}

	dec() {
		this.isLoading = true;
		this.cartService.dec(this.productId, this.selectedVariant.sku, this.eggless[this.selectedVariant.sku]).subscribe((response: Cart) => {
			this.isLoading = false;
			this.cartService.updateCartProducts(response.products, response.count);
		}, (error:  Message) => {
			this.isLoading = false;
			this.helperService.errorMsg(error.message);
		});
	}

	/**
	 * Check wishlist status
	 */
	getWishlistStatus() {
		this.wishlistService.isWishlisted(this.productId).subscribe((response: Message) => {
			this.isWishist = response.status;
		});
	}

	/**
	 * Get Flavour
	 * @param flavourId
	 */
	getFlavour(flavourId: number) {
		this.flavourService.getFlavour(flavourId).subscribe((response: Flavour) => {
			this.flavour = response;
		});
	}

	/**
	 * Get Occasion
	 * @param occasionId
	 */
	getOccasion(occasionId: number) {
		this.occasionService.getOccasion(occasionId).subscribe((response: Occasion) => {
			this.occasion = response;
		});
	}

	/**
	 * Get Cake Type
	 * @param typeId
	 */
	 getType(typeId: number) {
		this.typeService.getType(typeId).subscribe((response: Type) => {
			this.type = response;
		});
	}

	/**
	 *
	 */
	updateMessage() {
		this.isLoading = true;
		this.cartService.updateMessage(this.selectedVariant.sku, this.cakeMessage[this.selectedVariant.sku]).subscribe((response: Message) => {
			this.isLoading = false;
			this.helperService.successMsg(response.message);
		}, (error:  Message) => {
			this.isLoading = false;
			this.helperService.errorMsg(error.message);
		});
	}
}
