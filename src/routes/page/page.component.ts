import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'src/shared/classes';
import { PageService } from 'src/shared/services';
import { HelperService } from 'src/shared/services/helper/helper.service';

@Component({
  selector: 'vc-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
	public page: Page = {
		title: '',
		desc: '',
		url: null
	};
	public isLoading: boolean = false;

  constructor(
		private route: ActivatedRoute,
		private pageService: PageService,
		private helperService: HelperService,
	) {
		this.route.params.subscribe(r => {
			if (r['key']) this.getPage(r['key']);
			else this.helperService.goToPage('/pages/about-us');
		});
	}

  ngOnInit(): void {
	}

	/**
	 * Get Pages by url
	 * @param url
	 */
	getPage(url: string) {
		this.isLoading = true;
		this.pageService.getPage(url).subscribe((response: Page) => {
			if (response) this.page = response;
			else this.helperService.goToPage('/pages/about-us');
			this.isLoading = false;
		}, error => this.isLoading = false);
	}

}
