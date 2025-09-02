import { Component, OnInit } from '@angular/core';
import { User, Message } from 'src/shared/classes';
import { HelperService } from 'src/shared/services/helper/helper.service';
import { ProfileService } from 'src/shared/services/profile/profile.service';

@Component({
  selector: 'vc-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
	public profileObj: User;
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
}
