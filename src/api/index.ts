import axios from "axios";

import { logout } from "../redux/actions/auth";
import { endLoading, startLoading } from "../redux/actions/loading";
import { addNotification } from "../redux/actions/notifications";
import store from "../redux/store";
import { refreshToken } from "./user";

const baseURL =
  import.meta.env.REACT_APP_BACKEND_URL ||
  "https://crosure.logatta.com";

const service = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "en-US",
  },
});

service.interceptors.request.use(
  (config) => {
    store.dispatch(startLoading());
    const { token } = store.getState().auth;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (res) => {
    store.dispatch(endLoading());

    // if (res.data.code === 200) {
    return res.data;
    // } else {
    //   if (res.data.code == 401 || res.data.code == 403) {
    //     store.dispatch(logout());
    //     window.location.href = "/";
    //   } else {
    //     const { error, error_description, message } = res.data;

    //     const msg =
    //       error || error_description
    //         ? `${error} ${error_description}`
    //         : message || "Something Went Wrong";

    //     store.dispatch(
    //       addNotification({
    //         msg,
    //         type: "err",
    //       })
    //     );

    //     return Promise.reject();
    //   }
    // }
  },
  async (err) => {
    store.dispatch(endLoading());

    const e = String(err);

    if (e.includes("401") || e.includes("403")) {
      const refreshTokenValue = store.getState().auth.refreshToken;
      if (
        refreshTokenValue &&
        refreshTokenValue.toLowerCase() !== "undefined"
      ) {
        const originalRequest = err.config;

        originalRequest._retry = true;
        await refreshToken();
        return service(originalRequest);
      } else {
        store.dispatch(logout());
        // window.location.href = "/";
      }
    } else {
      const { message } = err;

      const msg = message || "Something Went Wrong";

      store.dispatch(
        addNotification({
          msg,
          type: "err",
        })
      );

      return Promise.reject();
    }
  }
);

export default service;

export const demo = true;
