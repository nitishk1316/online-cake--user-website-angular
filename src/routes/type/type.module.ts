import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TypeComponent } from './type.component';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { VcLoaderModule, VcSkeletonModule } from 'src/shared/components';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: TypeComponent
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
  declarations: [TypeComponent],
  exports: [TypeComponent
	],
})
export class TypeModule {}