import { Component, OnInit } from '@angular/core';
import { User, Message } from 'src/shared/classes';
import { Wallet } from 'src/shared/classes/wallet/wallet';
import { HelperService } from 'src/shared/services/helper/helper.service';
import { ProfileService } from 'src/shared/services/profile/profile.service';

@Component({
  selector: 'vc-wallet-history',
  templateUrl: './wallet-history.component.html',
  styleUrls: ['./wallet-history.component.scss']
})
export class WalletHistoryComponent implements OnInit {
	public isLoading: boolean = false;
	public wallets: Wallet[] = [];
	public walletAmount: number = 0;

	constructor(
		private profileService: ProfileService,
		private helperService: HelperService
	) { }

  ngOnInit(): void {
		this.getMyProfile();
		this.getMyWallet();
	}

	/**
	 * Get MyProfile
	 */
	 getMyProfile() {
			this.profileService.getMyInfo().subscribe((response: User) => {
			this.walletAmount = response.walletAmount;
		}, (error: Message) =>  {
			this.helperService.errorMsg(error.message);
		})
	}

	/**
	 * Get My Wallet
	 */
	getMyWallet() {
		this.isLoading = true;
		this.profileService.getMyWallet().subscribe((response: Wallet[]) => {
			this.isLoading = false;
			this.wallets = response;
		}, (error: Message) =>  {
			this.helperService.errorMsg(error.message);
			this.isLoading = false;
		})
	}

}
