/**
 * This file is generated by the SwaggerTSGenerator.
 * Do not edit.
*/
/* tslint:disable */

// generate enum based on strings instead of numbers
// (see https://blog.rsuter.com/how-to-implement-an-enum-with-string-values-in-typescript/)
export enum AccountTypes {
    Unknown = 0,
    Person = 1,
    LegalEntity = 2,
}

export enum RetailWalletAccessLevels {
    None = 0,
    Basic = 1,
    Full = 2,
}

export enum AssetTypes {
    NotSet = 0,
    BTC = 1,
    ETH = 2,
    XLM = 3,
    XTZ = 4,
    LINK = 5,
    CRO = 6,
    OMG = 7,
    BAT = 8,
    COMP = 9,
    DAI = 10,
    SNX = 11,
    EOS = 12,
    LTC = 13,
    AAVE = 14,
    DOT = 16,
    KSM = 17,
    ALGO = 18,
    CRV = 19,
    YFI = 20,
    ATOM = 21,
    MANA = 22,
    POLY = 23,
    LUNA = 24,
    EUR = 1001,
    USD = 1002,
}

export enum BulkResultItemStatus {
    NotSet = 0,
    Ok = 1,
    Failed = 10,
    Duplicate = 11,
}

export enum IssuerWalletRoles {
    Issuer = 1,
    Distributor = 2,
}

export enum WalletTransferStatus {
    New = 0,
    Pending = 1,
    Rejected = 2,
    Approved = 3,
    Sent = 4,
    Successful = 5,
    Failed = 6,
    TimedOut = 7,
}

export enum TransactionActions {
    TxNative = 1,
    TxAsset = 2,
    IssueAsset = 3,
    FreezeAsset = 4,
    ClawbackAssets = 5,
    OptIn = 6,
    AuthOptIn = 7,
    LockAccount = 8,
}

export enum OptInStatus {
    New = 0,
    Sent = 1,
    Failed = 2,
    Rejected = 3,
    Approved = 4,
    Revoked = 5,
    AuthorizationFailed = 6,
}

export enum Products {
    ETFWealthManagement = 100,
    RetailWallet = 101,
    CryptoWealthManagement = 102,
    Tokenization = 103,
}

export enum WalletType {
    NotSet = 0,
    Standard = 1,
    Issuer = 2,
    External = 3,
}

export enum WealthManagementProductType {
    AllWeather = 1,
    ValueSave = 2,
    AllWeatherGreen = 3,
    ValueSaveGreen = 4,
    Future = 5,
    Unknown = -1,
}

export enum WealthManagementPurposeType {
    NotSet = 0,
    SavingMoney = 1,
    IncreasingWealth = 2,
    FutureAssetGrowth = 3,
}

export enum WealthManagementHorizonType {
    NotSet = 0,
    Small = 1,
    Medium = 2,
    Large = 3,
}

export enum WealthManagementOnboardingGender {
    Male = 1,
    Female = 2,
    Unknown = 3,
}

export enum AccountMaritalStatus {
    NotSet = 0,
    Single = 1,
    Married = 2,
    CivilPartnership = 3,
}

export enum EmploymentType {
    NotSet = 0,
    Employee = 1,
    SelfEmployed = 2,
    Retired = 3,
    Private = 4,
}

export enum EducationType {
    NotSet = 0,
    Hochschulabschluss = 1,
    AbgeschlosseneAusbildung = 2,
    Abitur = 3,
    Fachhochschulreife = 4,
    MittlererSchulabschluss = 5,
    Hauptschulabschluss = 6,
    KeinSchulabschluss = 7,
}

export enum IndustryType {
    NotSet = 0,
    AgricultureForestryHunting = 1,
    Mining = 2,
    Glassware = 3,
    VanParts = 4,
    EnergySupply = 5,
    WaterSupply = 6,
    Construction = 7,
    MotorVehicles = 8,
    RetailTrade = 9,
    Warehousing = 10,
    Gastronomy = 11,
    InformationServices = 12,
    PropertyAndHousing = 13,
    ScientificActivities = 14,
    ProvisionBusinessEconomicServicesAndIndividuals = 15,
    PublicAdministration = 16,
    EducationAndTeaching = 17,
    Healthcare = 18,
    CreativeArtisticEntertainingActivities = 19,
    SportsEntertainmentRecreation = 20,
    EconomicallyDependentPrivateIndividuals = 21,
}

export enum WealthManagementInitialDebitType {
    NotSet = 0,
    Immediate = 1,
    InOneWeek = 2,
}

export enum PartnerBankType {
    BaaderBank = 100,
    Comdirect = 200,
    Dab = 300,
    Fondsdepot = 400,
    VBank = 500,
    NotSet = -100,
}

export enum EtfRole {
    Owner = 1,
    CoOwner = 2,
    AuthorisedPerson = 3,
}

export enum SepaExportTransactionStatus {
    Pending = 100,
    Submitted = 200,
    Processed = 300,
    Cancelled = 400,
}

export enum EtfPayoutRequestStatus {
    CreatedByAdmin = 100,
    RequestedByCustomer = 200,
}

export enum WealthManagementPaymentType {
    Deposit = 1,
    RecurringDeposit = 2,
    Withdrawal = 3,
}

export enum SepaExportTransactionType {
    PayIn = 1,
    PayInRecurring = 2,
    PayOut = 3,
    PayOutRecurring = 4,
    Fee = 5,
    InitialPayIn = 6,
}


/**
 * bundle of all enums for databinding to options, radio-buttons etc.
 * usage in component:
 *   import { AllEnums, minValueValidator, maxValueValidator } from '../../models/webapi';
 *
 *   @Component({
 *       ...
 *   })
 *   export class xxxComponent implements OnInit {
 *       allEnums = AllEnums;
 *       ...
 *       ngOnInit() {
 *           this.allEnums = AllEnums.instance;
 *       }
 *   }
*/
export class AllEnums {
    private static _instance: AllEnums = new AllEnums();
    constructor() {
        if (AllEnums._instance) {
            throw new Error("Error: Instantiation failed: Use AllEnums.instance instead of new");
        }
        AllEnums._instance = this;
    }
    static get instance(): AllEnums {
        return AllEnums._instance;
    }

    AccountTypes = AccountTypes;
    RetailWalletAccessLevels = RetailWalletAccessLevels;
    AssetTypes = AssetTypes;
    BulkResultItemStatus = BulkResultItemStatus;
    IssuerWalletRoles = IssuerWalletRoles;
    WalletTransferStatus = WalletTransferStatus;
    TransactionActions = TransactionActions;
    OptInStatus = OptInStatus;
    Products = Products;
    WalletType = WalletType;
    WealthManagementProductType = WealthManagementProductType;
    WealthManagementPurposeType = WealthManagementPurposeType;
    WealthManagementHorizonType = WealthManagementHorizonType;
    WealthManagementOnboardingGender = WealthManagementOnboardingGender;
    AccountMaritalStatus = AccountMaritalStatus;
    EmploymentType = EmploymentType;
    EducationType = EducationType;
    IndustryType = IndustryType;
    WealthManagementInitialDebitType = WealthManagementInitialDebitType;
    PartnerBankType = PartnerBankType;
    EtfRole = EtfRole;
    SepaExportTransactionStatus = SepaExportTransactionStatus;
    EtfPayoutRequestStatus = EtfPayoutRequestStatus;
    WealthManagementPaymentType = WealthManagementPaymentType;
    SepaExportTransactionType = SepaExportTransactionType;
}
