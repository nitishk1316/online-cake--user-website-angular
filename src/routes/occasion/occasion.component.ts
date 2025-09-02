import { Component, OnInit } from '@angular/core';
import { Occasion } from 'src/shared/classes';
import { OccasionService } from 'src/shared/services';

@Component({
  selector: 'vc-occasion',
  templateUrl: './occasion.component.html',
  styleUrls: ['./occasion.component.scss']
})
export class OccasionComponent implements OnInit {
	public occasions: Occasion[] = [];
	public isLoading: boolean = false;

	constructor(
		private occasionService: OccasionService,
	) { }

  ngOnInit(): void {
		this.getAll();
	}

	/**
	 * Get all occasion
	 */
	getAll() {
		this.isLoading = true;
		this.occasionService.getAll().subscribe((response: Occasion[]) => {
			this.isLoading = false;
			this.occasions = response;
		}, error => this.isLoading = false);
	}
}
