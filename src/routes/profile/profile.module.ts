import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule } from '@angular/forms';
import { VcLoaderModule } from 'src/shared/components';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { UpdateEmailComponent } from './update-email/update-email.component';
import { UpdateMobileComponent } from './update-mobile/update-mobile.component';
import { SharedServiceModule } from 'src/shared/services/shared-services.module';
import { WalletHistoryComponent } from './wallet-history/wallet-history.component';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: ProfileComponent
	},
	{
		path: 'update',
		pathMatch: 'full',
		component: UpdateProfileComponent
	},
	{
		path: 'email',
		pathMatch: 'full',
		component: UpdateEmailComponent
	},
	{
		path: 'mobile',
		pathMatch: 'full',
		component: UpdateMobileComponent
	},
	{
		path: 'wallet',
		pathMatch: 'full',
		component: WalletHistoryComponent
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
		FormsModule,
		VcLoaderModule,
		MatIconModule,
		SharedServiceModule
	],
  declarations: [ProfileComponent, UpdateProfileComponent, UpdateEmailComponent, UpdateMobileComponent, WalletHistoryComponent],
  exports: [ProfileComponent, UpdateProfileComponent, UpdateEmailComponent, UpdateMobileComponent, WalletHistoryComponent],
})
export class ProfileModule {}
