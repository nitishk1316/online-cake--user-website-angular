import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/shared/classes';
import { CartService, OrderService } from 'src/shared/services';

@Component({
  selector: 'vc-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {
	public isLoading: boolean = false;

  constructor (
		private route: ActivatedRoute,
		private router: Router,
		private orderService: OrderService,
		private cartService: CartService
	) {

	}

  ngOnInit(): void {
		this.cartService.checkCart();
		this.route.queryParams.subscribe((data) => {
			if (data['session_id']) {
				this.isLoading = true;
				this.orderService.getPaymentStatus(data['session_id']).subscribe((response: Message) => {
					this.isLoading = false;
					if (!response.status) this.router.navigate(['/order-failed'], { queryParams: { session_id: data['session_id'] } });
				}, error => this.isLoading = false);
			}
		});
	}
}
