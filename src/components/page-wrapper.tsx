import { useEffect, useState, ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const [safeArea, setSafeArea] = useState({ top: 0 });

  useEffect(() => {
    function updateSafeArea() {
      if (window.Telegram?.WebApp?.safeAreaInset) {
        setSafeArea({
          top: window.Telegram.WebApp.safeAreaInset.top + 40,
        });
      }
    }
    updateSafeArea();
    window.Telegram?.WebApp?.onEvent?.("safeAreaChanged", updateSafeArea);
    return () => {
      window.Telegram?.WebApp?.offEvent?.("safeAreaChanged", updateSafeArea);
    };
  }, []);

  return (
    <div
      className="flex flex-col w-full overflow-y-auto h-full"
      style={{ paddingTop: safeArea.top }}
    >
      {children}
    </div>
  );
}
