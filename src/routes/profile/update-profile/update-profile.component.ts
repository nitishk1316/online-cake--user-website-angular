import { Component, OnInit } from '@angular/core';
import { ProfileUpdatePayload, User, Message } from 'src/shared/classes';
import { HelperService } from 'src/shared/services/helper/helper.service';
import { ProfileService } from 'src/shared/services/profile/profile.service';

@Component({
  selector: 'vc-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
	public profileObj: ProfileUpdatePayload = {
		firstName: '',
		lastName: ''
	};
	public isLoading: boolean = false;

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
			this.profileObj = response;
		}, (error: Message) =>  {
			this.helperService.errorMsg(error.message);
			this.isLoading = false;
		})
	}

	/**
	 * Update profile
	 */
	updateProfile() {
		this.isLoading = true;
		this.profileService.update(this.profileObj).subscribe((response: Message) => {
			this.helperService.successMsg(response.message);
			this.isLoading = false;
			this.getMyProfile();
		}, (error: Message) =>  {
			this.helperService.errorMsg(error.message);
			this.isLoading = false;
		});
	}
}
