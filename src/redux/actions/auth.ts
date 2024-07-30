export const login = (resp: {
  token: string;
  refreshToken: string;
  user: object;
}) => ({
  type: "login",
  resp,
});
export const logout = () => ({ type: "logout" });
