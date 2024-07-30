import api from "..";
import { login } from "../../redux/actions/auth";
import store from "../../redux/store";

const loginAPI = (data: object) => api.post("/token/obtain/", data);

const refreshToken = () =>
  api
    .post("/token/refresh/", { refresh: store.getState().auth.refreshToken })
    .then((res: any) => {
      store.dispatch(
        login({
          token: res.access,
          refreshToken: res.refresh,
          user: { name: "Name" },
        })
      );
    });

export { loginAPI, refreshToken };
