import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
	items: [];
	showMenu = true;
	events$ = new Subject<SideNavEvent>();
  
	toggleSideMenu() {
		this.showMenu = !this.showMenu;
	}
	
	event(value: SideNavEvent) {
		this.events$.next(value);
	}
}

export type SideNavEvent = 'open' | 'close' | 'toggle';
