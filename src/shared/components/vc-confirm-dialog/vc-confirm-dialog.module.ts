import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { VcConfirmDialogComponent } from './vc-confirm-dialog.component';

@NgModule({
  imports: [
		CommonModule,
		TranslateModule,
		MatDialogModule,
		MatButtonModule,
	],
	declarations: [VcConfirmDialogComponent],
	exports: [VcConfirmDialogComponent]
})
export class VcConfirmDialogModule {}
