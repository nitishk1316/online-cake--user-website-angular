import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { VcLoaderModule, VcSkeletonModule, VcProductBoxModule } from 'src/shared/components';
import { SharedServiceModule } from 'src/shared/services/shared-services.module';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: ProductComponent
	},
	{
		path: 'tn/:tname/tid/:tid',
		pathMatch: 'full',
		component: ProductComponent
	},
	{
		path: 'fn/:fname/fid/:fid',
		pathMatch: 'full',
		component: ProductComponent
	},
	{
		path: 'on/:oname/oid/:oid',
		pathMatch: 'full',
		component: ProductComponent
	},
	{
		path: 'dn/:dname/did/:did',
		pathMatch: 'full',
		component: ProductComponent
	}
];

@NgModule({
  imports: [
    CommonModule,
		RouterModule.forChild(routes),
		MatCardModule,
		MatButtonModule,
		TranslateModule,
		MatIconModule,
		MatTabsModule,
		VcLoaderModule,
		MatChipsModule,
		InfiniteScrollModule,
		VcSkeletonModule,
		VcProductBoxModule,
		SharedServiceModule
  ],
  declarations: [ProductComponent],
  exports: [ProductComponent],
})
export class ProductModule {}
