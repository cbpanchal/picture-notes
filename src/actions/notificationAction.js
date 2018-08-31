import { SHOW_NOTIFICATION } from "../constants/actionTypes";

export default function(notification) {
  return {
    type: SHOW_NOTIFICATION,
    payload: notification
  };
}
