import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListOrderComponent } from './list-order/list-order.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { MatDialogModule } from '@angular/material/dialog';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { VcLoaderModule } from 'src/shared/components';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedServiceModule } from 'src/shared/services/shared-services.module';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: ListOrderComponent
	},
	{
		path: ':id/view',
		pathMatch: 'full',
		component: ViewOrderComponent
	}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		MatDialogModule,
		VcLoaderModule,
		LazyLoadImageModule,
		TranslateModule,
		MatTabsModule,
		SharedServiceModule
  ],
  declarations: [ListOrderComponent, ViewOrderComponent],
  exports: [ListOrderComponent, ViewOrderComponent],
})
export class OrderModule {}
