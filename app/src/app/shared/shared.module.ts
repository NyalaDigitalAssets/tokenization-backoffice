import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { QrCodeModule } from 'ng-qrcode';

import { CopyClipboardDirective } from './copy-clipboard.directive';
import { FaIconComponent } from './fa-icon/fa-icon.component';
import { HeaderComponent } from './header/header.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuComponent } from './menu/menu.component';
import { SvgIconComponent } from './svg-icon/svg-icon.component';
import { ModalComponent } from './modal/modal.component';

const MAT_MODULES = [
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatListModule,
  MatTooltipModule,
  MatTableModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatChipsModule,
  MatExpansionModule,
  MatTabsModule,
  MatSelectModule,
  MatSnackBarModule,
  MatDialogModule,
];

const EXPORTS = [
  MenuComponent,
  FaIconComponent,
  HeaderComponent,
  SvgIconComponent,
  LoadingScreenComponent,
  CopyClipboardDirective,
  ModalComponent,
];

@NgModule({
  declarations: [
    MenuItemComponent,
    MenuComponent,
    FaIconComponent,
    HeaderComponent,
    SvgIconComponent,
    LoadingScreenComponent,
    CopyClipboardDirective,
    ModalComponent,
  ],
  imports: [CommonModule, FormsModule, QrCodeModule, ...MAT_MODULES],
  exports: [FormsModule, ...EXPORTS, QrCodeModule, ...MAT_MODULES],
})
export class SharedModule {}
