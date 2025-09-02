import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { VcLoaderModule, VcSkeletonModule } from 'src/shared/components';
import { SharedServiceModule } from 'src/shared/services/shared-services.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectAddressComponent } from './select-address/select-address.component';
import { SelectSlotComponent } from './select-slot/select-slot.component';
import { SelectPaymentComponent } from './select-payment/select-payment.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: SelectAddressComponent
	},
	{
		path: 'address',
		pathMatch: 'full',
		component: SelectAddressComponent
	},
	{
		path: 'slot',
		pathMatch: 'full',
		component: SelectSlotComponent
	},
	{
		path: 'payment',
		pathMatch: 'full',
		component: SelectPaymentComponent
	}
];

@NgModule({
  imports: [
		CommonModule,
		RouterModule.forChild(routes),
		FormsModule,
		MatCardModule,
		MatListModule,
		MatFormFieldModule,
		MatButtonModule,
		MatIconModule,
		MatInputModule,
		MatTabsModule,
		VcLoaderModule,
		VcSkeletonModule,
		TranslateModule,
		SharedServiceModule,
		MatCheckboxModule
	],
  declarations: [
		SelectAddressComponent,
		SelectSlotComponent,
		SelectPaymentComponent,
	],
  exports: [
		SelectAddressComponent,
		SelectSlotComponent,
		SelectPaymentComponent,
	],
})
export class CheckoutModule {}
