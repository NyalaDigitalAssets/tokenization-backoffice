import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ApiService } from './services/api.service';
import { BlockchainUtilityService } from './services/blockchain-utility.service';
import { ClipboardService } from './services/clipboard.service';
import { CustomApiService } from './services/ganymede.service';
import { LoadingService } from './services/loading.service';

@NgModule({
  providers: [
    ApiService,
    CustomApiService,
    ClipboardService,
    BlockchainUtilityService,
    LoadingService,
  ],
  imports: [CommonModule, HttpClientModule],
})
export class CoreModule {}
