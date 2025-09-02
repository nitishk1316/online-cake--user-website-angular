import { Injectable } from '@angular/core';
import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService, STORAGE_KEYS } from '../storage/storage.service';
import { ProfileService } from '../profile/profile.service';
import { HelperService } from '../helper/helper.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
	/**
	 * Http Interceptor Service
	 * @param utliService
	 */
	constructor(
		private storageService: StorageService,
		private profileService: ProfileService,
		private helperService: HelperService,
	) {
	}

	intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
		const headers = {
			'lang': this.storageService.getString(STORAGE_KEYS.DEFAULT_LANGUAGE) || 'en',
			'anonymousId': this.storageService.getString(STORAGE_KEYS.ANONYMOUS) || '',
		};

		if (this.profileService.token) {
			headers['Authorization'] = 'Bearer ' + this.profileService.token;
		}
		request = request.clone({ setHeaders: headers });
		return handler.handle(request).pipe(
			catchError(error => {
				if (error instanceof HttpErrorResponse) {
					switch (error.status) {
						case 400:
							error.error.message = error.error.errors[0];
							return throwError(error.error);
						case 404:
							this.helperService.errorMsg(error.error.message);
							return throwError(error.error);
						case 500:
							this.helperService.errorMsg(error.error.message);
							return throwError(error.error);
						case 401:
							this.profileService.logout();
					}
				}
				return of(error);
			}),
		);
	}
}
