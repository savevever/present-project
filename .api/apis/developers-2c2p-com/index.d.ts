import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    auth(...values: string[] | number[]): this;
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    server(url: string, variables?: {}): void;
    postPayment43ApplepayMerchantvalidation(body: types.PostPayment43ApplepayMerchantvalidationBodyParam): Promise<FetchResponse<200, types.PostPayment43ApplepayMerchantvalidationResponse200>>;
    postPayment43CacheCleancache(): Promise<FetchResponse<number, unknown>>;
    postPayment43Canceltransaction(body: types.PostPayment43CanceltransactionBodyParam): Promise<FetchResponse<200, types.PostPayment43CanceltransactionResponse200>>;
    postPayment43Cardinstallmentplaninfo(body: types.PostPayment43CardinstallmentplaninfoBodyParam): Promise<FetchResponse<200, types.PostPayment43CardinstallmentplaninfoResponse200>>;
    postPayment43Cardtokeninfo(body: types.PostPayment43CardtokeninfoBodyParam): Promise<FetchResponse<200, types.PostPayment43CardtokeninfoResponse200>>;
    postPayment43Exchangerate(body: types.PostPayment43ExchangerateBodyParam): Promise<FetchResponse<200, types.PostPayment43ExchangerateResponse200>>;
    /**
     * JWT Request Endpoint
     *
     */
    postPayment43ExchangerateSecure(body?: types.PostPayment43ExchangerateSecureBodyParam): Promise<FetchResponse<200, types.PostPayment43ExchangerateSecureResponse200>>;
    /**
     * APM MCC Exchange Rate
     *
     */
    postPayment43ExchangerateApmmccexchangerate(body: types.PostPayment43ExchangerateApmmccexchangerateBodyParam): Promise<FetchResponse<200, types.PostPayment43ExchangerateApmmccexchangerateResponse200>>;
    postPayment43Initialization(): Promise<FetchResponse<200, types.PostPayment43InitializationResponse200>>;
    postPayment43Loyaltypointinfo(body: types.PostPayment43LoyaltypointinfoBodyParam): Promise<FetchResponse<200, types.PostPayment43LoyaltypointinfoResponse200>>;
    postPayment43Payment(body: types.PostPayment43PaymentBodyParam): Promise<FetchResponse<200, types.PostPayment43PaymentResponse200>>;
    postPayment43Paymentinquiry(body?: types.PostPayment43PaymentinquiryBodyParam): Promise<FetchResponse<200, types.PostPayment43PaymentinquiryResponse200>>;
    postPayment43Paymentinstruction(body?: types.PostPayment43PaymentinstructionBodyParam): Promise<FetchResponse<200, types.PostPayment43PaymentinstructionResponse200>>;
    postPayment43Paymentnotification(body: types.PostPayment43PaymentnotificationBodyParam): Promise<FetchResponse<200, types.PostPayment43PaymentnotificationResponse200>>;
    postPayment43Paymentoption(body: types.PostPayment43PaymentoptionBodyParam): Promise<FetchResponse<200, types.PostPayment43PaymentoptionResponse200>>;
    postPayment43Paymentoptiondetails(body: types.PostPayment43PaymentoptiondetailsBodyParam): Promise<FetchResponse<200, types.PostPayment43PaymentoptiondetailsResponse200>>;
    postPayment43Paymentsimulate(body?: types.PostPayment43PaymentsimulateBodyParam): Promise<FetchResponse<200, types.PostPayment43PaymentsimulateResponse200>>;
    postPayment43Paymenttoken(body?: types.PostPayment43PaymenttokenBodyParam): Promise<FetchResponse<200, types.PostPayment43PaymenttokenResponse200>>;
    postPayment43Redirectbackend(body?: types.PostPayment43RedirectbackendBodyParam): Promise<FetchResponse<number, unknown>>;
    postPayment43Redirectfrontend(body?: types.PostPayment43RedirectfrontendBodyParam): Promise<FetchResponse<number, unknown>>;
    postPayment43Transactionstatus(body: types.PostPayment43TransactionstatusBodyParam): Promise<FetchResponse<200, types.PostPayment43TransactionstatusResponse200>>;
    postPayment43Userpreference(body: types.PostPayment43UserpreferenceBodyParam): Promise<FetchResponse<200, types.PostPayment43UserpreferenceResponse200>>;
}
declare const createSDK: SDK;
export = createSDK;
