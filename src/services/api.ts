import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

export class Api {
  instance = axios.create();

  basePath = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

  constructor() {
    this.instance.defaults.withCredentials = false;
  }

  getUrl(target: string) {
    if (target.startsWith("http")) {
      return target;
    }
    return `${this.basePath}${target}`;
  }

  getHeader(target: string) {
    return {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Access-Control-Allow-Origin": "*",
    };
  }

  isResponseError(resp: AxiosResponse) {
    return ![200, 201, 204, 206].includes(resp.status);
  }

  async postAPI(
    target: string,
    data: any,
    options = { getFullResp: false, showAlert: false, headers: {} }
  ) {
    const host = this.basePath;

    return this.instance
      .post(`${host}${target}`, data, {
        headers: { ...this.getHeader(target), ...(options?.headers || {}) },
      })
      .then((resp: AxiosResponse) => {
        const isResponseError = this.isResponseError(resp);

        if (isResponseError) {
          if (options.showAlert) {
            /// Handle Error 500
            /// Check token validity and show error toast
            if (resp.status === 500) {
              this.handleError500(resp);
            } else {
              this.handleError(resp.data, options.showAlert);
            }
            return;
          } else {
            return resp.data;
          }
        } else if (options.getFullResp) {
          return resp;
        } else {
          return resp.data;
        }
      })
      .catch((err) => this.handleError(err, options.showAlert));
  }

  async patchApi(
    target: string,
    data: any,
    options = { getFullResp: false, showAlert: false, headers: {} }
  ) {
    return this.instance
      .patch(`${this.basePath}${target}`, data, {
        headers: { ...this.getHeader(target), ...(options?.headers || {}) },
      })
      .then((resp) => {
        if (this.isResponseError(resp)) {
          this.handleError(resp.data, options.showAlert);
        } else if (options.getFullResp) {
          return resp;
        } else {
          return resp.data;
        }
      })
      .catch((err) => this.handleError(err, options.showAlert));
  }

  async getAPI(
    target: string,
    params: any,
    options = { getFullResp: false, showAlert: false, headers: {} }
  ) {
    return this.instance
      .get(this.getUrl(target), {
        headers: { ...this.getHeader(target), ...(options?.headers || {}) },
        params: params || {},
      })
      .then((resp) => {
        if (this.isResponseError(resp)) {
          this.handleError(resp.data, options.showAlert);
        } else if (options.getFullResp) {
          return resp;
        } else {
          return resp.data;
        }
      })
      .catch((err) => this.handleError(err, options.showAlert));
  }

  async getAPIGuest(
    target: string,
    params?: any,
    options = {
      getFullResp: false,
      showAlert: false,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  ) {
    return this.instance
      .get(this.getUrl(target), {
        headers: { ...(options?.headers || {}) },
        params: params || {},
      })
      .then((resp) => {
        if (this.isResponseError(resp)) {
          this.handleError(resp.data, options.showAlert);
        } else if (options.getFullResp) {
          return resp;
        } else {
          return resp.data;
        }
      })
      .catch((err) => this.handleError(err, options.showAlert));
  }

  async putAPI(
    target: string,
    data: any,
    options = { getFullResp: false, showAlert: false, headers: {} }
  ) {
    return this.instance
      .put(`${this.basePath}${target}`, data, {
        headers: { ...this.getHeader(target), ...(options?.headers || {}) },
      })
      .then((resp) => {
        if (this.isResponseError(resp)) {
          this.handleError(resp.data, options.showAlert);
        } else if (options.getFullResp) {
          return resp;
        } else {
          return resp.data;
        }
      })
      .catch((err) => this.handleError(err, options.showAlert));
  }

  async deleteAPI(
    target: string,
    data: any,
    options = { getFullResp: false, showAlert: false, headers: {} }
  ) {
    return this.instance
      .delete(`${this.basePath}${target}`, {
        headers: { ...this.getHeader(target), ...(options?.headers || {}) },
        data,
      })
      .then((resp) => {
        if (this.isResponseError(resp)) {
          this.handleError(resp.data, options.showAlert);
        } else if (options.getFullResp) {
          return resp;
        } else {
          return resp.data;
        }
      })
      .catch((err) => this.handleError(err, options.showAlert));
  }

  handleError(error: any, showAlert: boolean) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.data) {
        return Promise.reject({
          status: error.response.status,
          errors: error.response.data,
          message: error.response.data.message || error.response.data.detail,
        });
      }
      // throw new Error('Unknown error');
      return Promise.reject({
        status: error.response.status,
        message: "Unknown error",
      });
    }

    if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      return Promise.reject(error.request);
    }

    // Something happened in setting up the request that triggered an Error
    return Promise.reject(error.message);
  }

  handleError500(resp: AxiosResponse) {
    /// token expired
    if (!this._isAuthenticated()) {
      toast("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "error",
      });

      this.clearData();

      window.location.href = "/api/auth/logout";
    } else {
      return resp.data;
    }
  }

  _isAuthenticated() {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      return false;
    }
    return true;
  }

  clearData() {
    localStorage.removeItem("access_token");
    console.log("Clear data token expired!");
  }
}
