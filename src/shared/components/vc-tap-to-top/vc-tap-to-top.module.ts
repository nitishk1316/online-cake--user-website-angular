import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { VcTabToTopComponent } from './vc-tap-to-top.component';

@NgModule({
  imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
	],
  declarations: [VcTabToTopComponent],
  exports: [VcTabToTopComponent],
})
export class VcTapToTopModule {}
