import { Component, OnInit } from '@angular/core';
import { UpdateEmailPayload, User, Message } from 'src/shared/classes';
import { HelperService } from 'src/shared/services/helper/helper.service';
import { ProfileService } from 'src/shared/services/profile/profile.service';

@Component({
  selector: 'vc-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.scss']
})
export class UpdateEmailComponent implements OnInit {
	public emailObj: UpdateEmailPayload = {
		email: '',
		otp: ''
	};
	public isLoading: boolean = false;
	public emailSentMsg: string = null;

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
			this.emailObj.email = response.email;
		}, (error: Message) =>  {
			this.helperService.errorMsg(error.message);
			this.isLoading = false;
		})
	}

	/**
	 * Change email and get OTP
	 */
	changeEmail() {
		this.isLoading = true;
		this.profileService.changeEmail(this.emailObj).subscribe((response: Message) => {
			this.emailSentMsg = response.message;
			this.isLoading = false;
		}, (error: Message) =>  {
			this.helperService.errorMsg(error.message);
			this.isLoading = false;
		});
	}

	/**
	 * Update email
	 */
	updateEmail() {
		this.isLoading = true;
		this.profileService.updateEmail(this.emailObj).subscribe((response: Message) => {
			this.helperService.successMsg(response.message);
			this.isLoading = false;
			this.getMyProfile();
			this.emailSentMsg = null;
			this.emailObj.otp = null;
		}, (error: Message) =>  {
			this.helperService.errorMsg(error.message);
			this.isLoading = false;
		});
	}
}
