import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { AuthenticatedInstitutionDto, Products } from '../../core/models';
import { MenuItem } from '../../core/internal-models/menu-item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() items: MenuItem[];
  @Input() identity: AuthenticatedInstitutionDto;
  @Output() navigated = new EventEmitter();

  Products = Products;

  constructor() {}

  ngOnInit(): void {}

  emitNavigated() {
    this.navigated.emit();
  }
}
