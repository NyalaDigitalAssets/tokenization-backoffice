import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MenuItem } from '../../core/internal-models/menu-item';
import { AuthenticatedInstitutionDto, Products } from '../../core/models';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
    @Input() items: MenuItem[];
    @Input() identity: AuthenticatedInstitutionDto;
    @Output() navigated = new EventEmitter();

    Products = Products;

    constructor() {}

    emitNavigated() {
        this.navigated.emit();
    }
}
