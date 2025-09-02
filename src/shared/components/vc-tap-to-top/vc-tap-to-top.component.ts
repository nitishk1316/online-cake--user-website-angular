import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

/**
 * Tap To Top Component
 */
@Component({
  selector: 'vc-tap-to-top',
  templateUrl: './vc-tap-to-top.component.html',
  styleUrls: ['./vc-tap-to-top.component.scss']
})
export class VcTabToTopComponent implements OnInit {
	public show: boolean = false;

	/**
	 * Constructor
	 * @param viewScroller 
	 */
	constructor(
		private viewScroller: ViewportScroller
	) { 
	}

  ngOnInit(): void {
	}
	
	@HostListener("window:scroll", [])
	onWindowScroll() {
		let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
		if (number > 600)
			this.show = true;
		else
			this.show = false;
	}

	/**
	 * Tab to Top
	 */
	tapToTop() {
		this.viewScroller.scrollToPosition([0, 0]);
	}

	@HostListener('ionScroll', ['$event']) onScroll(event){
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
		if (number > 600)
			this.show = true;
		else
			this.show = false;
}

}
