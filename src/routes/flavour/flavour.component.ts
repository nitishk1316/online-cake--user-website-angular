import { Component, OnInit } from '@angular/core';
import { Flavour } from 'src/shared/classes';
import { FlavourService } from 'src/shared/services';

@Component({
  selector: 'vc-flavour',
  templateUrl: './flavour.component.html',
  styleUrls: ['./flavour.component.scss']
})
export class FlavourComponent implements OnInit {
	public flavours: Flavour[] = [];
	public isLoading: boolean = false;

	constructor(
		private flavourService: FlavourService,
	) { }

  ngOnInit(): void {
		this.getAll();
	}

	/**
	 * Get all flavour
	 */
	getAll() {
		this.isLoading = true;
		this.flavourService.getAll().subscribe((response: Flavour[]) => {
			this.isLoading = false;
			this.flavours = response;
		}, error => this.isLoading = false);
	}
}
