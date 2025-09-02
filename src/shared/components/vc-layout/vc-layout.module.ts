import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { VcHeaderMenuComponent } from './vc-header-menu/vc-header-menu.component';
import { VcHeaderToolbarComponent } from './vc-header-toolbar/vc-header-toolbar.component';
import { VcFooterComponent } from './vc-footer/vc-footer.component';

@NgModule({
  imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		MatSidenavModule,
		MatButtonModule,
		MatIconModule,
		MatMenuModule,
		MatInputModule,
		MatToolbarModule,
		MatListModule,
		LayoutModule,
		MatBadgeModule,
		TranslateModule
	],
  declarations: [VcHeaderMenuComponent, VcHeaderToolbarComponent, VcFooterComponent],
  exports: [VcHeaderMenuComponent, VcHeaderToolbarComponent, VcFooterComponent],
})
export class VcLayoutModule {}
