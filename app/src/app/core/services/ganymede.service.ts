import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import {
    CustomerAccountDtoListApiResponse,
    CreateCustomerAccountDto,
    GuidApiResponse,
    CustomerAccountDtoApiResponse,
    UpdateCustomerAccountDto,
    KycDataDto,
    BooleanApiResponse,
    ElectronicSecurityBasicInfoDtoApiResponse,
    BulkCreateTrustLineDto,
    BulkResultDtoApiResponse,
    RequestFaucetFundingDto,
    WalletFundingResultsDtoApiResponse,
    IssuerWalletSeedDtoListApiResponse,
    CreateIssuerWalletSeedDto,
    IssuerWalletSeedDtoApiResponse,
    DeriveIssuerWalletFromSeedDto,
    IssuerWalletRecoveryKitFileDtoApiResponse,
    EmptyResult,
    IssuerWalletDtoListApiResponse,
    InitTokenizedAssetCreationDto,
    SimpleAccessCredentialsDto,
    TokenizedAssetDtoApiResponse,
    TokenizedAssetDetailsDtoApiResponse,
    IssuerWalletTokenizedAssetTransferDto,
    IssuerWalletFungibleAssetTransferDto,
    ToggleOptInAuthorizationDto,
    TokenizedAssetClawbackDto,
    TokenizedAssetBurnDto,
    MissingModelsContainer,
    RetailWalletDtoListApiResponse,
    RetailWalletDtoApiResponse,
    RetailWalletOptInDto,
    LockWalletsDto,
    RetailWalletSeedRecoveryDtoApiResponse,
    ResetRetailWalletAccessCredentialsDto,
    RetailWalletRecoveryKitFileDtoApiResponse,
    ExternalRetailWalletDtoListApiResponse,
    ImportExternalRetailWalletDto,
    AuthenticatedInstitutionDtoApiResponse,
    ExtTradeOrderDto,
    TransactionToShowDtoListApiResponse,
    CancelTransactionsDto,
    Int32ApiResponse,
} from '../models';

@Injectable({
    providedIn: 'root'
})
export class CustomApiService {
    constructor(private apiService: ApiService) { }

