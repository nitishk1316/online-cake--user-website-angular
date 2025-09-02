import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Product, ProductList, Flavour, ProductFilterType, Deal } from 'src/shared/classes';
import { TypeService, FlavourService, DealService, OccasionService, ProductService } from 'src/shared/services';

@Component({
  selector: 'vc-product',
  templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
	public products: Product[] = [];
	public total: number = 0;
	public pageNo: number = 1;
	public limit: number = 20;
	public finished: boolean = false;
	public selectedId: number = null;
	public filterType: string = null;
	public searchText: string = '';
	public isLoading: boolean = false;
	public isInfiniteLoading: boolean = false;
	public title: String;

  constructor(
		private route: ActivatedRoute,
		private productService: ProductService,
		private dealService: DealService,
		private flavourService: FlavourService,
		private typeService: TypeService,
		private occasionService: OccasionService,
	) {

	}

  ngOnInit(): void {

		// Set filter based on query param
		combineLatest(this.route.params, this.route.queryParams).subscribe(results => {
			this.searchText = '';
			const params = results[0];
			const query = results[1];

			if (query && query['q']) this.searchText = query['q'];
			if (params && (params['fid'] || params['tid'] || params['oid'] || params['did'] )) {
				if (params['fid']) {
					this.selectedId = params['fid'];
					this.filterType = ProductFilterType.FLAVOUR;
					this.flavourService.getFlavour(this.selectedId).subscribe((response: Flavour) => {
						this.title = response.title;
					});
				} else if (params['tid']) {
					this.selectedId = params['tid'];
					this.filterType = ProductFilterType.TYPE;
					this.typeService.getType(this.selectedId).subscribe((response: Flavour) => {
						this.title = response.title;
					});
				} else if (params['oid']) {
					this.selectedId = params['oid'];
					this.filterType = ProductFilterType.OCCASION;
					this.occasionService.getOccasion(this.selectedId).subscribe((response: Flavour) => {
						this.title = response.title;
					});
				} else if (params['did']) {
					this.selectedId = params['did'];
					this.filterType = ProductFilterType.DEAL;
					this.dealService.getDeal(this.selectedId).subscribe((response: Deal) => {
						this.title = `${response.title} on ${response.type.title}` ;
					});
				}
			}

			this.finished = false;
			this.pageNo = 1;
			this.products = [];
			if (this.searchText) {
				if (this.searchText.length > 2) {
					this.filterProducts();
				} else {
					this.total = 0;
				}
			} else {
				this.filterProducts();
			}
		});
	}

	/**
	 * Get all products
	 */
	getAll() {
		this._startLoader();
		this.productService.getAll(this.searchText, this.pageNo, this.limit).subscribe((reponse: ProductList) => {
			this.loadProduct(reponse);
			this._stopLoader();
		}, error => this._stopLoader());
	}

	/**
	 * Get products based on cake type
	 */
	getAllByType() {
		this._startLoader();
		this.productService.getAllByType(this.selectedId, this.pageNo, this.limit).subscribe((reponse: ProductList) => {
			this.loadProduct(reponse);
			this._stopLoader();
		}, error => this._stopLoader());
	}

	/**
	 * Get products based on flavour
	 */
	getAllByFlavour() {
		this._startLoader();
		this.productService.getAllByFlavour(this.selectedId, this.pageNo, this.limit).subscribe((reponse: ProductList) => {
			this.loadProduct(reponse);
			this._stopLoader();
		}, error => this._stopLoader());
	}

	/**
	 * Get products based on occasion
	 */
	getAllByOccasion() {
		this._startLoader();
		this.productService.getAllByOccasion(this.selectedId, this.pageNo, this.limit).subscribe((reponse: ProductList) => {
			this.loadProduct(reponse);
			this._stopLoader();
		}, error => this._stopLoader());
	}

	/**
	 * Get products based on deal
	 */
	getAllByDeal() {
		this._startLoader();
		this.productService.getAllByDeal(this.selectedId, this.pageNo, this.limit).subscribe((reponse: ProductList) => {
			this.loadProduct(reponse);
			this._stopLoader();
		}, error => this._stopLoader());
	}

	/**
	 * Load product for Infinite
	 * @param products
	 */
	loadProduct(products: ProductList): void {
		this.products = this.products.concat(products.data);
		this.total = products.total;
		if (products.total == this.products.length) this.finished = true;
	}

	/**
	 * Filter product
	 */
	filterProducts(): void {
		if (this.filterType == ProductFilterType.TYPE) this.getAllByType();
		else if (this.filterType == ProductFilterType.FLAVOUR) this.getAllByFlavour();
		else if (this.filterType == ProductFilterType.OCCASION) this.getAllByOccasion();
		else if (this.filterType == ProductFilterType.DEAL) this.getAllByDeal();
		else this.getAll();
	}

	/**
	 * Infinite
	 */
	public onScroll(): void {
		this.pageNo += 1;
		this.filterProducts();
	}

	private _startLoader() {
		if (this.pageNo > 1) this.isInfiniteLoading = true;
		else this.isLoading = true;
	}

	private _stopLoader() {
		if (this.pageNo > 1) this.isInfiniteLoading = false;
		else this.isLoading = false;
	}

}
