import { Component, OnInit } from '@angular/core';
import { Setting } from 'src/shared/classes';
import { SettingService } from 'src/shared/services';
import { HelperService } from 'src/shared/services/helper/helper.service';

@Component({
  selector: 'vc-footer',
  templateUrl: './vc-footer.component.html',
  styleUrls: ['./vc-footer.component.scss']
})
export class VcFooterComponent implements OnInit {
	public settings: Setting;

  constructor(
		public helperService: HelperService,
		public settingService: SettingService,
	) { }

  ngOnInit(): void {
		this.settingService.getAllSettings().subscribe((response: Setting) => {
			this.settingService.setting.next(response);
			this.settings = response;
		});
  }
}