    getCustomerGetCustomers = (queryParams: string = null, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<CustomerAccountDtoListApiResponse> => this.apiService.get<CustomerAccountDtoListApiResponse>(queryParams ? `/api/external/v1/customers?${queryParams}` : `/api/external/v1/customers`, showLoading, handleErrorGlobally);
    postCustomerCreateCustomer = (data: CreateCustomerAccountDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<GuidApiResponse> => this.apiService.post<CreateCustomerAccountDto, GuidApiResponse>(`/api/external/v1/customers`, data, showLoading, handleErrorGlobally);
    getCustomerQueryCustomers = (queryParams: string = null, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<CustomerAccountDtoListApiResponse> => this.apiService.get<CustomerAccountDtoListApiResponse>(queryParams ? `/api/external/v1/search?${queryParams}` : `/api/external/v1/search`, showLoading, handleErrorGlobally);
    getCustomerGetCustomer = (customerid: string, queryParams: string = null, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<CustomerAccountDtoApiResponse> => this.apiService.get<CustomerAccountDtoApiResponse>(queryParams ? `/api/external/v1/customers/{customer-id}?${queryParams}` : `/api/external/v1/customers/${customerid}`, showLoading, handleErrorGlobally);
    putCustomerUpdateCustomer = (customerid: string, data: UpdateCustomerAccountDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<GuidApiResponse> => this.apiService.put<UpdateCustomerAccountDto, GuidApiResponse>(`/api/external/v1/customers/${customerid}`, data, showLoading, handleErrorGlobally);
    postCustomerSubmitCustomerKycData = (customerid: string, data: KycDataDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<BooleanApiResponse> => this.apiService.post<KycDataDto, BooleanApiResponse>(`/api/external/v1/customers/${customerid}/kyc`, data, showLoading, handleErrorGlobally);
    getElectronicSecurityGetAssetInfo = (assetid: string, queryParams: string = null, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<ElectronicSecurityBasicInfoDtoApiResponse> => this.apiService.get<ElectronicSecurityBasicInfoDtoApiResponse>(queryParams ? `/api/external/v1/electronic-security/{asset-id}?${queryParams}` : `/api/external/v1/electronic-security/${assetid}`, showLoading, handleErrorGlobally);
    postElectronicSecurityCreateTrustLines = (assetid: string, data: BulkCreateTrustLineDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<BulkResultDtoApiResponse> => this.apiService.post<BulkCreateTrustLineDto, BulkResultDtoApiResponse>(`/api/external/v1/electronic-security/${assetid}/trust-lines`, data, showLoading, handleErrorGlobally);
    postFaucetRequestWalletFunding = (data: RequestFaucetFundingDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<WalletFundingResultsDtoApiResponse> => this.apiService.post<RequestFaucetFundingDto, WalletFundingResultsDtoApiResponse>(`/api/external/v1/request-funding`, data, showLoading, handleErrorGlobally);
    getIssuerWalletGetIssuerWalletSeeds = (queryParams: string = null, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<IssuerWalletSeedDtoListApiResponse> => this.apiService.get<IssuerWalletSeedDtoListApiResponse>(queryParams ? `/api/external/v1/issuer-wallet-seeds?${queryParams}` : `/api/external/v1/issuer-wallet-seeds`, showLoading, handleErrorGlobally);
    postIssuerWalletCreateIssuerWalletSeed = (data: CreateIssuerWalletSeedDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<IssuerWalletSeedDtoApiResponse> => this.apiService.post<CreateIssuerWalletSeedDto, IssuerWalletSeedDtoApiResponse>(`/api/external/v1/issuer-wallet-seeds`, data, showLoading, handleErrorGlobally);
    putIssuerWalletDeriveNewIssuerWallet = (issuerwalletseedid: string, data: DeriveIssuerWalletFromSeedDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<GuidApiResponse> => this.apiService.put<DeriveIssuerWalletFromSeedDto, GuidApiResponse>(`/api/external/v1/issuer-wallet-seeds/${issuerwalletseedid}`, data, showLoading, handleErrorGlobally);
    deleteIssuerWalletDeleteIssuerWalletSeed = (issuerseedwalletid: string, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<IssuerWalletRecoveryKitFileDtoApiResponse> => this.apiService.delete<IssuerWalletRecoveryKitFileDtoApiResponse>(`/api/external/v1/issuer-wallet-seeds/${issuerseedwalletid}`, showLoading, handleErrorGlobally);
    postIssuerWalletInitiateIssuerWalletPassphraseRecovery = (issuerwalletseedid: string, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<EmptyResult> => this.apiService.post<any, EmptyResult>(`/api/external/v1/issuer-wallet-seeds/${issuerwalletseedid}/recovery`, {}, showLoading, handleErrorGlobally);
    getIssuerWalletGetIssuerWallets = (issuerwalletseedid: string, queryParams: string = null, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<IssuerWalletDtoListApiResponse> => this.apiService.get<IssuerWalletDtoListApiResponse>(queryParams ? `/api/external/v1/issuer-wallet-seeds/{issuer-wallet-seed-id}/issuer-wallets?${queryParams}` : `/api/external/v1/issuer-wallet-seeds/${issuerwalletseedid}/issuer-wallets`, showLoading, handleErrorGlobally);
    postTokenizedAssetsInitializeTokenizedAssetCreation = (issuerwalletseedid: string, issuerwalletid: string, data: InitTokenizedAssetCreationDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<GuidApiResponse> => this.apiService.post<InitTokenizedAssetCreationDto, GuidApiResponse>(`/api/external/v1/issuer-wallet-seeds/${issuerwalletseedid}/issuer-wallets/${issuerwalletid}/tokenzid-assets`, data, showLoading, handleErrorGlobally);
    putTokenizedAssetsCreateTokenizedAsset = (issuerwalletseedid: string, issuerwalletid: string, tokenizedassetid: string, data: SimpleAccessCredentialsDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<TokenizedAssetDtoApiResponse> => this.apiService.put<SimpleAccessCredentialsDto, TokenizedAssetDtoApiResponse>(`/api/external/v1/issuer-wallet-seeds/${issuerwalletseedid}/issuer-wallets/${issuerwalletid}/tokenzid-assets/${tokenizedassetid}`, data, showLoading, handleErrorGlobally);
    getTokenizedAssetsGetTokenizedAssetDetails = (issuerwalletseedid: string, issuerwalletid: string, tokenizedassetid: string, queryParams: string = null, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<TokenizedAssetDetailsDtoApiResponse> => this.apiService.get<TokenizedAssetDetailsDtoApiResponse>(queryParams ? `/api/external/v1/issuer-wallet-seeds/{issuer-wallet-seed-id}/issuer-wallets/{issuer-wallet-id}/tokenzid-assets/{tokenized-asset-id}?${queryParams}` : `/api/external/v1/issuer-wallet-seeds/${issuerwalletseedid}/issuer-wallets/${issuerwalletid}/tokenzid-assets/${tokenizedassetid}`, showLoading, handleErrorGlobally);
    postTokenizedAssetsTransferTokenizedAssets = (issuerwalletseedid: string, issuerwalletid: string, tokenizedassetid: string, data: IssuerWalletTokenizedAssetTransferDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<BooleanApiResponse> => this.apiService.post<IssuerWalletTokenizedAssetTransferDto, BooleanApiResponse>(`/api/external/v1/issuer-wallet-seeds/${issuerwalletseedid}/issuer-wallets/${issuerwalletid}/tokenzid-assets/${tokenizedassetid}/transfer`, data, showLoading, handleErrorGlobally);
    postTokenizedAssetsTransferFungibleAssets = (issuerwalletid: string, tokenizedassetid: string, data: IssuerWalletFungibleAssetTransferDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<BooleanApiResponse> => this.apiService.post<IssuerWalletFungibleAssetTransferDto, BooleanApiResponse>(`/api/external/v1/issuer-wallets/${issuerwalletid}/fungible-assets/${tokenizedassetid}/transfer`, data, showLoading, handleErrorGlobally);
    postTokenizedAssetsLockIssuerWallet = (issuerwalletseedid: string, issuerwalletid: string, data: SimpleAccessCredentialsDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<BooleanApiResponse> => this.apiService.post<SimpleAccessCredentialsDto, BooleanApiResponse>(`/api/external/v1/issuer-wallet-seeds/${issuerwalletseedid}/issuer-wallets/${issuerwalletid}/lock`, data, showLoading, handleErrorGlobally);
    postTokenizedAssetsAuthorizeOptIn = (issuerwalletseedid: string, issuerwalletid: string, tokenizedassetid: string, data: ToggleOptInAuthorizationDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<BooleanApiResponse> => this.apiService.post<ToggleOptInAuthorizationDto, BooleanApiResponse>(`/api/external/v1/issuer-wallet-seeds/${issuerwalletseedid}/issuer-wallets/${issuerwalletid}/tokenized-assets/${tokenizedassetid}/authorize-opt-in`, data, showLoading, handleErrorGlobally);
    postTokenizedAssetsRevokeOptIn = (issuerwalletseedid: string, issuerwalletid: string, tokenizedassetid: string, data: ToggleOptInAuthorizationDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<BooleanApiResponse> => this.apiService.post<ToggleOptInAuthorizationDto, BooleanApiResponse>(`/api/external/v1/issuer-wallet-seeds/${issuerwalletseedid}/issuer-wallets/${issuerwalletid}/tokenized-assets/${tokenizedassetid}/revoke-opt-in`, data, showLoading, handleErrorGlobally);
    postTokenizedAssetsClawbackAsset = (issuerwalletseedid: string, issuerwalletid: string, tokenizedassetid: string, data: TokenizedAssetClawbackDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<BooleanApiResponse> => this.apiService.post<TokenizedAssetClawbackDto, BooleanApiResponse>(`/api/external/v1/issuer-wallet-seeds/${issuerwalletseedid}/issuer-wallets/${issuerwalletid}/tokenized-assets/${tokenizedassetid}/clawback-asset`, data, showLoading, handleErrorGlobally);
    postTokenizedAssetsBurnAsset = (issuerwalletseedid: string, issuerwalletid: string, tokenizedassetid: string, data: TokenizedAssetBurnDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<BooleanApiResponse> => this.apiService.post<TokenizedAssetBurnDto, BooleanApiResponse>(`/api/external/v1/issuer-wallet-seeds/${issuerwalletseedid}/issuer-wallets/${issuerwalletid}/tokenized-assets/${tokenizedassetid}/burn-asset`, data, showLoading, handleErrorGlobally);
    postTokenizedAssetsBuildAndSubmitMetadaFile = (issuerwalletseedid: string, issuerwalletid: string, tokenizedassetid: string, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<BooleanApiResponse> => this.apiService.post<any, BooleanApiResponse>(`/api/external/v1/issuer-wallet-seeds/${issuerwalletseedid}/issuer-wallets/${issuerwalletid}/tokenized-assets/${tokenizedassetid}/metadata`, {}, showLoading, handleErrorGlobally);
    getIssuerWalletMissingModels = (queryParams: string = null, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<MissingModelsContainer> => this.apiService.get<MissingModelsContainer>(queryParams ? `/api/external/v1/model?${queryParams}` : `/api/external/v1/model`, showLoading, handleErrorGlobally);
    getRetailWalletGetRetailWalletsDetails = (customerid: string, queryParams: string = null, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<RetailWalletDtoListApiResponse> => this.apiService.get<RetailWalletDtoListApiResponse>(queryParams ? `/api/external/v1/customers/{customer-id}/retail-wallets?${queryParams}` : `/api/external/v1/customers/${customerid}/retail-wallets`, showLoading, handleErrorGlobally);
    postRetailWalletInitiateRetailWallet = (customerid: string, data: SimpleAccessCredentialsDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<RetailWalletDtoListApiResponse> => this.apiService.post<SimpleAccessCredentialsDto, RetailWalletDtoListApiResponse>(`/api/external/v1/customers/${customerid}/retail-wallets`, data, showLoading, handleErrorGlobally);
    putRetailWalletDeriveRetailWallet = (customerid: string, blockchain: number, data: SimpleAccessCredentialsDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<RetailWalletDtoApiResponse> => this.apiService.put<SimpleAccessCredentialsDto, RetailWalletDtoApiResponse>(`/api/external/v1/customers/${customerid}/retail-wallets/${blockchain}`, data, showLoading, handleErrorGlobally);
    postRetailWalletOptInWithRetailWallet = (customerid: string, retailwalletid: string, data: RetailWalletOptInDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<BooleanApiResponse> => this.apiService.post<RetailWalletOptInDto, BooleanApiResponse>(`/api/external/v1/customers/${customerid}/retail-wallets/${retailwalletid}/opt-in`, data, showLoading, handleErrorGlobally);
    putRetailWalletLockRetailWallets = (customerid: string, data: LockWalletsDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<BooleanApiResponse> => this.apiService.put<LockWalletsDto, BooleanApiResponse>(`/api/external/v1/customers/${customerid}/retail-wallets/lock`, data, showLoading, handleErrorGlobally);
    postRetailWalletCheckRetailWalletPassphrase = (customerid: string, data: SimpleAccessCredentialsDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<BooleanApiResponse> => this.apiService.post<SimpleAccessCredentialsDto, BooleanApiResponse>(`/api/external/v1/customers/${customerid}/retail-wallets/check-passphrase`, data, showLoading, handleErrorGlobally);
    postRetailWalletInitiateRetailWalletPassphraseRecovery = (customerid: string, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<RetailWalletSeedRecoveryDtoApiResponse> => this.apiService.post<any, RetailWalletSeedRecoveryDtoApiResponse>(`/api/external/v1/customers/${customerid}/retail-wallets/recovery`, {}, showLoading, handleErrorGlobally);
    putRetailWalletRecoverRetailWalletSeedAccess = (customerid: string, data: ResetRetailWalletAccessCredentialsDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<BooleanApiResponse> => this.apiService.put<ResetRetailWalletAccessCredentialsDto, BooleanApiResponse>(`/api/external/v1/customers/${customerid}/retail-wallets/recovery`, data, showLoading, handleErrorGlobally);
    postRetailWalletDeleteRetailWallets = (customerid: string, data: SimpleAccessCredentialsDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<RetailWalletRecoveryKitFileDtoApiResponse> => this.apiService.post<SimpleAccessCredentialsDto, RetailWalletRecoveryKitFileDtoApiResponse>(`/api/external/v1/customers/${customerid}/delete-retail-wallets`, data, showLoading, handleErrorGlobally);
    getExternalRetailWalletGetExternalRetailWallet = (queryParams: string = null, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<ExternalRetailWalletDtoListApiResponse> => this.apiService.get<ExternalRetailWalletDtoListApiResponse>(queryParams ? `/api/external/v1/retail-wallets/external?${queryParams}` : `/api/external/v1/retail-wallets/external`, showLoading, handleErrorGlobally);
    postExternalRetailWalletCreateExternalRetailWallet = (data: ImportExternalRetailWalletDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<BooleanApiResponse> => this.apiService.post<ImportExternalRetailWalletDto, BooleanApiResponse>(`/api/external/v1/retail-wallets/external`, data, showLoading, handleErrorGlobally);
    getStatusGet = (queryParams: string = null, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<any> => this.apiService.get<any>(queryParams ? `/api/external/v1/status?${queryParams}` : `/api/external/v1/status`, showLoading, handleErrorGlobally);
    getStatusGetAuth = (queryParams: string = null, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<AuthenticatedInstitutionDtoApiResponse> => this.apiService.get<AuthenticatedInstitutionDtoApiResponse>(queryParams ? `/api/external/v1/status/auth?${queryParams}` : `/api/external/v1/status/auth`, showLoading, handleErrorGlobally);
    postTradingCreateTradeOrder = (data: ExtTradeOrderDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<BooleanApiResponse> => this.apiService.post<ExtTradeOrderDto, BooleanApiResponse>(`/api/ext/v1/create-trade-order`, data, showLoading, handleErrorGlobally);
    getTransactionGetTransactions = (days: number, queryParams: string = null, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<TransactionToShowDtoListApiResponse> => this.apiService.get<TransactionToShowDtoListApiResponse>(queryParams ? `/api/external/v1/transactions/${days}?${queryParams}` : `/api/external/v1/transactions/${days}`, showLoading, handleErrorGlobally);
    postTransactionCancelTransactions = (data: CancelTransactionsDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<Int32ApiResponse> => this.apiService.post<CancelTransactionsDto, Int32ApiResponse>(`/api/external/v1/cancel-transactions`, data, showLoading, handleErrorGlobally);
}
