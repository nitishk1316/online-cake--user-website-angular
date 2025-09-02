import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { VcLoaderModule, VcSkeletonModule, VcProductBoxModule } from 'src/shared/components';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: HomeComponent
	}
];

@NgModule({
  imports: [
		CommonModule,
		RouterModule.forChild(routes),
		FormsModule,
		MatCardModule,
		MatInputModule,
		MatButtonModule,
		MatFormFieldModule,
		TranslateModule,
		CarouselModule,
		VcLoaderModule,
		VcSkeletonModule,
		VcProductBoxModule,
		LazyLoadImageModule
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeModule {}
