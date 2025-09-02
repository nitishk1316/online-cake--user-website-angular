import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Order, Message } from 'src/shared/classes';
import { VcConfirmDialogComponent } from 'src/shared/components';
import { OrderService } from 'src/shared/services';
import { HelperService } from 'src/shared/services/helper/helper.service';

@Component({
  selector: 'vc-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {
	public orders: Order[];
	public isLoading = false;

  constructor(
		private orderService: OrderService,
		private helperService: HelperService,
		private dialog: MatDialog
	) {
	}

  ngOnInit(): void {
		this.getOrders();
	}

	/**
	 * Get My all orders
	 */
	 getOrders() {
		this.isLoading = true;
		this.orderService.getMyOrder().subscribe((response: Order[]) => {
			this.orders = response;
			this.isLoading = false;
		}, error => this.isLoading = false);
	}

	/**
	 * Cancel order
	 * @param order
	 */
	cancelOrder(order: Order) {
		const dialogRef = this.dialog.open(VcConfirmDialogComponent, {
			data: {
				okLabel: 'LABEL_YES',
				title: 'MSG_CANCEL_CONFIRM'
			}
		});
    dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.isLoading = true;
				this.orderService.cancelOrder(order._id).subscribe((response: Message) => {
					this.helperService.successMsg(response.message);
					this.isLoading = false;
					this.getOrders();
				}, (error:  Message) => {
					this.helperService.errorMsg(error.message);
					this.isLoading = false;
				});
			}
    });
  }
}
