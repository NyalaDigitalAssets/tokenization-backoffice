/**
 * This file is generated by the SwaggerTSGenerator.
 * Do not edit.
*/
/* tslint:disable */
import { Validators, FormControl, FormGroup, FormArray, ValidatorFn } from '@angular/forms';
import { minValueValidator, maxValueValidator, enumValidator } from './validators';
import { BaseModel } from './base-model';
import { SubTypeFactory } from './sub-type-factory';


import { TokenizedAssetToRetailWallet } from './tokenized-asset-to-retail-wallet.model';
import { SimpleAccessCredentialsDto } from './simple-access-credentials-dto.model';

export interface IIssuerWalletTokenizedAssetTransferDto {
    transfers?: Array<TokenizedAssetToRetailWallet>;
    credentials?: SimpleAccessCredentialsDto;
}


export class IssuerWalletTokenizedAssetTransferDto extends BaseModel implements IIssuerWalletTokenizedAssetTransferDto  {
    transfers: Array<TokenizedAssetToRetailWallet>;
    credentials: SimpleAccessCredentialsDto;

    /**
     * constructor
     * @param values Can be used to set a webapi response or formValues to this newly constructed model
     * @useFormGroupValuesToModel if true use formValues
    */
    constructor(values?: any, useFormGroupValuesToModel = false) {
        super();
        this.transfers = new Array<TokenizedAssetToRetailWallet>(); 
        this.credentials = new SimpleAccessCredentialsDto(); 

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
            this.fillModelArray<TokenizedAssetToRetailWallet>(this, 'transfers', rawValues.transfers, useFormGroupValuesToModel, TokenizedAssetToRetailWallet, SubTypeFactory.createSubTypeInstance);
            this.credentials.setValues(rawValues.credentials, useFormGroupValuesToModel);
            // set values in model properties for added formControls
            super.setValuesInAddedPropertiesOfAttachedFormControls(values, useFormGroupValuesToModel);
        }
    }

    protected getFormGroup(): FormGroup {
        if (!this._formGroup) {
            this._formGroup = new FormGroup({
                transfers: new FormArray([]),
                credentials: this.credentials.$formGroup,
            });
            // generate FormArray control elements
            this.fillFormArray<TokenizedAssetToRetailWallet>('transfers', this.transfers, TokenizedAssetToRetailWallet);
        }
        return this._formGroup;
    }

    /**
     * set the FormGroup values to the model values.
    */
    setFormGroupValues() {
        this.fillFormArray<TokenizedAssetToRetailWallet>('transfers', this.transfers, TokenizedAssetToRetailWallet);
        this.credentials.setFormGroupValues();
        // set formValues in added formControls
        super.setFormGroupValuesInAddedFormControls();
    }
}

