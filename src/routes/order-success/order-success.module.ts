import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrderSuccessComponent } from './order-success.component';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { VcLoaderModule } from 'src/shared/components';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: OrderSuccessComponent
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
	declarations: [OrderSuccessComponent],
	exports: [OrderSuccessComponent],
})
export class OrderSuccessModule {}
