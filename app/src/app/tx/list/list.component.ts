import { AfterViewInit, OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AssetTypes, TransactionActions, TransactionToShowDto, TxStatus, WalletTypes } from 'src/app/core/models';
import { CustomApiService } from 'src/app/core/services/ganymede.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['assetType', 'srcWallet', 'action', 'txBody', 'status', 'retryCounter', 'txId', 'modified', 'created' ]
  AssetTypes = AssetTypes;
  WalletTypes = WalletTypes;
  TransactionActions = TransactionActions;
  TxStatus = TxStatus;
  dataSource = new MatTableDataSource<TransactionToShowDto>();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private customApi: CustomApiService,
  ) {}

  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;    
  }

  ngOnInit(): void {
    this.getTransactions()
  }

  getTransactions() : void{
    this.customApi.getTransactionGetTransactions()
    .subscribe(
      (response) => {
        this.dataSource.data = response.data;
      },
    );
  }
}
