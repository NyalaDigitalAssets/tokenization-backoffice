import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ApiService } from './services/api.service';
import { AssetTypeUtilityService } from './services/asset-types-utility.service';
import { ClipboardService } from './services/clipboard.service';
import { CustomApiService } from './services/ganymede.service';
import { LoadingService } from './services/loading.service';

@NgModule({
  providers: [
    ApiService,
    CustomApiService,
    ClipboardService,
    AssetTypeUtilityService,
    LoadingService,
  ],
  imports: [CommonModule, HttpClientModule],
})
export class CoreModule {}
