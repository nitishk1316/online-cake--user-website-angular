import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { HelperService } from 'src/shared/services/helper/helper.service';
import { ProfileService } from 'src/shared/services/profile/profile.service';

@Component({
  selector: 'vc-header-menu',
  templateUrl: './vc-header-menu.component.html',
  styleUrls: ['./vc-header-menu.component.scss']
})
export class VcHeaderMenuComponent implements OnInit, AfterViewInit {
	@Input() drawer: MatDrawer;
  constructor(
		private router: Router,
		public profileService: ProfileService,
		public helperService: HelperService
	) { 
	}

  ngOnInit(): void {
	}
	
	ngAfterViewInit() {
	}

	open(url: string) {
		this.drawer.toggle();
		this.router.navigate([url]);
	}

	logout() {
		this.profileService.logout();
		this.drawer.toggle();
	}
}
