import { AfterViewInit, Component,  ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

import { CustomerAccountDto } from '../../core/models';
import { CustomApiService } from '../../core/services/ganymede.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'phoneNumber', 'walletAccess'];
  dataSource = new MatTableDataSource<CustomerAccountDto>();
  searchText = '';

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  
  constructor(
    private customApi: CustomApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.search();
  }

  search() {
    const queryParams = [];
    if (this.searchText) {
      queryParams.push(`searchText=${this.searchText}`);
    }
    queryParams.push(`take=50`);
    queryParams.push(`skip=0`);

    this.customApi
      .getCustomerQueryCustomers(queryParams.join('&'))
      .subscribe(
        (response) => {
          this.dataSource.data = response.data;
        },
      );
  }
  getWallets(customerId){
    this.router.navigate([customerId + `/retail-wallets`], {
      relativeTo: this.route,
  });
  }
}
