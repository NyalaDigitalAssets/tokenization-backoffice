/**
 * This file is generated by the SwaggerTSGenerator.
 * Do not edit.
*/
/* tslint:disable */
import { Validators, FormControl, FormGroup, FormArray, ValidatorFn } from '@angular/forms';
import { minValueValidator, maxValueValidator, enumValidator } from './validators';
import { BaseModel } from './base-model';
import { SubTypeFactory } from './sub-type-factory';


import { AssetTypes } from './enums';
import { ReviewDecision } from './enums';
import { TokenizedAssetTransferDto } from './tokenized-asset-transfer-dto.model';
import { TokenizedAssetOptInDto } from './tokenized-asset-opt-in-dto.model';

export interface ITokenizedAssetDetailsDto {
    id?: string;
    assetId?: string;
    name?: string;
    unitName?: string;
    totalSupply?: number;
    decimals?: number;
    enableFreeze?: boolean;
    enableClawback?: boolean;
    url?: string;
    metaData?: string;
    issuerAddress?: string;
    distributionAddress?: string;
    assetType?: AssetTypes;
    reviewDecision?: ReviewDecision;
    reviewedAt?: Date;
    reviewer?: string;
    transfers?: Array<TokenizedAssetTransferDto>;
    optIns?: Array<TokenizedAssetOptInDto>;
}


export class TokenizedAssetDetailsDto extends BaseModel implements ITokenizedAssetDetailsDto  {
    id: string;
    assetId: string;
    name: string;
    unitName: string;
    totalSupply: number;
    decimals: number;
    enableFreeze: boolean;
    enableClawback: boolean;
    url: string;
    metaData: string;
    issuerAddress: string;
    distributionAddress: string;
    assetType: AssetTypes;
    reviewDecision: ReviewDecision;
    reviewedAt: Date;
    reviewer: string;
    transfers: Array<TokenizedAssetTransferDto>;
    optIns: Array<TokenizedAssetOptInDto>;

    /**
     * constructor
     * @param values Can be used to set a webapi response or formValues to this newly constructed model
     * @useFormGroupValuesToModel if true use formValues
    */
    constructor(values?: any, useFormGroupValuesToModel = false) {
        super();
        this.transfers = new Array<TokenizedAssetTransferDto>(); 
        this.optIns = new Array<TokenizedAssetOptInDto>(); 

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
            this.assetId = rawValues.assetId;
            this.name = rawValues.name;
            this.unitName = rawValues.unitName;
            this.totalSupply = rawValues.totalSupply;
            this.decimals = rawValues.decimals;
            this.enableFreeze = rawValues.enableFreeze;
            this.enableClawback = rawValues.enableClawback;
            this.url = rawValues.url;
            this.metaData = rawValues.metaData;
            this.issuerAddress = rawValues.issuerAddress;
            this.distributionAddress = rawValues.distributionAddress;
            this.assetType = rawValues.assetType;
            this.reviewDecision = rawValues.reviewDecision;
            this.reviewedAt = rawValues.reviewedAt;
            this.reviewer = rawValues.reviewer;
            this.fillModelArray<TokenizedAssetTransferDto>(this, 'transfers', rawValues.transfers, useFormGroupValuesToModel, TokenizedAssetTransferDto, SubTypeFactory.createSubTypeInstance);
            this.fillModelArray<TokenizedAssetOptInDto>(this, 'optIns', rawValues.optIns, useFormGroupValuesToModel, TokenizedAssetOptInDto, SubTypeFactory.createSubTypeInstance);
            // set values in model properties for added formControls
            super.setValuesInAddedPropertiesOfAttachedFormControls(values, useFormGroupValuesToModel);
        }
    }

    protected getFormGroup(): FormGroup {
        if (!this._formGroup) {
            this._formGroup = new FormGroup({
                id: new FormControl(this.id),
                assetId: new FormControl(this.assetId),
                name: new FormControl(this.name),
                unitName: new FormControl(this.unitName),
                totalSupply: new FormControl(this.totalSupply),
                decimals: new FormControl(this.decimals),
                enableFreeze: new FormControl(this.enableFreeze),
                enableClawback: new FormControl(this.enableClawback),
                url: new FormControl(this.url),
                metaData: new FormControl(this.metaData),
                issuerAddress: new FormControl(this.issuerAddress),
                distributionAddress: new FormControl(this.distributionAddress),
                assetType: new FormControl(this.assetType, [enumValidator(AssetTypes), ]),
                reviewDecision: new FormControl(this.reviewDecision, [enumValidator(ReviewDecision), ]),
                reviewedAt: new FormControl(this.reviewedAt),
                reviewer: new FormControl(this.reviewer),
                transfers: new FormArray([]),
                optIns: new FormArray([]),
            });
            // generate FormArray control elements
            this.fillFormArray<TokenizedAssetTransferDto>('transfers', this.transfers, TokenizedAssetTransferDto);
            // generate FormArray control elements
            this.fillFormArray<TokenizedAssetOptInDto>('optIns', this.optIns, TokenizedAssetOptInDto);
        }
        return this._formGroup;
    }

    /**
     * set the FormGroup values to the model values.
    */
    setFormGroupValues() {
        this.$formGroup.controls['id'].setValue(this.id);
        this.$formGroup.controls['assetId'].setValue(this.assetId);
        this.$formGroup.controls['name'].setValue(this.name);
        this.$formGroup.controls['unitName'].setValue(this.unitName);
        this.$formGroup.controls['totalSupply'].setValue(this.totalSupply);
        this.$formGroup.controls['decimals'].setValue(this.decimals);
        this.$formGroup.controls['enableFreeze'].setValue(this.enableFreeze);
        this.$formGroup.controls['enableClawback'].setValue(this.enableClawback);
        this.$formGroup.controls['url'].setValue(this.url);
        this.$formGroup.controls['metaData'].setValue(this.metaData);
        this.$formGroup.controls['issuerAddress'].setValue(this.issuerAddress);
        this.$formGroup.controls['distributionAddress'].setValue(this.distributionAddress);
        this.$formGroup.controls['assetType'].setValue(this.assetType);
        this.$formGroup.controls['reviewDecision'].setValue(this.reviewDecision);
        this.$formGroup.controls['reviewedAt'].setValue(this.reviewedAt);
        this.$formGroup.controls['reviewer'].setValue(this.reviewer);
        this.fillFormArray<TokenizedAssetTransferDto>('transfers', this.transfers, TokenizedAssetTransferDto);
        this.fillFormArray<TokenizedAssetOptInDto>('optIns', this.optIns, TokenizedAssetOptInDto);
        // set formValues in added formControls
        super.setFormGroupValuesInAddedFormControls();
    }
}

