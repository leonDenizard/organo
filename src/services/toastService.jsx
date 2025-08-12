// toastService.js
import toast from "react-hot-toast";
import { Slack, Mail } from "lucide-react";

const baseOptions = {
  style: {
    background: "#rgba(255, 255, 255, 0.1)",
    color: "#000",
  },
};

export const toastSlack = (message) =>
  toast.success(message, {
    ...baseOptions,
    icon: <Slack size={18} />,
  });

export const toastEmail = (message) =>
  toast.success(message, {
    ...baseOptions,
    icon: <Mail size={18} />,
  });
