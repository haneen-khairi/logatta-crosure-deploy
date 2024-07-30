export const setPostcode = (postcode: string) => ({
  type: "setPostcode",
  postcode,
});
export const clearPostcode = () => ({ type: "clearPostcode" });
