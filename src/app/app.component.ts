import { Component } from '@angular/core';
import { CartService, SettingService } from 'src/shared/services';
import { StorageService, STORAGE_KEYS } from 'src/shared/services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
		private cartService: CartService,
		private storageService: StorageService,
		private settingService: SettingService,
	) {
		const anonymous = this.storageService.getString(STORAGE_KEYS.ANONYMOUS);
		if (!anonymous) {
			this.settingService.getAnonymous().subscribe((response) => {
				this.storageService.setString(STORAGE_KEYS.ANONYMOUS, response.id);
				this.cartService.init();
			});
		} else {
			this.cartService.init();
		}
	}
}
