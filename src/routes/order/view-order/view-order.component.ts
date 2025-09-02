import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetail } from 'src/shared/classes';
import { OrderService } from 'src/shared/services';
import { HelperService } from 'src/shared/services/helper/helper.service';

@Component({
  selector: 'vc-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {
	public id: number;
	public order: OrderDetail;
	public isLoading: boolean = false;

  constructor(
		private route: ActivatedRoute,
		private orderService: OrderService,
		private helperService: HelperService,
	) {
		this.route.params.subscribe(params => {
			this.id = params['id'];
			if (this.id)
				this.getOrderDetail(this.id);
			else
				this.helperService.goToPage('/orders');
		});
	}

  ngOnInit(): void {
	}

	/**
	 * Get order detail by id
	 * @param orderId
	 */
	getOrderDetail(orderId: number) {
		this.isLoading = true;
		this.orderService.getDetail(orderId).subscribe((response: OrderDetail) => {
			this.order = response;
			this.isLoading = false;
		}, error => {
			this.isLoading = false;
			this.helperService.goToPage('/orders');
		});
	}
}
