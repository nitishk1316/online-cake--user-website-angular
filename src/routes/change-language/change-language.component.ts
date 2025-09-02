import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { Subscription } from 'rxjs';
import { Language } from 'src/shared/classes';
import { LocaleService } from 'src/shared/services';

@Component({
  selector: 'vc-change-language',
  templateUrl: './change-language.component.html',
  styleUrls: ['./change-language.component.scss']
})
export class ChangeLanguageComponent implements OnInit {
	private sub: Subscription;
	public languages: Language[] = [
		{
			title: 'English',
			code: 'en'
		},
		{
			title: 'Spanish',
			code: 'es'
		}
	];
	public defaultLanguage: string = 'en';
	public isLoading: boolean = false;

  constructor(
		private localeService: LocaleService
	) { }

  ngOnInit(): void {
		this.defaultLanguage = this.localeService.getDefault();
	}

	/**
	 * Set Default Language
	 * @param options
	 */
	setDefault(options: MatListOption[]) {
		const selected = options.map(o => o.value)[0];
		this.defaultLanguage = selected;
		this.localeService.setLanguage(selected);
	}
}
