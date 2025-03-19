/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface DeviceAdd {
  /**
   * Название
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Описание
   * @minLength 1
   * @maxLength 500
   */
  description: string;
  /**
   * Кабели
   * @min -2147483648
   * @max 2147483647
   */
  cables: number;
  /**
   * Фото
   * @format uri
   */
  image?: string | null;
}

export interface Device {
  /** ID */
  id?: number;
  /** Image */
  image?: string;
  /** Video */
  video?: string;
  /**
   * Название
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Описание
   * @minLength 1
   * @maxLength 500
   */
  description: string;
  /** Статус */
  status?: 1 | 2;
  /**
   * Кабели
   * @min -2147483648
   * @max 2147483647
   */
  cables: number;
}

export interface Service {
  /** ID */
  id?: number;
  /** Owner */
  owner?: string;
  /** Moderator */
  moderator?: string;
  /** Devices */
  devices?: string;
  /** Статус */
  status?: 1 | 2 | 3 | 4 | 5;
  /**
   * Дата создания
   * @format date-time
   */
  date_created?: string | null;
  /**
   * Дата формирования
   * @format date-time
   */
  date_formation?: string | null;
  /**
   * Дата завершения
   * @format date-time
   */
  date_complete?: string | null;
  /** Tz */
  tz?: string | null;
  /**
   * Date
   * @format date
   */
  date?: string | null;
  /** Qr */
  qr?: string | null;
}

export interface DeviceService {
  /** ID */
  id?: number;
  /**
   * Comment
   * @minLength 1
   */
  comment?: string;
  /** Device */
  device?: number | null;
  /** Service */
  service?: number | null;
}

export interface UserLogin {
  /**
   * Username
   * @minLength 1
   */
  username: string;
  /**
   * Password
   * @minLength 1
   */
  password: string;
}

