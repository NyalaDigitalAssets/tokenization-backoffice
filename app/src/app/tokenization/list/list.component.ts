import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AssetTypeUtilityService } from 'src/app/core/services/asset-types-utility.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

import {
  AssetTypes,
  IIssuerWalletDto,
  IssuerWalletDto,
  IssuerWalletRoles,
  IssuerWalletSeedDto,
} from '../../core/models';
import { CustomApiService } from '../../core/services/ganymede.service';

interface Balance {
  amount: number;
  unitName: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @ViewChild('qrTpl') qrTpl: TemplateRef<any>;

  tokenizedAssetColumns: string[] = [
    'name',
    'unitName',
    'totalSupply',
    'decimals',
  ];
  balanceColumns: string[] = ['amount', 'unitName'];
  publicAddress: string;
  issuerWalletSeeds: IssuerWalletSeedDto[];
  AssetTypes = AssetTypes;
  IssuerWalletRoles = IssuerWalletRoles;

  constructor(
    private customApi: CustomApiService,
    private router: Router,
    private assetTypeUtility: AssetTypeUtilityService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadIssuerWalletSeeds();
  }

  deriveNewWallet(id: string) {
    this.router.navigate(['tokenization', id, 'derive-wallet']);
  }

  createNewSeed() {
    this.router.navigate(['tokenization', 'create']);
  }

  createNewToken(id: string) {
    this.router.navigate(['tokenization', id, 'create-token']);
  }

  getBalances(wallet: IssuerWalletDto): Balance[] {
    const balances: Balance[] = [];

    balances.push({
      amount: wallet.balance.nativeBalance,
      unitName: this.assetTypeUtility.unit(wallet.assetType),
    });

    if (wallet.balance.nonNativeBalances) {
      for (const unitName in wallet.balance.nonNativeBalances) {
        if (
          Object.prototype.hasOwnProperty.call(
            wallet.balance.nonNativeBalances,
            unitName
          )
        ) {
          const amount = wallet.balance.nonNativeBalances[unitName];
          balances.push({
            amount: amount,
            unitName: unitName,
          });
        }
      }
    }

    return balances;
  }

  getSeedName(issuerWalletSeed: IssuerWalletSeedDto): string {
    return issuerWalletSeed.wallets[0].name.split('-')[0];
  }

  getIcon(assetType: AssetTypes): string {
    return this.assetTypeUtility.icon(assetType);
  }

  goToBlockchainExplorer(wallet: IssuerWalletDto) {
    const url = `${this.assetTypeUtility.addressUrl(wallet.assetType)}/${
      wallet.publicAddress
    }`;
    window.open(url, '_blank');
  }

  showAddressQrCode(wallet: IssuerWalletDto) {
    this.publicAddress = wallet.publicAddress;
    this.dialog.open(ModalComponent, {
      data: {
        component: this.qrTpl,
        showClose: true,
      },
      disableClose: false,
    });
  }

  sendTokens(wallet: IIssuerWalletDto) {}

  private loadIssuerWalletSeeds() {
    this.customApi
      .getIssuerWalletGetIssuerWalletSeeds()
      .subscribe((response) => {
        this.issuerWalletSeeds = response.data;
      });
  }
}
