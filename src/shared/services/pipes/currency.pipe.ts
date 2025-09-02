import { Pipe, PipeTransform } from '@angular/core';
import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { SettingService } from '../setting/setting.service';
import { Setting } from 'src/shared/classes';

@Pipe({
  name: 'vccurrency'
})
export class VcCurrencyPipe implements PipeTransform {
	public currencyCode: string = 'USD';
	/**
	 * My Currency Pipe
	 * @param settingService
	 */
	constructor(
		private settingService: SettingService
	) {
		this.settingService.setting.subscribe((response: Setting) => {
			if (response) this.currencyCode = response.currency.code;
		});
	}

    transform(
        value: number,
        currencyCode: string = this.currencyCode,
        display:
            | 'code'
            | 'symbol'
            | 'symbol-narrow'
            | string
            | boolean = 'symbol',
        digitsInfo: string = '1.0-2',
        locale: string = 'en',
    ): string | null {
        return formatCurrency(
          value,
          locale,
          getCurrencySymbol(currencyCode, 'wide'),
          currencyCode,
          digitsInfo,
        );
    }
}