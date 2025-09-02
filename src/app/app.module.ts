import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedServiceModule } from 'src/shared/services/shared-services.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VcLayoutModule, VcTapToTopModule } from 'src/shared/components';
import { HttpInterceptorService } from 'src/shared/services';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StorageService, STORAGE_KEYS } from 'src/shared/services/storage/storage.service';

export function appInitializerFactory(translate: TranslateService, storageService: StorageService) {
  return () => {
		let defaultLang = 'en';
		const lang = storageService.getString(STORAGE_KEYS.DEFAULT_LANGUAGE);
		if (lang) defaultLang = lang;
		else storageService.setString(STORAGE_KEYS.DEFAULT_LANGUAGE, defaultLang);
		translate.addLangs(["en"]);
    translate.setDefaultLang(defaultLang);
    return translate.use(defaultLang).toPromise();
  };
}

export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json?v=1');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		LoadingBarHttpClientModule,
		LoadingBarModule,
		AppRoutingModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: (createTranslateLoader),
				deps: [HttpClient]
			},
		}),
		MatSidenavModule,
		SharedServiceModule,
		VcLayoutModule,
		VcTapToTopModule
  ],
  providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: appInitializerFactory,
			deps: [TranslateService, StorageService],
			multi: true
		},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
