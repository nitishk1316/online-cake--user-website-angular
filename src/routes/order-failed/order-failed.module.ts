import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrderFailedComponent } from './order-failed.component';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { VcLoaderModule } from 'src/shared/components';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: OrderFailedComponent
	}
];

@NgModule({
  imports: [
		CommonModule,
		RouterModule.forChild(routes),
		MatCardModule,
		MatButtonModule,
		TranslateModule,
		VcLoaderModule
	],
	declarations: [OrderFailedComponent],
	exports: [OrderFailedComponent],
})
export class OrderFailedModule {}
