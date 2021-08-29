import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  AssetTypes,
  DeriveIssuerWalletFromSeedDto,
  IssuerWalletRoles,
  SimpleAccessCredentialsDto,
} from '../../core/models';
import { CustomApiService } from '../../core/services/ganymede.service';

@Component({
  selector: 'app-derive-wallet',
  templateUrl: './derive-wallet.component.html',
  styleUrls: ['./derive-wallet.component.scss'],
})
export class DeriveWalletComponent implements OnInit {
  seedId: string;
  model = new DeriveIssuerWalletFromSeedDto();
  passphraseMessage: string;

  AssetTypes = AssetTypes;
  IssuerWalletRoles = IssuerWalletRoles;
  allowedAssetTypes = [AssetTypes.ALGO, AssetTypes.XLM];

  constructor(
    private customApi: CustomApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.seedId = params.seedId;
    });
    this.model.credentials =
      this.model.credentials || new SimpleAccessCredentialsDto();
  }

  submit() {
    this.customApi
      .putIssuerWalletDeriveNewIssuerWallet(this.seedId, this.model)
      .subscribe(() => this.router.navigate(['tokenization']));
  }
}
