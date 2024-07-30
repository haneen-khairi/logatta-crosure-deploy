const notifications = (
  state = {
    notifications: [],
  },
  action = {
    type: "",
    notification: {},
    id: 0,
  }
) => {
  switch (action.type) {
    case "addNotification":
      return {
        notifications: [...state.notifications, action.notification],
      };

    case "removeNotification":
      return {
        notifications: state.notifications?.filter((_, i) => i !== action.id),
      };

    default:
      return state;
  }
};

export default notifications;
