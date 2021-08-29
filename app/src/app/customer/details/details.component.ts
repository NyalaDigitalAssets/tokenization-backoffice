import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CustomerAccountDto,
  UpdateCustomerAccountDto,
} from 'src/app/core/models';
import { CustomApiService } from 'src/app/core/services/ganymede.service';

interface Dropdown {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  salutations: Dropdown[] = [
    { value: 'Herr', viewValue: 'Herr' },
    { value: 'Frau', viewValue: 'Frau' },
  ];
  accountTypes: Dropdown[] = [
    { value: 'Person', viewValue: 'Person' },
    { value: 'LegalEntity', viewValue: 'Legal' },
  ];

  customerId: string;
  customer: CustomerAccountDto;
  updateCustomerModel: UpdateCustomerAccountDto;
  birthDate: string;
  submitting = false;

  constructor(
    private customApi: CustomApiService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.updateCustomerModel = new UpdateCustomerAccountDto();
    this.customerId = this.route.snapshot.paramMap.get('customer-id');
    this.getCustomer();
  }

  getCustomer() {
    this.customApi.getCustomerGetCustomer(this.customerId).subscribe(
      (response) => {
        this.customer = response.data;
        this.setFields();
      },
      () => {},
      () => {
        this.submitting = false;
      }
    );
  }
  setFields() {
    this.updateCustomerModel.type = this.customer?.type;
    this.updateCustomerModel.salutation = this.customer?.salutation;
    this.updateCustomerModel.firstname = this.customer?.firstname;
    this.updateCustomerModel.lastname = this.customer?.lastname;
    this.updateCustomerModel.countryIso = this.customer?.address?.country?.iso;
    this.updateCustomerModel.postalCode = this.customer?.address?.postalCode;
    this.updateCustomerModel.street = this.customer?.address?.street;
    this.updateCustomerModel.streetNo = this.customer?.address?.streetNo;
    this.updateCustomerModel.town = this.customer?.address?.town;
    this.updateCustomerModel.phoneNumber = this.customer?.phoneNumber;
    this.updateCustomerModel.birthDate = this.customer?.birthDate;
  }
  updateCustomer() {
    this.submitting = true;

    const d = new Date(this.updateCustomerModel.birthDate);
    this.updateCustomerModel.birthDate = new Date(
      Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
    );

    this.customApi
      .putCustomerUpdateCustomer(this.customerId, this.updateCustomerModel)
      .subscribe((response) => {
        this.getCustomer();
      });
  }
}
