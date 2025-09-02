import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { CartService } from 'src/shared/services';
import { HelperService } from 'src/shared/services/helper/helper.service';
import { ProfileService } from 'src/shared/services/profile/profile.service';

@Component({
  selector: 'vc-header-toolbar',
  templateUrl: './vc-header-toolbar.component.html',
  styleUrls: ['./vc-header-toolbar.component.scss']
})
export class VcHeaderToolbarComponent implements OnInit {
	@Input() drawer: MatDrawer;
	public searchText: string = '';

  constructor(
		private router: Router,
		public profileService: ProfileService,
		public cartService: CartService,
		public helperService: HelperService
	) {
	}

  ngOnInit(): void {
	}

	toggle() {
		this.drawer.toggle();
	}

	/**
	 * Search
	 */
	 search() {
		this.router.navigateByUrl('/search?q=' + this.searchText);
	}

	logout() {
		this.profileService.logout();
	}
}
