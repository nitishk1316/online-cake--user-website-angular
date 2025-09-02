import { Component, OnInit } from '@angular/core';
import { Type } from 'src/shared/classes';
import { TypeService } from 'src/shared/services';

@Component({
  selector: 'vc-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit {
	public types: Type[] = [];
	public isLoading: boolean = false;

	constructor(
		private typeService: TypeService,
	) { }

  ngOnInit(): void {
		this.getAll();
	}

	/**
	 * Get all type
	 */
	getAll() {
		this.isLoading = true;
		this.typeService.getAll().subscribe((response: Type[]) => {
			this.isLoading = false;
			this.types = response;
		}, error => this.isLoading = false);
	}
}
