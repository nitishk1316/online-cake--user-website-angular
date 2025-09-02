import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VcSkeletonComponent } from './vc-skeleton.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [VcSkeletonComponent],
  imports: [
		CommonModule,
		MatCardModule,
	],
	exports: [VcSkeletonComponent]
})
export class VcSkeletonModule { }
