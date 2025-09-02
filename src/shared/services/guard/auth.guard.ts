import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class AuthGuard implements CanActivate {
	/**
	 * Auth guard
	 */
	constructor(
		private router: Router,
		private profileService: ProfileService
	) { }
	
	canActivate(): boolean {
		const userIsAuthenticated = this.profileService.authenticated;
	
		if (!userIsAuthenticated) {
			console.log('AuthGuard: User is not authenticated. redirecting to login page');
			this.router.navigate(['/login']);
		}
		return true;
	}
}
