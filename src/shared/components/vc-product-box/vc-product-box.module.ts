import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { VcProductBoxComponent } from './vc-product-box.component';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { VcLoaderModule } from '../vc-loader/vc-loader.module';
import { SharedServiceModule } from 'src/shared/services/shared-services.module';

@NgModule({
  imports: [
		CommonModule,
		RouterModule,
		MatButtonModule,
		MatIconModule,
		MatCardModule,
		MatFormFieldModule,
		MatSelectModule,
		MatTooltipModule,
		LazyLoadImageModule,
		TranslateModule,
		VcLoaderModule,
		SharedServiceModule
	],
  declarations: [VcProductBoxComponent],
  exports: [VcProductBoxComponent],
})
export class VcProductBoxModule {}
