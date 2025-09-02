import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Banner, Deal, Type, Product, Flavour, Occasion } from 'src/shared/classes';
import {
	BannerService,
	DealService,
	TypeService,
	ProductService,
	FlavourService,
	OccasionService
} from 'src/shared/services';

@Component({
  selector: 'vc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	customOptions: OwlOptions = {
		loop: true,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
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
	public loaders: HomeLoader = {
		banner: false,
		type: false,
		flavour: false,
		occasion: false,
		product: false,
		deal: false
	}
	public banners: Banner[] = [];
	public deals: Deal[] = [];
	public types: Type[] = [];
	public flavours: Flavour[] = [];
	public occasions: Occasion[] = [];
	public products: Product[] = [];

  constructor(
		private bannerService: BannerService,
		private dealService: DealService,
		private typeService: TypeService,
		private flavourService: FlavourService,
		private occasionService: OccasionService,
		private productService: ProductService,
	) {
	}

  ngOnInit(): void {
		this.getBanners();
		this.getDeals();
		this.getTypes();
		this.getFlavours();
		this.getOccasions();
		this.getProducts();
	}

	/**
	 * Get cake types
	 */
	getTypes() {
		this.loaders.type = true;
		this.typeService.getAllPopular().subscribe((response: Type[]) => {
			this.types = response;
			this.loaders.type = false;
		}, error => this.loaders.type = false);
	}

	/**
	 * Get cake flavours
	 */
	getFlavours() {
		this.loaders.flavour = true;
		this.flavourService.getAllPopular().subscribe((response: Flavour[]) => {
			this.flavours = response;
			this.loaders.flavour = false;
		}, error => this.loaders.flavour = false);
	}

	/**
	 * Get cake for occasion
	 */
	getOccasions() {
		this.loaders.occasion = true;
		this.occasionService.getAllPopular().subscribe((response: Occasion[]) => {
			this.occasions = response;
			this.loaders.occasion = false;
		}, error => this.loaders.occasion = false);
	}

	/**
	 * Get banners
	 */
	getBanners() {
		this.loaders.banner = true;
		this.bannerService.getAll().subscribe((response: Banner[])  => {
			this.banners = response;
			this.loaders.banner = false;
		}, error => this.loaders.banner = false);
	}

	/**
	 * Get deals
	 */
	getDeals() {
		this.loaders.deal = true;
		this.dealService.getAll().subscribe((response: Deal[])  => {
			this.deals = response;
			this.loaders.deal = false;
		}, error => this.loaders.deal = false);
	}

	/**
	 * Get popular products
	 */
	getProducts() {
		this.loaders.product = true;
		this.productService.getForHome().subscribe((response: Product[]) => {
			this.products = response;
			this.loaders.product = false;
		}, error => this.loaders.product = false);
	}
}

interface HomeLoader {
	banner: boolean;
	type: boolean;
	flavour: boolean;
	occasion: boolean;
	product: boolean;
	deal: boolean;
}