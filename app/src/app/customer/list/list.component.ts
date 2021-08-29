import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerAccountDto } from 'src/app/core/models';
import { CustomApiService } from 'src/app/core/services/ganymede.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phoneNumber', 'walletAccess'];
  dataSource: CustomerAccountDto[];
  searchText = '';

  constructor(
    private customApi: CustomApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
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
          this.dataSource = response.data;
        },
      );
  }
  getWallets(customerId){
    this.router.navigate([customerId + `/retail-wallets`], {
      relativeTo: this.route,
  });
  }
}
