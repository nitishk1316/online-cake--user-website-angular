import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChangeLanguageComponent } from './change-language.component';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list';
import { VcLoaderModule } from 'src/shared/components';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: ChangeLanguageComponent
	}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
		MatCardModule,
		TranslateModule,
		MatIconModule,
		MatListModule,
		VcLoaderModule
  ],
  declarations: [ChangeLanguageComponent],
  exports: [ChangeLanguageComponent],
})
export class ChangeLanguageModule {}
