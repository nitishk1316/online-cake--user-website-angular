import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListAddressComponent } from './list-address/list-address.component';
import { AddEditAddressComponent } from './add-edit-address/add-edit-address.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { VcConfirmDialogModule, VcLoaderModule } from 'src/shared/components';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: ListAddressComponent
	},
	{
		path: 'add',
		pathMatch: 'full',
		component: AddEditAddressComponent
	},
	{
		path: 'edit/:id',
		pathMatch: 'full',
		component: AddEditAddressComponent
	}
];

@NgModule({
  imports: [
		CommonModule,
		RouterModule.forChild(routes),
		FormsModule,
		MatCardModule,
		MatInputModule,
		MatDialogModule,
		MatButtonModule,
		MatFormFieldModule,
		MatIconModule,
		TranslateModule,
		MatButtonToggleModule,
		VcConfirmDialogModule,
		VcLoaderModule
  ],
  declarations: [ListAddressComponent, AddEditAddressComponent],
  exports: [ListAddressComponent, AddEditAddressComponent],
})
export class AddressModule {}
