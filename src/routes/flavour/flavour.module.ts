import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlavourComponent } from './flavour.component';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { VcLoaderModule, VcSkeletonModule } from 'src/shared/components';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: FlavourComponent
	}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
		MatCardModule,
		LazyLoadImageModule,
		TranslateModule,
		VcSkeletonModule,
		VcLoaderModule
	],
  declarations: [FlavourComponent],
  exports: [FlavourComponent
	],
})
export class FlavourModule {}