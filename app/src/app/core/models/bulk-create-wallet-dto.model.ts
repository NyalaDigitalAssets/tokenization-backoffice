/**
 * This file is generated by the SwaggerTSGenerator.
 * Do not edit.
*/
/* tslint:disable */
import { Validators, FormControl, FormGroup, FormArray, ValidatorFn } from '@angular/forms';
import { minValueValidator, maxValueValidator, enumValidator } from './validators';
import { BaseModel } from './base-model';
import { SubTypeFactory } from './sub-type-factory';


import { CreateWalletDataDto } from './create-wallet-data-dto.model';

export interface IBulkCreateWalletDto {
    walletData?: Array<CreateWalletDataDto>;
}


export class BulkCreateWalletDto extends BaseModel implements IBulkCreateWalletDto  {
    walletData: Array<CreateWalletDataDto>;

    /**
     * constructor
     * @param values Can be used to set a webapi response or formValues to this newly constructed model
     * @useFormGroupValuesToModel if true use formValues
    */
    constructor(values?: any, useFormGroupValuesToModel = false) {
        super();
        this.walletData = new Array<CreateWalletDataDto>(); 

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
            this.fillModelArray<CreateWalletDataDto>(this, 'walletData', rawValues.walletData, useFormGroupValuesToModel, CreateWalletDataDto, SubTypeFactory.createSubTypeInstance);
            // set values in model properties for added formControls
            super.setValuesInAddedPropertiesOfAttachedFormControls(values, useFormGroupValuesToModel);
        }
    }

    protected getFormGroup(): FormGroup {
        if (!this._formGroup) {
            this._formGroup = new FormGroup({
                walletData: new FormArray([]),
            });
            // generate FormArray control elements
            this.fillFormArray<CreateWalletDataDto>('walletData', this.walletData, CreateWalletDataDto);
        }
        return this._formGroup;
    }

    /**
     * set the FormGroup values to the model values.
    */
    setFormGroupValues() {
        this.fillFormArray<CreateWalletDataDto>('walletData', this.walletData, CreateWalletDataDto);
        // set formValues in added formControls
        super.setFormGroupValuesInAddedFormControls();
    }
}

