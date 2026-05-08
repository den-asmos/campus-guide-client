import { WifiOff } from "lucide-react";

const OfflineBanner = () => {
  return (
    <div className="bg-button-dark animate-in slide-in-from-bottom-2 fixed bottom-13 left-0 z-50 flex w-full items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white duration-200">
      <WifiOff className="size-4 shrink-0" />
      <span>Нет подключения к интернету</span>
    </div>
  );
};

export default OfflineBanner;
