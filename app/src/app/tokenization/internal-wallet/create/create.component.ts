import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CreateIssuerWalletSeedDto, SimpleAccessCredentialsDto } from '../../../core/models';
import { CustomApiService } from '../../../core/services/ganymede.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  model = new CreateIssuerWalletSeedDto();
  passphraseMessage: string;

  constructor(private customApi: CustomApiService, private router: Router) {}

  ngOnInit(): void {
    this.model.credentials = this.model.credentials || new SimpleAccessCredentialsDto();
  }

  submit() {
    this.customApi
      .postIssuerWalletCreateIssuerWalletSeed(this.model)
      .subscribe(() => this.router.navigate(['tokenization', 'internal']));
  }
}
