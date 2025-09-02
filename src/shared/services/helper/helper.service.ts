import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
	private smallScreen = new BehaviorSubject<boolean>(false);
	public smallScreen$ = this.smallScreen.asObservable();

	horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
	constructor(
		private router: Router,
		private _snackBar: MatSnackBar,
		private observer: BreakpointObserver
	) { 
		const isSmallScreen = this.observer.isMatched('(max-width: 992px)');
		this.smallScreen.next(isSmallScreen);
		this.observer.observe('(max-width: 992px)').subscribe((result) => {
			this.smallScreen.next(result.matches)
		});
	}
	
	successMsg(message?: string) {
		this._snackBar.open(message, 'x', {
			duration: 5000,
			panelClass: ['snackbar--success'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
	}

	errorMsg(message?: string) {
		this._snackBar.open(message, 'x', {
			duration: 5000,
			panelClass: ['snackbar--error'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
	}

	/**
   * Navigate to page by url
   * @param string - page url 
	 */
	public goToPage(url: string): void {
		this.router.navigateByUrl(url);
	}
}
