import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page.component';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: PageComponent
	},
	{
		path: ':key',
		pathMatch: 'full',
		component: PageComponent
	}
];

@NgModule({
  imports: [
    CommonModule,
		RouterModule.forChild(routes),
		TranslateModule,
	],
	declarations: [PageComponent],
	exports: [PageComponent],
})
export class PageModule {}
