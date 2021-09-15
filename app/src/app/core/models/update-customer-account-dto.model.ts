/**
 * This file is generated by the SwaggerTSGenerator.
 * Do not edit.
*/
/* tslint:disable */
import { Validators, FormControl, FormGroup, FormArray, ValidatorFn } from '@angular/forms';
import { minValueValidator, maxValueValidator, enumValidator } from './validators';
import { BaseModel } from './base-model';
import { SubTypeFactory } from './sub-type-factory';


import { AccountTypes } from './enums';
import { RetailWalletAccessLevels } from './enums';
import { CustomerCompanyDetailDto } from './customer-company-detail-dto.model';

export interface IUpdateCustomerAccountDto {
    salutation: string;
    title?: string;
    firstname: string;
    lastname: string;
    birthDate?: Date;
    phoneNumber?: string;
    type: AccountTypes;
    street: string;
    streetNo: string;
    postalCode: string;
    town: string;
    countryIso: string;
    walletAccess?: RetailWalletAccessLevels;
    company?: CustomerCompanyDetailDto;
}


export class UpdateCustomerAccountDto extends BaseModel implements IUpdateCustomerAccountDto  {
    salutation: string;
    title: string;
    firstname: string;
    lastname: string;
    birthDate: Date;
    phoneNumber: string;
    type: AccountTypes;
    street: string;
    streetNo: string;
    postalCode: string;
    town: string;
    countryIso: string;
    walletAccess: RetailWalletAccessLevels;
    company: CustomerCompanyDetailDto;

    /**
     * constructor
     * @param values Can be used to set a webapi response or formValues to this newly constructed model
     * @useFormGroupValuesToModel if true use formValues
    */
    constructor(values?: any, useFormGroupValuesToModel = false) {
        super();
        this.company = new CustomerCompanyDetailDto(); 

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
            this.salutation = rawValues.salutation;
            this.title = rawValues.title;
            this.firstname = rawValues.firstname;
            this.lastname = rawValues.lastname;
            this.birthDate = rawValues.birthDate;
            this.phoneNumber = rawValues.phoneNumber;
            this.type = rawValues.type;
            this.street = rawValues.street;
            this.streetNo = rawValues.streetNo;
            this.postalCode = rawValues.postalCode;
            this.town = rawValues.town;
            this.countryIso = rawValues.countryIso;
            this.walletAccess = rawValues.walletAccess;
            this.company.setValues(rawValues.company, useFormGroupValuesToModel);
            // set values in model properties for added formControls
            super.setValuesInAddedPropertiesOfAttachedFormControls(values, useFormGroupValuesToModel);
        }
    }

    protected getFormGroup(): FormGroup {
        if (!this._formGroup) {
            this._formGroup = new FormGroup({
                salutation: new FormControl(this.salutation, [Validators.required, Validators.minLength(0), Validators.maxLength(16), ]),
                title: new FormControl(this.title, [Validators.minLength(0), Validators.maxLength(64), ]),
                firstname: new FormControl(this.firstname, [Validators.required, Validators.minLength(0), Validators.maxLength(64), ]),
                lastname: new FormControl(this.lastname, [Validators.required, Validators.minLength(0), Validators.maxLength(64), ]),
                birthDate: new FormControl(this.birthDate),
                phoneNumber: new FormControl(this.phoneNumber, [Validators.minLength(0), Validators.maxLength(64), ]),
                type: new FormControl(this.type, [Validators.required, enumValidator(AccountTypes), ]),
                street: new FormControl(this.street, [Validators.required, Validators.maxLength(100), ]),
                streetNo: new FormControl(this.streetNo, [Validators.required, Validators.maxLength(100), ]),
                postalCode: new FormControl(this.postalCode, [Validators.required, Validators.maxLength(100), ]),
                town: new FormControl(this.town, [Validators.required, Validators.maxLength(100), ]),
                countryIso: new FormControl(this.countryIso, [Validators.required, Validators.minLength(2), Validators.maxLength(2), ]),
                walletAccess: new FormControl(this.walletAccess, [enumValidator(RetailWalletAccessLevels), ]),
                company: this.company.$formGroup,
            });
        }
        return this._formGroup;
    }

    /**
     * set the FormGroup values to the model values.
    */
    setFormGroupValues() {
        this.$formGroup.controls['salutation'].setValue(this.salutation);
        this.$formGroup.controls['title'].setValue(this.title);
        this.$formGroup.controls['firstname'].setValue(this.firstname);
        this.$formGroup.controls['lastname'].setValue(this.lastname);
        this.$formGroup.controls['birthDate'].setValue(this.birthDate);
        this.$formGroup.controls['phoneNumber'].setValue(this.phoneNumber);
        this.$formGroup.controls['type'].setValue(this.type);
        this.$formGroup.controls['street'].setValue(this.street);
        this.$formGroup.controls['streetNo'].setValue(this.streetNo);
        this.$formGroup.controls['postalCode'].setValue(this.postalCode);
        this.$formGroup.controls['town'].setValue(this.town);
        this.$formGroup.controls['countryIso'].setValue(this.countryIso);
        this.$formGroup.controls['walletAccess'].setValue(this.walletAccess);
        this.company.setFormGroupValues();
        // set formValues in added formControls
        super.setFormGroupValuesInAddedFormControls();
    }
}

