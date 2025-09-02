import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from './reset-password.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { VcLoaderModule } from 'src/shared/components';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: ResetPasswordComponent
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
		VcLoaderModule,
  ],
  declarations: [ResetPasswordComponent],
  exports: [ResetPasswordComponent],
})
export class ResetPasswordModule {}
