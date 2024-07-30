const auth = (
  state = {
    postcode: localStorage.getItem("postcode") || null,
  },
  action = {
    type: "",
    postcode: "",
  }
) => {
  switch (action.type) {
    case "setPostcode": {
      localStorage.setItem("postcode", action.postcode);

      return {
        postcode: action.postcode,
      };
    }

    case "clearPostcode": {
      localStorage.removeItem("postcode");

      return {
        postcode: null,
      };
    }

    default:
      return state;
  }
};

export default auth;
