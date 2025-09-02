import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VcLoaderComponent } from './vc-loader.component';

@NgModule({
  imports: [
		CommonModule,
		MatProgressSpinnerModule
	],
	declarations: [VcLoaderComponent],
	exports: [VcLoaderComponent]
})
export class VcLoaderModule {}