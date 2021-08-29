import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ApiService } from './services/api.service';
import { AssetTypeUtilityService } from './services/asset-types-utility.service';
import { ClipboardService } from './services/clipboard.service';
import { CustomApiService } from './services/ganymede.service';
import { LoadingInterceptor } from './services/loading.interceptor';
import { LoadingService } from './services/loading.service';

@NgModule({
  providers: [
    ApiService,
    CustomApiService,
    ClipboardService,
    AssetTypeUtilityService,
    LoadingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  imports: [CommonModule, HttpClientModule],
})
export class CoreModule {}
