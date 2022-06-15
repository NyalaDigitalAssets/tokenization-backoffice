import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ExternalRetailWalletDto} from 'src/app/core/models';
import { CustomApiService } from 'src/app/core/services/ganymede.service';


@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
    constructor(
        private router: Router,
        private customApi: CustomApiService) { }
    erwDatasource =  new MatTableDataSource<ExternalRetailWalletDto>();;
    
    @ViewChild(MatSort, { static: false }) erwSort: MatSort;
    @ViewChild('erwPaginator', { static: false }) erwPaginator: MatPaginator;
    erwColumns = ['id', 'name', 'publicAddress', 'created'];

    ngOnInit(): void {
        this.getExternalRetailWallets();
    }

    ngAfterViewInit() {
        this.erwDatasource.paginator = this.erwPaginator;
        this.erwDatasource.sort = this.erwSort;
        this.erwDatasource.paginator = this.erwPaginator;
    }

    getExternalRetailWallets() {
        this.customApi.getExternalRetailWalletExternalRetailWallet().subscribe(res => {
            this.erwDatasource.data = res.data;
        })
    }
    
    import() {
        this.router.navigate([
            'tokenization', 
            'external',
            'import',
        ]);
    }

    transfer() {
        this.router.navigate([
            'tokenization', 
            'external',
            'transfer-fungible',
        ]);
    }
}
