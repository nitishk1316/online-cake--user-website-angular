import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { VcLoaderModule } from 'src/shared/components';
import { VcCurrencyPipe } from 'src/shared/services/pipes/currency.pipe';
import { SharedServiceModule } from 'src/shared/services/shared-services.module';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: CartComponent
	}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
		MatCardModule,
		MatListModule,
		MatButtonModule,
		MatIconModule,
		TranslateModule,
		VcLoaderModule,
		LazyLoadImageModule,
		SharedServiceModule
  ],
  declarations: [CartComponent],
  exports: [CartComponent],
})
export class CartModule {}
