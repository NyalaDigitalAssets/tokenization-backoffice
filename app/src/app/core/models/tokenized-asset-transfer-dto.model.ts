/**
 * This file is generated by the SwaggerTSGenerator.
 * Do not edit.
*/
/* tslint:disable */
import { Validators, FormControl, FormGroup, FormArray, ValidatorFn } from '@angular/forms';
import { minValueValidator, maxValueValidator, enumValidator } from './validators';
import { BaseModel } from './base-model';
import { SubTypeFactory } from './sub-type-factory';


import { WalletTransactionStatus } from './enums';
import { TokenizedAssetDto } from './tokenized-asset-dto.model';

export interface ITokenizedAssetTransferDto {
    id?: string;
    receiverRetailWalletId?: string;
    status?: WalletTransactionStatus;
    created?: Date;
    txId?: string;
    fromAddress?: string;
    toAddress?: string;
    amount?: string;
    tokenizedAsset?: TokenizedAssetDto;
}


export class TokenizedAssetTransferDto extends BaseModel implements ITokenizedAssetTransferDto  {
    id: string;
    receiverRetailWalletId: string;
    status: WalletTransactionStatus;
    created: Date;
    txId: string;
    fromAddress: string;
    toAddress: string;
    amount: string;
    tokenizedAsset: TokenizedAssetDto;

    /**
     * constructor
     * @param values Can be used to set a webapi response or formValues to this newly constructed model
     * @useFormGroupValuesToModel if true use formValues
    */
    constructor(values?: any, useFormGroupValuesToModel = false) {
        super();
        this.tokenizedAsset = new TokenizedAssetDto(); 

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
            this.id = rawValues.id;
            this.receiverRetailWalletId = rawValues.receiverRetailWalletId;
            this.status = rawValues.status;
            this.created = rawValues.created;
            this.txId = rawValues.txId;
            this.fromAddress = rawValues.fromAddress;
            this.toAddress = rawValues.toAddress;
            this.amount = rawValues.amount;
            this.tokenizedAsset.setValues(rawValues.tokenizedAsset, useFormGroupValuesToModel);
            // set values in model properties for added formControls
            super.setValuesInAddedPropertiesOfAttachedFormControls(values, useFormGroupValuesToModel);
        }
    }

    protected getFormGroup(): FormGroup {
        if (!this._formGroup) {
            this._formGroup = new FormGroup({
                id: new FormControl(this.id),
                receiverRetailWalletId: new FormControl(this.receiverRetailWalletId),
                status: new FormControl(this.status, [enumValidator(WalletTransactionStatus), ]),
                created: new FormControl(this.created),
                txId: new FormControl(this.txId),
                fromAddress: new FormControl(this.fromAddress),
                toAddress: new FormControl(this.toAddress),
                amount: new FormControl(this.amount),
                tokenizedAsset: this.tokenizedAsset.$formGroup,
            });
        }
        return this._formGroup;
    }

    /**
     * set the FormGroup values to the model values.
    */
    setFormGroupValues() {
        this.$formGroup.controls['id'].setValue(this.id);
        this.$formGroup.controls['receiverRetailWalletId'].setValue(this.receiverRetailWalletId);
        this.$formGroup.controls['status'].setValue(this.status);
        this.$formGroup.controls['created'].setValue(this.created);
        this.$formGroup.controls['txId'].setValue(this.txId);
        this.$formGroup.controls['fromAddress'].setValue(this.fromAddress);
        this.$formGroup.controls['toAddress'].setValue(this.toAddress);
        this.$formGroup.controls['amount'].setValue(this.amount);
        this.tokenizedAsset.setFormGroupValues();
        // set formValues in added formControls
        super.setFormGroupValuesInAddedFormControls();
    }
}

