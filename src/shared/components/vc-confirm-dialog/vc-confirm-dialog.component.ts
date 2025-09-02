import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmDialogData {
	okLabel: string;
	cancelLabel: string;
	title: string;
}

@Component({
  selector: 'vc-confirm-dialog',
  templateUrl: './vc-confirm-dialog.component.html',
  styleUrls: ['./vc-confirm-dialog.component.scss']
})
export class VcConfirmDialogComponent implements OnInit {
	okLabel: string = 'LABEL_OK';
	cancelLabel: string = 'LABEL_CANCEL';
	title: string = 'MSG_DETETE_CONFIRM';

  constructor(
		@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
	) {
		if (data && data.okLabel) this.okLabel = data.okLabel;
		if (data && data.cancelLabel) this.cancelLabel = data.cancelLabel;
		if (data && data.title) this.title = data.title;
	}

  ngOnInit(): void {
  }

}
