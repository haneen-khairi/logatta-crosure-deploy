const loading = (
  state = {
    loading: [],
  },
  action = {
    type: "",
  }
) => {
  switch (action.type) {
    case "startLoading":
      return {
        loading: [...state.loading, true],
      };

    case "endLoading":
      return {
        loading: [...state.loading.filter((_, i) => i > 0)],
      };

    default:
      return state;
  }
};

export default loading;
