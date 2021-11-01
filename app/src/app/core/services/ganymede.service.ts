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
    SimpleAccessCredentialsDto,
    IssuerWalletRecoveryKitFileDtoApiResponse,
    EmptyResult,
    IssuerWalletDtoListApiResponse,
    CreateTokenizedAssetDto,
    TokenizedAssetDtoApiResponse,
    TokenizedAssetDetailsDtoApiResponse,
    IssuerWalletTokenizedAssetTransferDto,
    ToggleOptInAuthorizationDto,
    TokenizedAssetClawbackDto,
    TokenizedAssetBurnDto,
    RetailWalletDtoListApiResponse,
    RetailWalletRecoveryKitFileDtoApiResponse,
    RetailWalletOptInDto,
    LockRetailWalletsDto,
    RetailWalletSeedRecoveryDtoApiResponse,
    ResetRetailWalletAccessCredentialsDto,
    AuthenticatedInstitutionDtoApiResponse,
    WalletBasicInfoDtoApiResponse,
    DeleteWalletDto,
    StringApiResponse,
    BulkCreateWalletDto,
    ExternalWalletDto,
    ExternalWalletResponseDtoApiResponse,
    WalletPasswordRecoveryDto,
    FileResponseDtoApiResponse,
    CreateEtfOnboardingDto,
    WealthManagementOverviewDtoApiResponse,
    EtfDtoApiResponse,
    DepotPaymentSummaryDtoApiResponse,
    CancelPendingDepotPaymentDto,
    CreateDepotDepositDto,
    CreateDepotWithdrawalDto,
    SepaTransactionDtoIEnumerableApiResponse,
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
    deleteIssuerWalletDeleteIssuerWalletSeed = (issuerseedwalletid: string, data: SimpleAccessCredentialsDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<IssuerWalletRecoveryKitFileDtoApiResponse> => this.apiService.delete<IssuerWalletRecoveryKitFileDtoApiResponse>(`/api/external/v1/issuer-wallet-seeds/${issuerseedwalletid}`, showLoading, handleErrorGlobally);
    postIssuerWalletInitiateIssuerWalletPassphraseRecovery = (issuerwalletseedid: string, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<EmptyResult> => this.apiService.post<any, EmptyResult>(`/api/external/v1/issuer-wallet-seeds/${issuerwalletseedid}/recovery`, {}, showLoading, handleErrorGlobally);
    getIssuerWalletGetIssuerWallets = (issuerwalletseedid: string, queryParams: string = null, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<IssuerWalletDtoListApiResponse> => this.apiService.get<IssuerWalletDtoListApiResponse>(queryParams ? `/api/external/v1/issuer-wallet-seeds/{issuer-wallet-seed-id}/issuer-wallets?${queryParams}` : `/api/external/v1/issuer-wallet-seeds/${issuerwalletseedid}/issuer-wallets`, showLoading, handleErrorGlobally);
    postTokenizedAssetsCreateTokenizedAsset = (issuerwalletseedid: string, issuerwalletid: string, data: CreateTokenizedAssetDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<TokenizedAssetDtoApiResponse> => this.apiService.post<CreateTokenizedAssetDto, TokenizedAssetDtoApiResponse>(`/api/external/v1/issuer-wallet-seeds/${issuerwalletseedid}/issuer-wallets/${issuerwalletid}/tokenzid-assets`, data, showLoading, handleErrorGlobally);
    getTokenizedAssetsGetTokenizedAssetDetails = (issuerwalletseedid: string, issuerwalletid: string, tokenizedassetid: string, queryParams: string = null, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<TokenizedAssetDetailsDtoApiResponse> => this.apiService.get<TokenizedAssetDetailsDtoApiResponse>(queryParams ? `/api/external/v1/issuer-wallet-seeds/{issuer-wallet-seed-id}/issuer-wallets/{issuer-wallet-id}/tokenzid-assets/{tokenized-asset-id}?${queryParams}` : `/api/external/v1/issuer-wallet-seeds/${issuerwalletseedid}/issuer-wallets/${issuerwalletid}/tokenzid-assets/${tokenizedassetid}`, showLoading, handleErrorGlobally);
    postTokenizedAssetsTransferTokenizedAssets = (issuerwalletseedid: string, issuerwalletid: string, tokenizedassetid: string, data: IssuerWalletTokenizedAssetTransferDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<BooleanApiResponse> => this.apiService.post<IssuerWalletTokenizedAssetTransferDto, BooleanApiResponse>(`/api/external/v1/issuer-wallet-seeds/${issuerwalletseedid}/issuer-wallets/${issuerwalletid}/tokenzid-assets/${tokenizedassetid}/transfer`, data, showLoading, handleErrorGlobally);
    postTokenizedAssetsLockIssuerWallet = (issuerwalletseedid: string, issuerwalletid: string, data: SimpleAccessCredentialsDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<BooleanApiResponse> => this.apiService.post<SimpleAccessCredentialsDto, BooleanApiResponse>(`/api/external/v1/issuer-wallet-seeds/${issuerwalletseedid}/issuer-wallets/${issuerwalletid}/lock`, data, showLoading, handleErrorGlobally);
    postTokenizedAssetsAuthorizeOptIn = (issuerwalletseedid: string, issuerwalletid: string, tokenizedassetid: string, data: ToggleOptInAuthorizationDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<BooleanApiResponse> => this.apiService.post<ToggleOptInAuthorizationDto, BooleanApiResponse>(`/api/external/v1/issuer-wallet-seeds/${issuerwalletseedid}/issuer-wallets/${issuerwalletid}/tokenized-assets/${tokenizedassetid}/authorize-opt-in`, data, showLoading, handleErrorGlobally);
    postTokenizedAssetsRevokeOptIn = (issuerwalletseedid: string, issuerwalletid: string, tokenizedassetid: string, data: ToggleOptInAuthorizationDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<BooleanApiResponse> => this.apiService.post<ToggleOptInAuthorizationDto, BooleanApiResponse>(`/api/external/v1/issuer-wallet-seeds/${issuerwalletseedid}/issuer-wallets/${issuerwalletid}/tokenized-assets/${tokenizedassetid}/revoke-opt-in`, data, showLoading, handleErrorGlobally);
    postTokenizedAssetsClawbackAsset = (issuerwalletseedid: string, issuerwalletid: string, tokenizedassetid: string, data: TokenizedAssetClawbackDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<BooleanApiResponse> => this.apiService.post<TokenizedAssetClawbackDto, BooleanApiResponse>(`/api/external/v1/issuer-wallet-seeds/${issuerwalletseedid}/issuer-wallets/${issuerwalletid}/tokenized-assets/${tokenizedassetid}/clawback-asset`, data, showLoading, handleErrorGlobally);
    postTokenizedAssetsBurnAsset = (issuerwalletseedid: string, issuerwalletid: string, tokenizedassetid: string, data: TokenizedAssetBurnDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<BooleanApiResponse> => this.apiService.post<TokenizedAssetBurnDto, BooleanApiResponse>(`/api/external/v1/issuer-wallet-seeds/${issuerwalletseedid}/issuer-wallets/${issuerwalletid}/tokenized-assets/${tokenizedassetid}/burn-asset`, data, showLoading, handleErrorGlobally);
    getRetailWalletGetRetailWalletsDetails = (customerid: string, queryParams: string = null, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<RetailWalletDtoListApiResponse> => this.apiService.get<RetailWalletDtoListApiResponse>(queryParams ? `/api/external/v1/customers/{customer-id}/retail-wallets?${queryParams}` : `/api/external/v1/customers/${customerid}/retail-wallets`, showLoading, handleErrorGlobally);
    postRetailWalletInitiateRetailWallet = (customerid: string, data: SimpleAccessCredentialsDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<RetailWalletDtoListApiResponse> => this.apiService.post<SimpleAccessCredentialsDto, RetailWalletDtoListApiResponse>(`/api/external/v1/customers/${customerid}/retail-wallets`, data, showLoading, handleErrorGlobally);
    deleteRetailWalletDeleteRetailWallets = (customerid: string, data: SimpleAccessCredentialsDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<RetailWalletRecoveryKitFileDtoApiResponse> => this.apiService.delete<RetailWalletRecoveryKitFileDtoApiResponse>(`/api/external/v1/customers/${customerid}/retail-wallets`, showLoading, handleErrorGlobally);
    postRetailWalletOptInWithRetailWallet = (customerid: string, retailwalletid: string, data: RetailWalletOptInDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<BooleanApiResponse> => this.apiService.post<RetailWalletOptInDto, BooleanApiResponse>(`/api/external/v1/customers/${customerid}/retail-wallets/${retailwalletid}/opt-in`, data, showLoading, handleErrorGlobally);
    putRetailWalletLockRetailWallets = (customerid: string, data: LockRetailWalletsDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<BooleanApiResponse> => this.apiService.put<LockRetailWalletsDto, BooleanApiResponse>(`/api/external/v1/customers/${customerid}/retail-wallets/lock`, data, showLoading, handleErrorGlobally);
    postRetailWalletInitiateRetailWalletPassphraseRecovery = (customerid: string, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<RetailWalletSeedRecoveryDtoApiResponse> => this.apiService.post<any, RetailWalletSeedRecoveryDtoApiResponse>(`/api/external/v1/customers/${customerid}/retail-wallets/recovery`, {}, showLoading, handleErrorGlobally);
    putRetailWalletRecoverRetailWalletSeedAccess = (customerid: string, data: ResetRetailWalletAccessCredentialsDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<BooleanApiResponse> => this.apiService.put<ResetRetailWalletAccessCredentialsDto, BooleanApiResponse>(`/api/external/v1/customers/${customerid}/retail-wallets/recovery`, data, showLoading, handleErrorGlobally);
    getStatusGet = (queryParams: string = null, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<any> => this.apiService.get<any>(queryParams ? `/api/external/v1/status?${queryParams}` : `/api/external/v1/status`, showLoading, handleErrorGlobally);
    getStatusGetAuth = (queryParams: string = null, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<AuthenticatedInstitutionDtoApiResponse> => this.apiService.get<AuthenticatedInstitutionDtoApiResponse>(queryParams ? `/api/external/v1/status/auth?${queryParams}` : `/api/external/v1/status/auth`, showLoading, handleErrorGlobally);
    getDepricatedGetWalletBasicInfo = (customerid: string, queryParams: string = null, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<WalletBasicInfoDtoApiResponse> => this.apiService.get<WalletBasicInfoDtoApiResponse>(queryParams ? `/api/external/v1/customers/{customer-id}/wallets?${queryParams}` : `/api/external/v1/customers/${customerid}/wallets`, showLoading, handleErrorGlobally);
    putDepricatedDeleteWallet = (customerid: string, data: DeleteWalletDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<StringApiResponse> => this.apiService.put<DeleteWalletDto, StringApiResponse>(`/api/external/v1/customers/${customerid}/wallets/delete`, data, showLoading, handleErrorGlobally);
    postDepricatedBulkCreateWallet = (data: BulkCreateWalletDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<BulkResultDtoApiResponse> => this.apiService.post<BulkCreateWalletDto, BulkResultDtoApiResponse>(`/api/external/v1/wallets`, data, showLoading, handleErrorGlobally);
    postDepricatedCreateExternalWallet = (customerid: string, data: ExternalWalletDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<ExternalWalletResponseDtoApiResponse> => this.apiService.post<ExternalWalletDto, ExternalWalletResponseDtoApiResponse>(`/api/external/v1/customers/${customerid}/wallets/external`, data, showLoading, handleErrorGlobally);
    putDepricatedRecoverWalletPassword = (customerid: string, data: WalletPasswordRecoveryDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<StringApiResponse> => this.apiService.put<WalletPasswordRecoveryDto, StringApiResponse>(`/api/external/v1/customers/${customerid}/wallets/recoverpassword`, data, showLoading, handleErrorGlobally);
    getDepricatedGetWalletRecoveryKit = (customerid: string, queryParams: string = null, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<FileResponseDtoApiResponse> => this.apiService.get<FileResponseDtoApiResponse>(queryParams ? `/api/external/v1/customers/{customer-id}/wallets/recovery-kit?${queryParams}` : `/api/external/v1/customers/${customerid}/wallets/recovery-kit`, showLoading, handleErrorGlobally);
    postWealthManagementCreateWealthManagementOnboarding = (customerid: string, data: CreateEtfOnboardingDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<GuidApiResponse> => this.apiService.post<CreateEtfOnboardingDto, GuidApiResponse>(`/api/external/v1/customers/${customerid}/wealth-management/onboardings`, data, showLoading, handleErrorGlobally);
    getWealthManagementGetWealthManagementOverview = (customerid: string, queryParams: string = null, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<WealthManagementOverviewDtoApiResponse> => this.apiService.get<WealthManagementOverviewDtoApiResponse>(queryParams ? `/api/external/v1/customers/{customer-id}/wealth-management?${queryParams}` : `/api/external/v1/customers/${customerid}/wealth-management`, showLoading, handleErrorGlobally);
    getWealthManagementGetWealthManagementDepot = (customerid: string, depotid: string, queryParams: string = null, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<EtfDtoApiResponse> => this.apiService.get<EtfDtoApiResponse>(queryParams ? `/api/external/v1/customers/{customer-id}/wealth-management/depots/{depot-id}?${queryParams}` : `/api/external/v1/customers/${customerid}/wealth-management/depots/${depotid}`, showLoading, handleErrorGlobally);
    getWealthManagementGetDepotPayments = (customerid: string, depotid: string, queryParams: string = null, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<DepotPaymentSummaryDtoApiResponse> => this.apiService.get<DepotPaymentSummaryDtoApiResponse>(queryParams ? `/api/external/v1/customers/{customer-id}/wealth-management/depots/{depot-id}/payments?${queryParams}` : `/api/external/v1/customers/${customerid}/wealth-management/depots/${depotid}/payments`, showLoading, handleErrorGlobally);
    patchWealthManagementCancelPendingDepotPayment = (customerid: string, depotid: string, data: CancelPendingDepotPaymentDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<BooleanApiResponse> => this.apiService.patch<CancelPendingDepotPaymentDto, BooleanApiResponse>(`/api/external/v1/customers/${customerid}/wealth-management/depots/${depotid}/payments`, data, showLoading, handleErrorGlobally);
    postWealthManagementCreateDepotDeposit = (customerid: string, depotid: string, data: CreateDepotDepositDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<BooleanApiResponse> => this.apiService.post<CreateDepotDepositDto, BooleanApiResponse>(`/api/external/v1/customers/${customerid}/wealth-management/depots/${depotid}/payments/deposits`, data, showLoading, handleErrorGlobally);
    postWealthManagementCreateDepotWithdrawal = (customerid: string, depotid: string, data: CreateDepotWithdrawalDto, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<BooleanApiResponse> => this.apiService.post<CreateDepotWithdrawalDto, BooleanApiResponse>(`/api/external/v1/customers/${customerid}/wealth-management/depots/${depotid}/payments/withdrawals`, data, showLoading, handleErrorGlobally);
    getWealthManagementGetWealthManagementDocument = (customerid: string, documentid: string, queryParams: string = null, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<FileResponseDtoApiResponse> => this.apiService.get<FileResponseDtoApiResponse>(queryParams ? `/api/external/v1/customers/{customer-id}/wealth-management/documents/{document-id}?${queryParams}` : `/api/external/v1/customers/${customerid}/wealth-management/documents/${documentid}`, showLoading, handleErrorGlobally);
    getWealthManagementGetWealthManagementSepaTransactions = (queryParams: string = null, showLoading: boolean = true, handleErrorGlobally: boolean = true): Observable<SepaTransactionDtoIEnumerableApiResponse> => this.apiService.get<SepaTransactionDtoIEnumerableApiResponse>(queryParams ? `/api/external/v1/sepa-transactions?${queryParams}` : `/api/external/v1/sepa-transactions`, showLoading, handleErrorGlobally);
}
