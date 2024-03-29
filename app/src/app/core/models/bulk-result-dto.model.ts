/**
 * This file is generated by the SwaggerTSGenerator.
 * Do not edit.
*/
/* tslint:disable */
import { Validators, FormControl, FormGroup, FormArray, ValidatorFn } from '@angular/forms';
import { minValueValidator, maxValueValidator, enumValidator } from './validators';
import { BaseModel } from './base-model';
import { SubTypeFactory } from './sub-type-factory';


import { BulkResultItemDto } from './bulk-result-item-dto.model';

export interface IBulkResultDto {
    items?: Array<BulkResultItemDto>;
}


export class BulkResultDto extends BaseModel implements IBulkResultDto  {
    items: Array<BulkResultItemDto>;

    /**
     * constructor
     * @param values Can be used to set a webapi response or formValues to this newly constructed model
     * @useFormGroupValuesToModel if true use formValues
    */
    constructor(values?: any, useFormGroupValuesToModel = false) {
        super();
        this.items = new Array<BulkResultItemDto>(); 

        if (values) {
            this.setValues(values, useFormGroupValuesToModel);
        }
    }

    /**
     * set the values.
     * @param values Can be used to set a webapi response to this newly constructed model
    */
    setValues(values: any, useFormGroupValuesToModel = false): void {
        if (values) {
            const rawValues = this.getValuesToUse(values, useFormGroupValuesToModel);
            this.fillModelArray<BulkResultItemDto>(this, 'items', rawValues.items, useFormGroupValuesToModel, BulkResultItemDto, SubTypeFactory.createSubTypeInstance);
            // set values in model properties for added formControls
            super.setValuesInAddedPropertiesOfAttachedFormControls(values, useFormGroupValuesToModel);
        }
    }

    protected getFormGroup(): FormGroup {
        if (!this._formGroup) {
            this._formGroup = new FormGroup({
                items: new FormArray([]),
            });
            // generate FormArray control elements
            this.fillFormArray<BulkResultItemDto>('items', this.items, BulkResultItemDto);
        }
        return this._formGroup;
    }

    /**
     * set the FormGroup values to the model values.
    */
    setFormGroupValues() {
        this.fillFormArray<BulkResultItemDto>('items', this.items, BulkResultItemDto);
        // set formValues in added formControls
        super.setFormGroupValuesInAddedFormControls();
    }
}

