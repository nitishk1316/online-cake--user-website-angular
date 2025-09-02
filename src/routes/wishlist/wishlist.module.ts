import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WishlistComponent } from './wishlist.component';
import { TranslateModule } from '@ngx-translate/core';
import { VcProductBoxModule } from 'src/shared/components';
import { SharedServiceModule } from 'src/shared/services/shared-services.module';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: WishlistComponent
	}
];

@NgModule({
  imports: [
    CommonModule,
		RouterModule.forChild(routes),
		TranslateModule,
		VcProductBoxModule,
		SharedServiceModule
  ],
  declarations: [WishlistComponent],
  exports: [WishlistComponent],
})
export class WishlistModule {}
