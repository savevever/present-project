declare const PostPayment43ApplepayMerchantvalidation: {
    readonly body: {
        readonly required: readonly ["paymentToken"];
        readonly type: "object";
        readonly properties: {
            readonly validationUrl: {
                readonly type: readonly ["string", "null"];
            };
            readonly paymentToken: {
                readonly type: "string";
            };
            readonly locale: {
                readonly type: readonly ["string", "null"];
            };
            readonly clientID: {
                readonly type: "string";
                readonly format: "uuid";
            };
            readonly browserDetails: {
                readonly type: "object";
                readonly properties: {
                    readonly deviceType: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly name: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly os: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly version: {
                        readonly type: readonly ["string", "null"];
                    };
                };
                readonly additionalProperties: false;
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly epochTimestamp: {
                    readonly type: "integer";
                    readonly format: "int64";
                    readonly minimum: -9223372036854776000;
                    readonly maximum: 9223372036854776000;
                };
                readonly expiresAt: {
                    readonly type: "integer";
                    readonly format: "int64";
                    readonly minimum: -9223372036854776000;
                    readonly maximum: 9223372036854776000;
                };
                readonly merchantSessionIdentifier: {
                    readonly type: readonly ["string", "null"];
                };
                readonly nonce: {
                    readonly type: readonly ["string", "null"];
                };
                readonly merchantIdentifier: {
                    readonly type: readonly ["string", "null"];
                };
                readonly domainName: {
                    readonly type: readonly ["string", "null"];
                };
                readonly displayName: {
                    readonly type: readonly ["string", "null"];
                };
                readonly signature: {
                    readonly type: readonly ["string", "null"];
                };
                readonly operationalAnalyticsIdentifier: {
                    readonly type: readonly ["string", "null"];
                };
                readonly retries: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly pspId: {
                    readonly type: readonly ["string", "null"];
                };
                readonly respCode: {
                    readonly type: readonly ["string", "null"];
                };
                readonly respDesc: {
                    readonly type: readonly ["string", "null"];
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostPayment43Canceltransaction: {
    readonly body: {
        readonly required: readonly ["paymentToken"];
        readonly type: "object";
        readonly properties: {
            readonly paymentToken: {
                readonly type: "string";
            };
            readonly locale: {
                readonly type: readonly ["string", "null"];
            };
            readonly clientID: {
                readonly type: "string";
                readonly format: "uuid";
            };
            readonly browserDetails: {
                readonly type: "object";
                readonly properties: {
                    readonly deviceType: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly name: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly os: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly version: {
                        readonly type: readonly ["string", "null"];
                    };
                };
                readonly additionalProperties: false;
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly invoiceNo: {
                    readonly type: readonly ["string", "null"];
                };
                readonly channelCode: {
                    readonly type: readonly ["string", "null"];
                };
                readonly respCode: {
                    readonly type: readonly ["string", "null"];
                };
                readonly respDesc: {
                    readonly type: readonly ["string", "null"];
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostPayment43Cardinstallmentplaninfo: {
    readonly body: {
        readonly required: readonly ["paymentToken"];
        readonly type: "object";
        readonly properties: {
            readonly cardNo: {
                readonly type: readonly ["string", "null"];
            };
            readonly bankCode: {
                readonly type: readonly ["string", "null"];
            };
            readonly paymentToken: {
                readonly type: "string";
            };
            readonly locale: {
                readonly type: readonly ["string", "null"];
            };
            readonly clientID: {
                readonly type: "string";
                readonly format: "uuid";
            };
            readonly browserDetails: {
                readonly type: "object";
                readonly properties: {
                    readonly deviceType: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly name: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly os: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly version: {
                        readonly type: readonly ["string", "null"];
                    };
                };
                readonly additionalProperties: false;
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly totalChannel: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly name: {
                    readonly type: readonly ["string", "null"];
                };
                readonly categoryCode: {
                    readonly type: readonly ["string", "null"];
                };
                readonly groupCode: {
                    readonly type: readonly ["string", "null"];
                };
                readonly iconUrl: {
                    readonly type: readonly ["string", "null"];
                };
                readonly channels: {
                    readonly type: readonly ["array", "null"];
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly sequenceNo: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly name: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly bankShortName: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly currencyCodes: {
                                readonly type: readonly ["array", "null"];
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly iconUrl: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly logoUrl: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly payment: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly code: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly channelCode: {
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly agentCode: {
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly agentChannelCode: {
                                                readonly type: readonly ["string", "null"];
                                            };
                                        };
                                        readonly additionalProperties: false;
                                    };
                                    readonly input: {
                                        readonly type: readonly ["object", "null"];
                                        readonly additionalProperties: true;
                                    };
                                    readonly validation: {
                                        readonly type: readonly ["object", "null"];
                                        readonly additionalProperties: true;
                                    };
                                    readonly info: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly terms: {
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly promoUrl: {
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly plans: {
                                                readonly type: readonly ["array", "null"];
                                                readonly items: {
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly sequenceNo: {
                                                            readonly type: "integer";
                                                            readonly format: "int32";
                                                            readonly minimum: -2147483648;
                                                            readonly maximum: 2147483647;
                                                        };
                                                        readonly period: {
                                                            readonly type: "integer";
                                                            readonly format: "int32";
                                                            readonly minimum: -2147483648;
                                                            readonly maximum: 2147483647;
                                                        };
                                                        readonly interestType: {
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly interestRate: {
                                                            readonly type: "number";
                                                            readonly format: "double";
                                                            readonly minimum: -1.7976931348623157e+308;
                                                            readonly maximum: 1.7976931348623157e+308;
                                                        };
                                                        readonly monthlyAmount: {
                                                            readonly type: "number";
                                                            readonly format: "double";
                                                            readonly minimum: -1.7976931348623157e+308;
                                                            readonly maximum: 1.7976931348623157e+308;
                                                        };
                                                        readonly monthlyInterest: {
                                                            readonly type: "number";
                                                            readonly format: "double";
                                                            readonly minimum: -1.7976931348623157e+308;
                                                            readonly maximum: 1.7976931348623157e+308;
                                                        };
                                                        readonly currencyCode: {
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly label: {
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly terms: {
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly payLaterPeriod: {
                                                            readonly type: readonly ["integer", "null"];
                                                            readonly format: "int32";
                                                            readonly minimum: -2147483648;
                                                            readonly maximum: 2147483647;
                                                        };
                                                    };
                                                    readonly additionalProperties: false;
                                                };
                                            };
                                            readonly customData: {
                                                readonly type: readonly ["array", "null"];
                                                readonly items: {
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly sequenceNo: {
                                                            readonly type: "integer";
                                                            readonly format: "int32";
                                                            readonly minimum: -2147483648;
                                                            readonly maximum: 2147483647;
                                                        };
                                                        readonly type: {
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly data: {
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                    };
                                                    readonly additionalProperties: false;
                                                };
                                            };
                                            readonly provider: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly id: {
                                                        readonly type: readonly ["string", "null"];
                                                    };
                                                    readonly channels: {
                                                        readonly type: readonly ["array", "null"];
                                                        readonly items: {
                                                            readonly type: "string";
                                                        };
                                                    };
                                                    readonly merchantDetails: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly id: {
                                                                readonly type: readonly ["string", "null"];
                                                            };
                                                            readonly name: {
                                                                readonly type: readonly ["string", "null"];
                                                            };
                                                            readonly countryCode: {
                                                                readonly type: readonly ["string", "null"];
                                                            };
                                                        };
                                                        readonly additionalProperties: false;
                                                    };
                                                    readonly transactionDetails: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly amount: {
                                                                readonly type: "number";
                                                                readonly format: "double";
                                                                readonly minimum: -1.7976931348623157e+308;
                                                                readonly maximum: 1.7976931348623157e+308;
                                                            };
                                                            readonly currencyCode: {
                                                                readonly type: readonly ["string", "null"];
                                                            };
                                                            readonly invoiceNo: {
                                                                readonly type: readonly ["string", "null"];
                                                            };
                                                            readonly description: {
                                                                readonly type: readonly ["string", "null"];
                                                            };
                                                        };
                                                        readonly additionalProperties: false;
                                                    };
                                                    readonly terms: {
                                                        readonly type: readonly ["string", "null"];
                                                    };
                                                    readonly termsConsent: {
                                                        readonly type: "boolean";
                                                    };
                                                };
                                                readonly additionalProperties: false;
                                            };
                                            readonly learnMoreUrl: {
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly termsConsent: {
                                                readonly type: "boolean";
                                            };
                                        };
                                        readonly additionalProperties: false;
                                    };
                                };
                                readonly additionalProperties: false;
                            };
                            readonly isDown: {
                                readonly type: "boolean";
                            };
                            readonly checkEligibleOption: {
                                readonly type: "boolean";
                            };
                            readonly ippProviderCode: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly registrationStatus: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly partnerMerchantRefID: {
                                readonly type: readonly ["string", "null"];
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
                readonly validation: {
                    readonly type: "object";
                    readonly properties: {
                        readonly cardNo: {
                            readonly type: "object";
                            readonly properties: {
                                readonly prefixes: {
                                    readonly type: readonly ["array", "null"];
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                };
                                readonly regex: {
                                    readonly type: readonly ["string", "null"];
                                };
                            };
                            readonly additionalProperties: false;
                        };
                        readonly cardTypes: {
                            readonly type: readonly ["array", "null"];
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly sequenceNo: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly name: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly prefixes: {
                                        readonly type: readonly ["array", "null"];
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly regex: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly iconUrl: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                };
                                readonly additionalProperties: false;
                            };
                        };
                    };
                    readonly additionalProperties: false;
                };
                readonly configuration: {
                    readonly type: "object";
                    readonly properties: {
                        readonly payment: {
                            readonly type: "object";
                            readonly properties: {
                                readonly tokenize: {
                                    readonly type: "boolean";
                                };
                                readonly tokenizeOnly: {
                                    readonly type: "boolean";
                                };
                                readonly cardTokenOnly: {
                                    readonly type: "boolean";
                                };
                                readonly immediatePayment: {
                                    readonly type: "boolean";
                                };
                                readonly fx: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly mcp: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly active: {
                                                    readonly type: "boolean";
                                                };
                                                readonly terms: {
                                                    readonly type: readonly ["string", "null"];
                                                };
                                            };
                                            readonly additionalProperties: false;
                                        };
                                        readonly dcc: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly active: {
                                                    readonly type: "boolean";
                                                };
                                                readonly terms: {
                                                    readonly type: readonly ["string", "null"];
                                                };
                                            };
                                            readonly additionalProperties: false;
                                        };
                                        readonly apmMcc: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly active: {
                                                    readonly type: "boolean";
                                                };
                                                readonly terms: {
                                                    readonly type: readonly ["string", "null"];
                                                };
                                            };
                                            readonly additionalProperties: false;
                                        };
                                    };
                                    readonly additionalProperties: false;
                                };
                            };
                            readonly additionalProperties: false;
                        };
                        readonly notification: {
                            readonly type: "object";
                            readonly properties: {
                                readonly facebook: {
                                    readonly type: "boolean";
                                };
                                readonly whatsApp: {
                                    readonly type: "boolean";
                                };
                                readonly line: {
                                    readonly type: "boolean";
                                };
                            };
                            readonly additionalProperties: false;
                        };
                    };
                    readonly additionalProperties: false;
                };
                readonly respCode: {
                    readonly type: readonly ["string", "null"];
                };
                readonly respDesc: {
                    readonly type: readonly ["string", "null"];
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostPayment43Cardtokeninfo: {
    readonly body: {
        readonly required: readonly ["paymentToken"];
        readonly type: "object";
        readonly properties: {
            readonly paymentToken: {
                readonly type: "string";
            };
            readonly locale: {
                readonly type: readonly ["string", "null"];
            };
            readonly clientID: {
                readonly type: "string";
                readonly format: "uuid";
            };
            readonly browserDetails: {
                readonly type: "object";
                readonly properties: {
                    readonly deviceType: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly name: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly os: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly version: {
                        readonly type: readonly ["string", "null"];
                    };
                };
                readonly additionalProperties: false;
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly paymentToken: {
                    readonly type: readonly ["string", "null"];
                };
                readonly customerToken: {
                    readonly type: readonly ["array", "null"];
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly token: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly accountNo: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly name: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly email: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly expiry: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly channelCode: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly subChannelCode: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly cardBrand: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly status: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly iconUrl: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly logoUrl: {
                                readonly type: readonly ["string", "null"];
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
                readonly respCode: {
                    readonly type: readonly ["string", "null"];
                };
                readonly respDesc: {
                    readonly type: readonly ["string", "null"];
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostPayment43Exchangerate: {
    readonly body: {
        readonly required: readonly ["paymentToken"];
        readonly type: "object";
        readonly properties: {
            readonly bin: {
                readonly type: readonly ["string", "null"];
            };
            readonly paymentToken: {
                readonly type: "string";
            };
            readonly locale: {
                readonly type: readonly ["string", "null"];
            };
            readonly clientID: {
                readonly type: "string";
                readonly format: "uuid";
            };
            readonly browserDetails: {
                readonly type: "object";
                readonly properties: {
                    readonly deviceType: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly name: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly os: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly version: {
                        readonly type: readonly ["string", "null"];
                    };
                };
                readonly additionalProperties: false;
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly fxRates: {
                    readonly type: readonly ["array", "null"];
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly name: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly iconUrl: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly amount: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly sequenceNo: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly id: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly fx: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly currencyCode: {
                                readonly type: readonly ["string", "null"];
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
                readonly providerCode: {
                    readonly type: readonly ["string", "null"];
                };
                readonly expire: {
                    readonly type: readonly ["integer", "null"];
                    readonly format: "int64";
                    readonly minimum: -9223372036854776000;
                    readonly maximum: 9223372036854776000;
                };
                readonly paymentToken: {
                    readonly type: readonly ["string", "null"];
                };
                readonly respCode: {
                    readonly type: readonly ["string", "null"];
                };
                readonly respDesc: {
                    readonly type: readonly ["string", "null"];
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostPayment43ExchangerateApmmccexchangerate: {
    readonly body: {
        readonly required: readonly ["paymentToken"];
        readonly type: "object";
        readonly properties: {
            readonly paymentToken: {
                readonly type: "string";
            };
            readonly locale: {
                readonly type: readonly ["string", "null"];
            };
            readonly clientID: {
                readonly type: "string";
                readonly format: "uuid";
            };
            readonly browserDetails: {
                readonly type: "object";
                readonly properties: {
                    readonly deviceType: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly name: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly os: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly version: {
                        readonly type: readonly ["string", "null"];
                    };
                };
                readonly additionalProperties: false;
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly fxRates: {
                    readonly type: readonly ["array", "null"];
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly expire: {
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly sequenceNo: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly id: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly fx: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly currencyCode: {
                                readonly type: readonly ["string", "null"];
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
                readonly paymentToken: {
                    readonly type: readonly ["string", "null"];
                };
                readonly respCode: {
                    readonly type: readonly ["string", "null"];
                };
                readonly respDesc: {
                    readonly type: readonly ["string", "null"];
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostPayment43ExchangerateSecure: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly payload: {
                readonly type: readonly ["string", "null"];
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly payload: {
                    readonly type: readonly ["string", "null"];
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostPayment43Initialization: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly initialization: {
                    readonly type: "object";
                    readonly properties: {
                        readonly locale: {
                            readonly type: readonly ["array", "null"];
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly code: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly name: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly iconUrl: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                };
                                readonly additionalProperties: false;
                            };
                        };
                    };
                    readonly additionalProperties: false;
                };
                readonly respCode: {
                    readonly type: readonly ["string", "null"];
                };
                readonly respDesc: {
                    readonly type: readonly ["string", "null"];
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostPayment43Loyaltypointinfo: {
    readonly body: {
        readonly required: readonly ["paymentToken"];
        readonly type: "object";
        readonly properties: {
            readonly providerID: {
                readonly type: readonly ["string", "null"];
            };
            readonly profileID: {
                readonly type: readonly ["string", "null"];
            };
            readonly referenceID: {
                readonly type: readonly ["string", "null"];
            };
            readonly cardNo: {
                readonly type: readonly ["string", "null"];
            };
            readonly expiryMonth: {
                readonly type: readonly ["string", "null"];
            };
            readonly expiryYear: {
                readonly type: readonly ["string", "null"];
            };
            readonly paymentToken: {
                readonly type: "string";
            };
            readonly locale: {
                readonly type: readonly ["string", "null"];
            };
            readonly clientID: {
                readonly type: "string";
                readonly format: "uuid";
            };
            readonly browserDetails: {
                readonly type: "object";
                readonly properties: {
                    readonly deviceType: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly name: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly os: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly version: {
                        readonly type: readonly ["string", "null"];
                    };
                };
                readonly additionalProperties: false;
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly paymentToken: {
                    readonly type: readonly ["string", "null"];
                };
                readonly providerID: {
                    readonly type: readonly ["string", "null"];
                };
                readonly providerName: {
                    readonly type: readonly ["string", "null"];
                };
                readonly referenceID: {
                    readonly type: readonly ["string", "null"];
                };
                readonly providerType: {
                    readonly type: readonly ["string", "null"];
                };
                readonly terms: {
                    readonly type: readonly ["string", "null"];
                };
                readonly rewards: {
                    readonly type: readonly ["array", "null"];
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly sequenceNo: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly id: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly currencyCode: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly totalPoints: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly label: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly point: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly forceToSelectReward: {
                                readonly type: "boolean";
                            };
                            readonly name: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly type: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly amount: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly quantity: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly price: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
                readonly respCode: {
                    readonly type: readonly ["string", "null"];
                };
                readonly respDesc: {
                    readonly type: readonly ["string", "null"];
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostPayment43Payment: {
    readonly body: {
        readonly required: readonly ["paymentToken"];
        readonly type: "object";
        readonly properties: {
            readonly payment: {
                readonly type: "object";
                readonly properties: {
                    readonly data: {
                        readonly type: "object";
                        readonly properties: {
                            readonly accountTokenization: {
                                readonly type: "boolean";
                            };
                            readonly customerToken: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly name: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly email: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly mobileNo: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly accountNo: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly securePayToken: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly cardBank: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly cardCountry: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly installmentPeriod: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly payLaterPeriod: {
                                readonly type: readonly ["integer", "null"];
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly interestType: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly securityCode: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly qrType: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly fxRateID: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly billingAddress1: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly billingAddress2: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly billingAddress3: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly billingCity: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly billingState: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly billingPostalCode: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly billingCountryCode: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly paymentExpiry: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly cardNo: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly expiryMonth: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly expiryYear: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly pin: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly loyaltyPoints: {
                                readonly type: readonly ["array", "null"];
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly providerID: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly accountNo: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly accountAuthData: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly queryReferenceSpecified: {
                                            readonly type: "boolean";
                                            readonly readOnly: true;
                                        };
                                        readonly externalMerchantId: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly redeemAmount: {
                                            readonly type: "number";
                                            readonly format: "double";
                                            readonly minimum: -1.7976931348623157e+308;
                                            readonly maximum: 1.7976931348623157e+308;
                                        };
                                        readonly rewards: {
                                            readonly type: readonly ["array", "null"];
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly id: {
                                                        readonly type: readonly ["string", "null"];
                                                    };
                                                    readonly Quantity: {
                                                        readonly type: "number";
                                                        readonly format: "double";
                                                        readonly minimum: -1.7976931348623157e+308;
                                                        readonly maximum: 1.7976931348623157e+308;
                                                    };
                                                };
                                                readonly additionalProperties: false;
                                            };
                                        };
                                    };
                                    readonly additionalProperties: false;
                                };
                            };
                            readonly customerNote: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly userAgent: {
                                readonly type: readonly ["string", "null"];
                            };
                        };
                        readonly additionalProperties: false;
                    };
                    readonly code: {
                        readonly type: "object";
                        readonly properties: {
                            readonly channelCode: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly agentCode: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly agentChannelCode: {
                                readonly type: readonly ["string", "null"];
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
                readonly additionalProperties: false;
            };
            readonly responseReturnUrl: {
                readonly type: readonly ["string", "null"];
            };
            readonly clientIP: {
                readonly type: readonly ["string", "null"];
            };
            readonly paymentToken: {
                readonly type: "string";
            };
            readonly locale: {
                readonly type: readonly ["string", "null"];
            };
            readonly clientID: {
                readonly type: "string";
                readonly format: "uuid";
            };
            readonly browserDetails: {
                readonly type: "object";
                readonly properties: {
                    readonly deviceType: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly name: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly os: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly version: {
                        readonly type: readonly ["string", "null"];
                    };
                };
                readonly additionalProperties: false;
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly channelCode: {
                    readonly type: readonly ["string", "null"];
                };
                readonly respCode: {
                    readonly type: readonly ["string", "null"];
                };
                readonly respDesc: {
                    readonly type: readonly ["string", "null"];
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostPayment43Paymentinquiry: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly payload: {
                readonly type: readonly ["string", "null"];
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly payload: {
                    readonly type: readonly ["string", "null"];
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostPayment43Paymentinstruction: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly payload: {
                readonly type: readonly ["string", "null"];
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly payload: {
                    readonly type: readonly ["string", "null"];
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostPayment43Paymentnotification: {
    readonly body: {
        readonly required: readonly ["paymentToken"];
        readonly type: "object";
        readonly properties: {
            readonly plateform: {
                readonly type: readonly ["string", "null"];
            };
            readonly recipientID: {
                readonly type: readonly ["string", "null"];
            };
            readonly recipientName: {
                readonly type: readonly ["string", "null"];
            };
            readonly paymentToken: {
                readonly type: "string";
            };
            readonly locale: {
                readonly type: readonly ["string", "null"];
            };
            readonly clientID: {
                readonly type: "string";
                readonly format: "uuid";
            };
            readonly browserDetails: {
                readonly type: "object";
                readonly properties: {
                    readonly deviceType: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly name: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly os: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly version: {
                        readonly type: readonly ["string", "null"];
                    };
                };
                readonly additionalProperties: false;
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly respCode: {
                    readonly type: readonly ["string", "null"];
                };
                readonly respDesc: {
                    readonly type: readonly ["string", "null"];
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostPayment43Paymentoption: {
    readonly body: {
        readonly required: readonly ["paymentToken"];
        readonly type: "object";
        readonly properties: {
            readonly paymentToken: {
                readonly type: "string";
            };
            readonly locale: {
                readonly type: readonly ["string", "null"];
            };
            readonly clientID: {
                readonly type: "string";
                readonly format: "uuid";
            };
            readonly browserDetails: {
                readonly type: "object";
                readonly properties: {
                    readonly deviceType: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly name: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly os: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly version: {
                        readonly type: readonly ["string", "null"];
                    };
                };
                readonly additionalProperties: false;
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly paymentToken: {
                    readonly type: readonly ["string", "null"];
                };
                readonly merchantDetails: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly name: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly address: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly email: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly logoUrl: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly bannerUrl: {
                            readonly type: readonly ["string", "null"];
                        };
                    };
                    readonly additionalProperties: false;
                };
                readonly transactionDetails: {
                    readonly type: "object";
                    readonly properties: {
                        readonly amount: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly currencyCode: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly invoiceNo: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly description: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly recurring: {
                            readonly type: "object";
                            readonly properties: {
                                readonly amount: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly interval: {
                                    readonly type: "integer";
                                    readonly format: "int32";
                                    readonly minimum: -2147483648;
                                    readonly maximum: 2147483647;
                                };
                                readonly count: {
                                    readonly type: "integer";
                                    readonly format: "int32";
                                    readonly minimum: -2147483648;
                                    readonly maximum: 2147483647;
                                };
                                readonly chargeNextDate: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly chargeOnDate: {
                                    readonly type: readonly ["string", "null"];
                                };
                            };
                            readonly additionalProperties: false;
                        };
                        readonly dateTime: {
                            readonly type: readonly ["string", "null"];
                        };
                        readonly paymentItems: {
                            readonly type: readonly ["array", "null"];
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly code: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly name: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly quantity: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly price: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                };
                                readonly additionalProperties: false;
                            };
                        };
                        readonly showFxRate: {
                            readonly type: "boolean";
                        };
                    };
                    readonly additionalProperties: false;
                };
                readonly channelCategories: {
                    readonly type: readonly ["array", "null"];
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly groups: {
                                readonly type: readonly ["array", "null"];
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: readonly ["integer", "null"];
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                        readonly sequenceNo: {
                                            readonly type: "integer";
                                            readonly format: "int32";
                                            readonly minimum: -2147483648;
                                            readonly maximum: 2147483647;
                                        };
                                        readonly name: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly code: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly iconUrl: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly logoUrl: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly default: {
                                            readonly type: "boolean";
                                        };
                                        readonly channelCode: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly agentChannelCode: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly optionName: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly paymentCode: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly qrType: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly expirationTimer: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly expirationDescription: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly expiration: {
                                            readonly type: "boolean";
                                        };
                                    };
                                    readonly additionalProperties: false;
                                };
                            };
                            readonly id: {
                                readonly type: readonly ["integer", "null"];
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly sequenceNo: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly name: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly code: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly iconUrl: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly logoUrl: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly default: {
                                readonly type: "boolean";
                            };
                            readonly channelCode: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly agentChannelCode: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly optionName: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly paymentCode: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly qrType: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly expirationTimer: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly expirationDescription: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly expiration: {
                                readonly type: "boolean";
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
                readonly userDetails: {
                    readonly type: "object";
                    readonly properties: {
                        readonly address: {
                            readonly type: "object";
                            readonly properties: {
                                readonly billing: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly address1: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly address2: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly address3: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly postalCode: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly city: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly state: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly countryCode: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                    };
                                    readonly additionalProperties: false;
                                };
                                readonly shipping: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly address1: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly address2: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly address3: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly postalCode: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly city: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly state: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                        readonly countryCode: {
                                            readonly type: readonly ["string", "null"];
                                        };
                                    };
                                    readonly additionalProperties: false;
                                };
                            };
                            readonly additionalProperties: false;
                        };
                    };
                    readonly additionalProperties: false;
                };
                readonly respCode: {
                    readonly type: readonly ["string", "null"];
                };
                readonly respDesc: {
                    readonly type: readonly ["string", "null"];
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostPayment43Paymentoptiondetails: {
    readonly body: {
        readonly required: readonly ["categoryCode", "groupCode", "paymentToken"];
        readonly type: "object";
        readonly properties: {
            readonly categoryCode: {
                readonly type: "string";
            };
            readonly groupCode: {
                readonly type: "string";
            };
            readonly paymentToken: {
                readonly type: "string";
            };
            readonly locale: {
                readonly type: readonly ["string", "null"];
            };
            readonly clientID: {
                readonly type: "string";
                readonly format: "uuid";
            };
            readonly browserDetails: {
                readonly type: "object";
                readonly properties: {
                    readonly deviceType: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly name: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly os: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly version: {
                        readonly type: readonly ["string", "null"];
                    };
                };
                readonly additionalProperties: false;
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly totalChannel: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly name: {
                    readonly type: readonly ["string", "null"];
                };
                readonly categoryCode: {
                    readonly type: readonly ["string", "null"];
                };
                readonly groupCode: {
                    readonly type: readonly ["string", "null"];
                };
                readonly iconUrl: {
                    readonly type: readonly ["string", "null"];
                };
                readonly channels: {
                    readonly type: readonly ["array", "null"];
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly sequenceNo: {
                                readonly type: "integer";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly name: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly bankShortName: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly currencyCodes: {
                                readonly type: readonly ["array", "null"];
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly iconUrl: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly logoUrl: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly payment: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly code: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly channelCode: {
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly agentCode: {
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly agentChannelCode: {
                                                readonly type: readonly ["string", "null"];
                                            };
                                        };
                                        readonly additionalProperties: false;
                                    };
                                    readonly input: {
                                        readonly type: readonly ["object", "null"];
                                        readonly additionalProperties: true;
                                    };
                                    readonly validation: {
                                        readonly type: readonly ["object", "null"];
                                        readonly additionalProperties: true;
                                    };
                                    readonly info: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly terms: {
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly promoUrl: {
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly plans: {
                                                readonly type: readonly ["array", "null"];
                                                readonly items: {
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly sequenceNo: {
                                                            readonly type: "integer";
                                                            readonly format: "int32";
                                                            readonly minimum: -2147483648;
                                                            readonly maximum: 2147483647;
                                                        };
                                                        readonly period: {
                                                            readonly type: "integer";
                                                            readonly format: "int32";
                                                            readonly minimum: -2147483648;
                                                            readonly maximum: 2147483647;
                                                        };
                                                        readonly interestType: {
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly interestRate: {
                                                            readonly type: "number";
                                                            readonly format: "double";
                                                            readonly minimum: -1.7976931348623157e+308;
                                                            readonly maximum: 1.7976931348623157e+308;
                                                        };
                                                        readonly monthlyAmount: {
                                                            readonly type: "number";
                                                            readonly format: "double";
                                                            readonly minimum: -1.7976931348623157e+308;
                                                            readonly maximum: 1.7976931348623157e+308;
                                                        };
                                                        readonly monthlyInterest: {
                                                            readonly type: "number";
                                                            readonly format: "double";
                                                            readonly minimum: -1.7976931348623157e+308;
                                                            readonly maximum: 1.7976931348623157e+308;
                                                        };
                                                        readonly currencyCode: {
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly label: {
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly terms: {
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly payLaterPeriod: {
                                                            readonly type: readonly ["integer", "null"];
                                                            readonly format: "int32";
                                                            readonly minimum: -2147483648;
                                                            readonly maximum: 2147483647;
                                                        };
                                                    };
                                                    readonly additionalProperties: false;
                                                };
                                            };
                                            readonly customData: {
                                                readonly type: readonly ["array", "null"];
                                                readonly items: {
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly sequenceNo: {
                                                            readonly type: "integer";
                                                            readonly format: "int32";
                                                            readonly minimum: -2147483648;
                                                            readonly maximum: 2147483647;
                                                        };
                                                        readonly type: {
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly data: {
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                    };
                                                    readonly additionalProperties: false;
                                                };
                                            };
                                            readonly provider: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly id: {
                                                        readonly type: readonly ["string", "null"];
                                                    };
                                                    readonly channels: {
                                                        readonly type: readonly ["array", "null"];
                                                        readonly items: {
                                                            readonly type: "string";
                                                        };
                                                    };
                                                    readonly merchantDetails: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly id: {
                                                                readonly type: readonly ["string", "null"];
                                                            };
                                                            readonly name: {
                                                                readonly type: readonly ["string", "null"];
                                                            };
                                                            readonly countryCode: {
                                                                readonly type: readonly ["string", "null"];
                                                            };
                                                        };
                                                        readonly additionalProperties: false;
                                                    };
                                                    readonly transactionDetails: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly amount: {
                                                                readonly type: "number";
                                                                readonly format: "double";
                                                                readonly minimum: -1.7976931348623157e+308;
                                                                readonly maximum: 1.7976931348623157e+308;
                                                            };
                                                            readonly currencyCode: {
                                                                readonly type: readonly ["string", "null"];
                                                            };
                                                            readonly invoiceNo: {
                                                                readonly type: readonly ["string", "null"];
                                                            };
                                                            readonly description: {
                                                                readonly type: readonly ["string", "null"];
                                                            };
                                                        };
                                                        readonly additionalProperties: false;
                                                    };
                                                    readonly terms: {
                                                        readonly type: readonly ["string", "null"];
                                                    };
                                                    readonly termsConsent: {
                                                        readonly type: "boolean";
                                                    };
                                                };
                                                readonly additionalProperties: false;
                                            };
                                            readonly learnMoreUrl: {
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly termsConsent: {
                                                readonly type: "boolean";
                                            };
                                        };
                                        readonly additionalProperties: false;
                                    };
                                };
                                readonly additionalProperties: false;
                            };
                            readonly isDown: {
                                readonly type: "boolean";
                            };
                            readonly checkEligibleOption: {
                                readonly type: "boolean";
                            };
                            readonly ippProviderCode: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly registrationStatus: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly partnerMerchantRefID: {
                                readonly type: readonly ["string", "null"];
                            };
                        };
                        readonly additionalProperties: false;
                    };
                };
                readonly validation: {
                    readonly type: "object";
                    readonly properties: {
                        readonly cardNo: {
                            readonly type: "object";
                            readonly properties: {
                                readonly prefixes: {
                                    readonly type: readonly ["array", "null"];
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                };
                                readonly regex: {
                                    readonly type: readonly ["string", "null"];
                                };
                            };
                            readonly additionalProperties: false;
                        };
                        readonly cardTypes: {
                            readonly type: readonly ["array", "null"];
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly sequenceNo: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly name: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly prefixes: {
                                        readonly type: readonly ["array", "null"];
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly regex: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly iconUrl: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                };
                                readonly additionalProperties: false;
                            };
                        };
                    };
                    readonly additionalProperties: false;
                };
                readonly configuration: {
                    readonly type: "object";
                    readonly properties: {
                        readonly payment: {
                            readonly type: "object";
                            readonly properties: {
                                readonly tokenize: {
                                    readonly type: "boolean";
                                };
                                readonly tokenizeOnly: {
                                    readonly type: "boolean";
                                };
                                readonly cardTokenOnly: {
                                    readonly type: "boolean";
                                };
                                readonly immediatePayment: {
                                    readonly type: "boolean";
                                };
                                readonly fx: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly mcp: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly active: {
                                                    readonly type: "boolean";
                                                };
                                                readonly terms: {
                                                    readonly type: readonly ["string", "null"];
                                                };
                                            };
                                            readonly additionalProperties: false;
                                        };
                                        readonly dcc: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly active: {
                                                    readonly type: "boolean";
                                                };
                                                readonly terms: {
                                                    readonly type: readonly ["string", "null"];
                                                };
                                            };
                                            readonly additionalProperties: false;
                                        };
                                        readonly apmMcc: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly active: {
                                                    readonly type: "boolean";
                                                };
                                                readonly terms: {
                                                    readonly type: readonly ["string", "null"];
                                                };
                                            };
                                            readonly additionalProperties: false;
                                        };
                                    };
                                    readonly additionalProperties: false;
                                };
                            };
                            readonly additionalProperties: false;
                        };
                        readonly notification: {
                            readonly type: "object";
                            readonly properties: {
                                readonly facebook: {
                                    readonly type: "boolean";
                                };
                                readonly whatsApp: {
                                    readonly type: "boolean";
                                };
                                readonly line: {
                                    readonly type: "boolean";
                                };
                            };
                            readonly additionalProperties: false;
                        };
                    };
                    readonly additionalProperties: false;
                };
                readonly respCode: {
                    readonly type: readonly ["string", "null"];
                };
                readonly respDesc: {
                    readonly type: readonly ["string", "null"];
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostPayment43Paymentsimulate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly payload: {
                readonly type: readonly ["string", "null"];
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly payload: {
                    readonly type: readonly ["string", "null"];
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostPayment43Paymenttoken: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly payload: {
                readonly type: readonly ["string", "null"];
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly payload: {
                    readonly type: readonly ["string", "null"];
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostPayment43Redirectbackend: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly paymentResponse: {
                readonly type: "string";
            };
            readonly isLeaveApp: {
                readonly type: "string";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
};
declare const PostPayment43Redirectfrontend: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly payResponse: {
                readonly type: "string";
            };
            readonly isLeaveApp: {
                readonly type: "string";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
};
declare const PostPayment43Transactionstatus: {
    readonly body: {
        readonly required: readonly ["paymentToken"];
        readonly type: "object";
        readonly properties: {
            readonly additionalInfo: {
                readonly type: "boolean";
            };
            readonly paymentToken: {
                readonly type: "string";
            };
            readonly locale: {
                readonly type: readonly ["string", "null"];
            };
            readonly clientID: {
                readonly type: "string";
                readonly format: "uuid";
            };
            readonly browserDetails: {
                readonly type: "object";
                readonly properties: {
                    readonly deviceType: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly name: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly os: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly version: {
                        readonly type: readonly ["string", "null"];
                    };
                };
                readonly additionalProperties: false;
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly locale: {
                    readonly type: readonly ["string", "null"];
                };
                readonly additionalInfo: {
                    readonly type: "object";
                    readonly properties: {
                        readonly merchantDetails: {
                            readonly type: "object";
                            readonly properties: {
                                readonly name: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly address: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly email: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly logoUrl: {
                                    readonly type: readonly ["string", "null"];
                                };
                            };
                            readonly additionalProperties: false;
                        };
                        readonly transactionDetails: {
                            readonly type: "object";
                            readonly properties: {
                                readonly dateTime: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly agentCode: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly channelCode: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly data: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly amount: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly currencyCode: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly description: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly invoiceNo: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly installmentPeriod: {
                                    readonly type: readonly ["integer", "null"];
                                    readonly format: "int32";
                                    readonly minimum: -2147483648;
                                    readonly maximum: 2147483647;
                                };
                                readonly payLaterPeriod: {
                                    readonly type: readonly ["integer", "null"];
                                    readonly format: "int32";
                                    readonly minimum: -2147483648;
                                    readonly maximum: 2147483647;
                                };
                                readonly interestType: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly interestRate: {
                                    readonly type: readonly ["number", "null"];
                                    readonly format: "double";
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly monthlyPayment: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly ippAdditionalInfo: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly remainderChargeMode: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly remainderChargeAmount: {
                                    readonly type: readonly ["number", "null"];
                                    readonly format: "double";
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly loyaltyPoints: {
                                    readonly type: readonly ["array", "null"];
                                    readonly items: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly paymentScheme: {
                                                readonly type: readonly ["string", "null"];
                                            };
                                            readonly redeemAmount: {
                                                readonly type: "number";
                                                readonly format: "double";
                                                readonly minimum: -1.7976931348623157e+308;
                                                readonly maximum: 1.7976931348623157e+308;
                                            };
                                            readonly rewards: {
                                                readonly type: readonly ["array", "null"];
                                                readonly items: {
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly totalPrice: {
                                                            readonly type: "number";
                                                            readonly format: "double";
                                                            readonly minimum: -1.7976931348623157e+308;
                                                            readonly maximum: 1.7976931348623157e+308;
                                                        };
                                                        readonly totalAmount: {
                                                            readonly type: "number";
                                                            readonly format: "double";
                                                            readonly minimum: -1.7976931348623157e+308;
                                                            readonly maximum: 1.7976931348623157e+308;
                                                        };
                                                        readonly name: {
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly type: {
                                                            readonly type: readonly ["string", "null"];
                                                        };
                                                        readonly amount: {
                                                            readonly type: "number";
                                                            readonly format: "double";
                                                            readonly minimum: -1.7976931348623157e+308;
                                                            readonly maximum: 1.7976931348623157e+308;
                                                        };
                                                        readonly quantity: {
                                                            readonly type: "number";
                                                            readonly format: "double";
                                                            readonly minimum: -1.7976931348623157e+308;
                                                            readonly maximum: 1.7976931348623157e+308;
                                                        };
                                                        readonly price: {
                                                            readonly type: "number";
                                                            readonly format: "double";
                                                            readonly minimum: -1.7976931348623157e+308;
                                                            readonly maximum: 1.7976931348623157e+308;
                                                        };
                                                    };
                                                    readonly additionalProperties: false;
                                                };
                                            };
                                        };
                                        readonly additionalProperties: false;
                                    };
                                };
                            };
                            readonly additionalProperties: false;
                        };
                        readonly paymentResultDetails: {
                            readonly type: "object";
                            readonly properties: {
                                readonly code: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly description: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly autoRedirect: {
                                    readonly type: "boolean";
                                };
                                readonly redirectImmediately: {
                                    readonly type: "boolean";
                                };
                                readonly autoRedirectionTimer: {
                                    readonly type: "integer";
                                    readonly format: "int32";
                                    readonly minimum: -2147483648;
                                    readonly maximum: 2147483647;
                                };
                                readonly frontendReturnUrl: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly frontendReturnData: {
                                    readonly type: readonly ["string", "null"];
                                };
                            };
                            readonly additionalProperties: false;
                        };
                    };
                    readonly additionalProperties: false;
                };
                readonly invoiceNo: {
                    readonly type: readonly ["string", "null"];
                };
                readonly channelCode: {
                    readonly type: readonly ["string", "null"];
                };
                readonly respCode: {
                    readonly type: readonly ["string", "null"];
                };
                readonly respDesc: {
                    readonly type: readonly ["string", "null"];
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostPayment43Userpreference: {
    readonly body: {
        readonly required: readonly ["paymentToken"];
        readonly type: "object";
        readonly properties: {
            readonly paymentToken: {
                readonly type: "string";
            };
            readonly locale: {
                readonly type: readonly ["string", "null"];
            };
            readonly clientID: {
                readonly type: "string";
                readonly format: "uuid";
            };
            readonly browserDetails: {
                readonly type: "object";
                readonly properties: {
                    readonly deviceType: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly name: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly os: {
                        readonly type: readonly ["string", "null"];
                    };
                    readonly version: {
                        readonly type: readonly ["string", "null"];
                    };
                };
                readonly additionalProperties: false;
            };
        };
        readonly additionalProperties: false;
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly paymentToken: {
                    readonly type: readonly ["string", "null"];
                };
                readonly user: {
                    readonly type: "object";
                    readonly properties: {
                        readonly preference: {
                            readonly type: "object";
                            readonly properties: {
                                readonly name: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly email: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly mobileNo: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly mobileNoPrefix: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly locale: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly currencyCode: {
                                    readonly type: readonly ["string", "null"];
                                };
                                readonly countryCode: {
                                    readonly type: readonly ["string", "null"];
                                };
                            };
                            readonly additionalProperties: false;
                        };
                        readonly paymentChannels: {
                            readonly type: readonly ["array", "null"];
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly sequenceNo: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly categoryCode: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly groupCode: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly name: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly channelCode: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly agentCode: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly agentChannelCode: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly iconUrl: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                    readonly logoUrl: {
                                        readonly type: readonly ["string", "null"];
                                    };
                                };
                                readonly additionalProperties: false;
                            };
                        };
                    };
                    readonly additionalProperties: false;
                };
                readonly respCode: {
                    readonly type: readonly ["string", "null"];
                };
                readonly respDesc: {
                    readonly type: readonly ["string", "null"];
                };
            };
            readonly additionalProperties: false;
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
export { PostPayment43ApplepayMerchantvalidation, PostPayment43Canceltransaction, PostPayment43Cardinstallmentplaninfo, PostPayment43Cardtokeninfo, PostPayment43Exchangerate, PostPayment43ExchangerateApmmccexchangerate, PostPayment43ExchangerateSecure, PostPayment43Initialization, PostPayment43Loyaltypointinfo, PostPayment43Payment, PostPayment43Paymentinquiry, PostPayment43Paymentinstruction, PostPayment43Paymentnotification, PostPayment43Paymentoption, PostPayment43Paymentoptiondetails, PostPayment43Paymentsimulate, PostPayment43Paymenttoken, PostPayment43Redirectbackend, PostPayment43Redirectfrontend, PostPayment43Transactionstatus, PostPayment43Userpreference };
