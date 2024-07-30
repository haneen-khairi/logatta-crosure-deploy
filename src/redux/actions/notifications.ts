export const addNotification = (notification: object) => ({
  type: "addNotification",
  notification,
});
export const removeNotification = (id: number) => ({
  type: "removeNotification",
  id,
});
