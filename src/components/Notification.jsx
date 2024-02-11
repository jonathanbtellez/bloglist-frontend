import { useNotifyValue } from "../context/NotificationContext";

const Notification = () => {
  const notifyValue = useNotifyValue();
  if (!notifyValue) {
    return null;
  }

  if (notifyValue.type === "error") {
    return <div className="error">{notifyValue.text}</div>;
  }

  return <div className="success">{notifyValue.text}</div>;
};
export default Notification;
