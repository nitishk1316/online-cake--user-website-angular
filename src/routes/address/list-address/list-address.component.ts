import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Address, Message } from 'src/shared/classes';
import { VcConfirmDialogComponent } from 'src/shared/components';
import { AddressService } from 'src/shared/services';
import { HelperService } from 'src/shared/services/helper/helper.service';

@Component({
  selector: 'vc-list-address',
  templateUrl: './list-address.component.html',
  styleUrls: ['./list-address.component.scss']
})
export class ListAddressComponent implements OnInit, OnDestroy {
	private sub: Subscription;
	public addresses: Address[] = [];
	public selectedAddress: Address;
	public isLoading: boolean = false;

  constructor(
		private addressService: AddressService,
		private helperService: HelperService,
		private dialog: MatDialog
	) { }

  ngOnInit(): void {
		this.getAllAddress();
	}

	ngOnDestroy(): void {
		if(this.sub) this.sub.unsubscribe();
	}

	/**
	 * Get all address
	 */
	getAllAddress() {
		this.isLoading = true;
		this.sub = this.addressService.getAll().subscribe((response: Address[]) => {
			this.addresses = response;
			this.isLoading = false;
		}, (error: Message) => {
			this.helperService.errorMsg(error.message);
			this.isLoading = false;
		});
	}

	/**
	 * Delete address
	 * @param address
	 */
	onDelete(address: Address) {
		const dialogRef = this.dialog.open(VcConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.isLoading = false;
				this.addressService.delete(address._id).subscribe((response: Message) => {
					this.helperService.successMsg(response.message);
					this.isLoading = false;
					this.getAllAddress();
				}, (error: Message) => {
					this.helperService.errorMsg(error.message);
					this.isLoading = false;
				});
			}
    });
  }
}
