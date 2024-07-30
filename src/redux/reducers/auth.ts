const auth = (
  state = {
    token: localStorage.getItem("token") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    user: localStorage.getItem("user")?.includes("name")
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {},
  },
  action = {
    type: "",
    resp: {
      token: "",
      refreshToken: "",
      user: {},
    },
  }
) => {
  switch (action.type) {
    case "login": {
      localStorage.setItem("token", action.resp.token);
      action.resp.refreshToken
        ? localStorage.setItem("refreshToken", action.resp.refreshToken)
        : localStorage.removeItem("refreshToken");
      localStorage.setItem("user", JSON.stringify(action.resp.user));

      return {
        token: action.resp.token,
        refreshToken: action.resp.refreshToken,
        user: action.resp.user,
      };
    }

    case "logout": {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("postcode");

      return {
        token: null,
        refreshToken: null,
        user: {},
      };
    }

    default:
      return state;
  }
};

export default auth;
