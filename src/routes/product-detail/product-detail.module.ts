import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { VcLoaderModule } from 'src/shared/components';
import { SharedServiceModule } from 'src/shared/services/shared-services.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

const routes: Routes = [
	{
		path: ':pname/pid/:pid',
		pathMatch: 'full',
		component: ProductDetailComponent
	}
];

@NgModule({
  imports: [
	  CommonModule,
		RouterModule.forChild(routes),
		FormsModule,
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		TranslateModule,
		CarouselModule,
		LazyLoadImageModule,
		VcLoaderModule,
		SharedServiceModule,
		MatTabsModule,
		MatChipsModule,
		MatInputModule,
		MatRadioModule
	],
  declarations: [ProductDetailComponent],
  exports: [ProductDetailComponent],
})
export class ProductDetailModule {}
