import { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";
import { Toast, ToastDescription, ToastTitle } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

type NotificationToastProps = {
  autoShow?: boolean;
  autoHideDelay?: number;
};

const NotificationToast = ({
  autoShow = true,
  autoHideDelay = 10000,
}: NotificationToastProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (autoShow) {
      // Delay the appearance to not immediately show on page load
      const showTimer = setTimeout(() => setIsVisible(true), 3000);
      
      // Auto hide toast after specified delay
      const hideTimer = setTimeout(() => setIsVisible(false), 3000 + autoHideDelay);
      
      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [autoShow, autoHideDelay]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Toast className={cn(
        "bg-white dark:bg-gray-900 border-l-4 border-purple-500",
        "transform transition-transform duration-300",
        isVisible ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex gap-4 items-start">
          <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
            <Bell className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          
          <div className="flex-1">
            <ToastTitle>Limited Time Offer!</ToastTitle>
            <ToastDescription>
              Use code WELCOME15 for 15% off your first purchase.
            </ToastDescription>
          </div>
          
          <button
            onClick={() => setIsVisible(false)}
            className="h-6 w-6 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center"
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </Toast>
    </div>
  );
};

export default NotificationToast;