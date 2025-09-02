import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password.component';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule } from '@angular/forms';
import { VcLoaderModule } from 'src/shared/components';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: ChangePasswordComponent
	}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
		MatCardModule,
		MatButtonModule,
		TranslateModule,
		MatInputModule,
		MatFormFieldModule,
		VcLoaderModule,
		FormsModule,
	],
  declarations: [ChangePasswordComponent],
  exports: [ChangePasswordComponent],
})
export class ChangePasswordModule {}