export interface UserRegister {
  /** ID */
  id?: number;
  /**
   * Адрес электронной почты
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Пароль
   * @minLength 1
   * @maxLength 128
   */
  password: string;
  /**
   * Имя пользователя
   * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
}

export interface UserProfile {
  /**
   * Username
   * @minLength 1
   */
  username?: string;
  /**
   * Email
   * @minLength 1
   */
  email?: string;
  /**
   * Password
   * @minLength 1
   */
  password?: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8000/api" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://localhost:8000/api
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  devices = {
    /**
     * No description
     *
     * @tags devices
     * @name DevicesList
     * @request GET:/devices/
     * @secure
     */
    devicesList: (
      query?: {
        device_name?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/devices/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags devices
     * @name DevicesCreateCreate
     * @request POST:/devices/create/
     * @secure
     */
    devicesCreateCreate: (
      data: {
        /**
         * @minLength 1
         * @maxLength 100
         */
        name: string;
        /**
         * @minLength 1
         * @maxLength 500
         */
        description: string;
        /**
         * @min -2147483648
         * @max 2147483647
         */
        cables: number;
        /** @format binary */
        image?: File | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<DeviceAdd, any>({
        path: `/devices/create/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags devices
     * @name DevicesRead
     * @request GET:/devices/{device_id}/
     * @secure
     */
    devicesRead: (deviceId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/devices/${deviceId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags devices
     * @name DevicesAddToServiceCreate
     * @request POST:/devices/{device_id}/add_to_service/
     * @secure
     */
    devicesAddToServiceCreate: (deviceId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/devices/${deviceId}/add_to_service/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags devices
     * @name DevicesDeleteDelete
     * @request DELETE:/devices/{device_id}/delete/
     * @secure
     */
    devicesDeleteDelete: (deviceId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/devices/${deviceId}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags devices
     * @name DevicesImageList
     * @request GET:/devices/{device_id}/image/
     * @secure
     */
    devicesImageList: (deviceId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/devices/${deviceId}/image/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags devices
     * @name DevicesUpdateUpdate
     * @request PUT:/devices/{device_id}/update/
     * @secure
     */
    devicesUpdateUpdate: (deviceId: string, data: Device, params: RequestParams = {}) =>
      this.request<Device, any>({
        path: `/devices/${deviceId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags devices
     * @name DevicesUpdateImageCreate
     * @request POST:/devices/{device_id}/update_image/
     * @secure
     */
    devicesUpdateImageCreate: (
      deviceId: string,
      data: {
        /** @format binary */
        image?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/devices/${deviceId}/update_image/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags devices
     * @name DevicesUpdateVideoCreate
     * @request POST:/devices/{device_id}/update_video/
     * @secure
     */
    devicesUpdateVideoCreate: (
      deviceId: string,
      data: {
        /** @format binary */
        video?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/devices/${deviceId}/update_video/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags devices
     * @name DevicesVideoList
     * @request GET:/devices/{device_id}/video/
     * @secure
     */
    devicesVideoList: (deviceId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/devices/${deviceId}/video/`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  services = {
    /**
     * No description
     *
     * @tags services
     * @name ServicesList
     * @request GET:/services/
     * @secure
     */
    servicesList: (
      query?: {
        status?: number;
        date_formation_start?: string;
        date_formation_end?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/services/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags services
     * @name ServicesRead
     * @request GET:/services/{service_id}/
     * @secure
     */
    servicesRead: (serviceId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/services/${serviceId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags services
     * @name ServicesDeleteDelete
     * @request DELETE:/services/{service_id}/delete/
     * @secure
     */
    servicesDeleteDelete: (serviceId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/services/${serviceId}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags services
     * @name ServicesDeleteDeviceDelete
     * @request DELETE:/services/{service_id}/delete_device/{device_id}/
     * @secure
     */
    servicesDeleteDeviceDelete: (serviceId: string, deviceId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/services/${serviceId}/delete_device/${deviceId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags services
     * @name ServicesUpdateUpdate
     * @request PUT:/services/{service_id}/update/
     * @secure
     */
    servicesUpdateUpdate: (serviceId: string, data: Service, params: RequestParams = {}) =>
      this.request<Service, any>({
        path: `/services/${serviceId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags services
     * @name ServicesUpdateDeviceUpdate
     * @request PUT:/services/{service_id}/update_device/{device_id}/
     * @secure
     */
    servicesUpdateDeviceUpdate: (
      serviceId: string,
      deviceId: string,
      data: DeviceService,
      params: RequestParams = {},
    ) =>
      this.request<DeviceService, any>({
        path: `/services/${serviceId}/update_device/${deviceId}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags services
     * @name ServicesUpdateStatusAdminUpdate
     * @request PUT:/services/{service_id}/update_status_admin/
     * @secure
     */
    servicesUpdateStatusAdminUpdate: (
      serviceId: string,
      data: {
        status?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          status?: number;
        },
        any
      >({
        path: `/services/${serviceId}/update_status_admin/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags services
     * @name ServicesUpdateStatusUserUpdate
     * @request PUT:/services/{service_id}/update_status_user/
     * @secure
     */
    servicesUpdateStatusUserUpdate: (serviceId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/services/${serviceId}/update_status_user/`,
        method: "PUT",
        secure: true,
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags users
     * @name UsersLoginCreate
     * @request POST:/users/login/
     * @secure
     */
    usersLoginCreate: (data: UserLogin, params: RequestParams = {}) =>
      this.request<UserLogin, any>({
        path: `/users/login/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersLogoutCreate
     * @request POST:/users/logout/
     * @secure
     */
    usersLogoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/logout/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersRegisterCreate
     * @request POST:/users/register/
     * @secure
     */
    usersRegisterCreate: (data: UserRegister, params: RequestParams = {}) =>
      this.request<UserRegister, any>({
        path: `/users/register/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersUpdateUpdate
     * @request PUT:/users/{user_id}/update/
     * @secure
     */
    usersUpdateUpdate: (userId: string, data: UserProfile, params: RequestParams = {}) =>
      this.request<UserProfile, any>({
        path: `/users/${userId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
