/**
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { AxiosHttpClient } from "@wso2is/http";
import { GlobalConfig, ServiceResourcesEndpoint } from "../configs";
import { HttpMethods } from "../models";

/**
 * Get an axios instance.
 *
 * @type {AxiosHttpClientInstance}
 */
const httpClient = AxiosHttpClient.getInstance();

/**
 * The action types of the totp post endpoint
 */
enum POST_TOTP {
    VALIDATE,
    INIT,
    REFRESH
};

/**
 * This API is used to retrieve the QR code URL of the authenticated user. 
 */
export const getTotpQrCode = (): Promise<any> => {
    const requestConfig = {
        headers: {
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: HttpMethods.GET,
        url: ServiceResourcesEndpoint.totp
    };

    return httpClient
        .request(requestConfig)
        .then((response) => {
            if (response.status !== 200) {
                return Promise.reject(`An error occurred. Server returned ${response.status}.`);
            } else {
                return Promise.resolve(response);
            }
        })
        .catch((error) => {
            return Promise.reject(error);
        });
};

/**
 * Validate the user-entered verification code
 * @param code The verification code
 */
export const validateTOTPCode = (code: string): Promise<any> => {
    const requestConfig = {
        headers: {
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: HttpMethods.POST,
        url: ServiceResourcesEndpoint.totp,
        data: {
            action: POST_TOTP.VALIDATE,
            verificationCode: code
        }
    };

    httpClient
        .request(requestConfig)
        .then((response) => {
            if (response.status !== 200) {
                return Promise.resolve(response);
            } else {
                return Promise.PromiseRejectionEvent(`An error occurred. The server returned ${response.status}`);
            }
        })
        .catch((error) => {
            return Promise.reject(error);
        });
};

/**
 * Refresh TOTP secret key of the authenticated user
 * @param code Verification code
 */
export const refreshTOTPCode = (code: string): Promise<any> => {
    const requestConfig = {
        headers: {
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: HttpMethods.POST,
        url: ServiceResourcesEndpoint.totp,
        data: {
            action: POST_TOTP.REFRESH,
            verificationCode: code
        }
    };

    httpClient
        .request(requestConfig)
        .then((response) => {
            if (response.status !== 201) {
                return Promise.resolve(response);
            } else {
                return Promise.PromiseRejectionEvent(`An error occurred. The server returned ${response.status}`);
            }
        })
        .catch((error) => {
            return Promise.reject(error);
        });
};

/**
 * Generate TOTP QR code URL for the authenticated user
 * @param code Verification code
 */
export const initTOTPCode = (code: string): Promise<any> => {
    const requestConfig = {
        headers: {
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: HttpMethods.POST,
        url: ServiceResourcesEndpoint.totp,
        data: {
            action: POST_TOTP.INIT,
            verificationCode: code
        }
    };

    httpClient
        .request(requestConfig)
        .then((response) => {
            if (response.status !== 200) {
                return Promise.resolve(response);
            } else {
                return Promise.PromiseRejectionEvent(`An error occurred. The server returned ${response.status}`);
            }
        })
        .catch((error) => {
            return Promise.reject(error);
        });
};

/**
 * This API is used to delete the TOTP credentials of the authenticated user.
 */
export const deleteTOTP = (): Promise<any> => {
    const requestConfig = {
        headers: {
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: HttpMethods.DELETE,
        url: ServiceResourcesEndpoint.totp
    };

    httpClient
        .request(requestConfig)
        .then((response) => {
            if (response.status !== 200) {
                return Promise.resolve(response);
            } else {
                return Promise.PromiseRejectionEvent(`An error occurred. The server returned ${response.status}`);
            }
        })
        .catch((error) => {
            return Promise.reject(error);
        });
};

/**
 * This API is used to retrieve the TOTP secret of the authenticated user.
 */
export const getTOTPSecret = (): Promise<any> => {
    const requestConfig = {
        headers: {
            "Access-Control-Allow-Origin": GlobalConfig.clientHost,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: HttpMethods.GET,
        url: ServiceResourcesEndpoint.totpSecret
    };

    httpClient
        .request(requestConfig)
        .then((response) => {
            if (response.status !== 200) {
                return Promise.resolve(response);
            } else {
                return Promise.PromiseRejectionEvent(`An error occurred. The server returned ${response.status}`);
            }
        })
        .catch((error) => {
            return Promise.reject(error);
        });
};
