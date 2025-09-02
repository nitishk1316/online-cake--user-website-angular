import { Component, OnInit } from '@angular/core';
import { UpdateMobilePayload, User, Message } from 'src/shared/classes';
import { HelperService } from 'src/shared/services/helper/helper.service';
import { ProfileService } from 'src/shared/services/profile/profile.service';

@Component({
  selector: 'vc-update-mobile',
  templateUrl: './update-mobile.component.html',
  styleUrls: ['./update-mobile.component.scss']
})
export class UpdateMobileComponent implements OnInit {
	public mobileObj: UpdateMobilePayload = {
		mobileNumber: '',
		otp: ''
	};
	public isLoading: boolean = false;
	public mobileSentMsg: string = null;

  constructor(
		private profileService: ProfileService,
		private helperService: HelperService
	) { }

  ngOnInit(): void {
		this.getMyProfile();
	}

	/**
	 * Get MyProfile
	 */
	getMyProfile() {
		this.isLoading = true;
		this.profileService.getMyInfo().subscribe((response: User) => {
			this.isLoading = false;
			this.mobileObj.mobileNumber = response.mobileNumber;
		}, (error: Message) =>  {
			this.helperService.errorMsg(error.message);
			this.isLoading = false;
		})
	}

	/**
	 * Change mobile and get OTP
	 */
	changeMobile() {
		this.isLoading = true;
		this.profileService.changeMobile(this.mobileObj).subscribe((response: Message) => {
			this.mobileSentMsg = response.message;
			this.isLoading = false;
		}, (error: Message) =>  {
			this.helperService.errorMsg(error.message);
			this.isLoading = false;
		});
	}

	/**
	 * Update mobile
	 */
	updateMobile() {
		this.isLoading = true;
		this.profileService.updateMobile(this.mobileObj).subscribe((response: Message) => {
			this.helperService.successMsg(response.message);
			this.isLoading = false;
			this.getMyProfile();
			this.mobileSentMsg = null;
			this.mobileObj.otp = null;
		}, (error: Message) =>  {
			this.helperService.errorMsg(error.message);
			this.isLoading = false;
		});
	}
}
