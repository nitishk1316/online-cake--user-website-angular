import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OtpVerifyComponent } from './otp-verify.component';
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
		component: OtpVerifyComponent
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
  declarations: [OtpVerifyComponent],
  exports: [OtpVerifyComponent],
})
export class OtpVerifyModule {}
