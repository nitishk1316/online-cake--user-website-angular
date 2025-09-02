import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vc-skeleton',
  templateUrl: './vc-skeleton.component.html',
  styleUrls: ['./vc-skeleton.component.scss']
})
export class VcSkeletonComponent implements OnInit {
	@Input() type = 'PRODUCT';
	constructor() { }

  ngOnInit(): void {
  }

}
