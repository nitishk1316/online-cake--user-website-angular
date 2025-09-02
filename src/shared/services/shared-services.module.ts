import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from './api/api.service';
import { AuthService } from './auth/auth.service';
import { VcCurrencyPipe } from './pipes/currency.pipe';

@NgModule({
	declarations: [
		VcCurrencyPipe
	],
	imports: [
		MatSnackBarModule,
	],
	providers: [
		ApiService,
		AuthService,
	],
	exports: [
		VcCurrencyPipe
	]
})
export class SharedServiceModule {}
