import "../Notifications/PasswordValidation.scss";
import { notification } from "antd";

const useNotifications = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, pauseOnHover) => () => {
    api[type]({
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      showProgress: true,
      pauseOnHover,
      className: "custom-class",
      style: {
        width: 600,
      },
    });
  };

  return [openNotification, contextHolder];
};

export default useNotifications;
