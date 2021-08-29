import { TemplateRef } from '@angular/core';

export interface ModalData {
    component: TemplateRef<any>;
    showClose?: boolean;
}
