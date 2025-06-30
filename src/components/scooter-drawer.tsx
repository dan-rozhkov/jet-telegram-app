import Drawer from "./drawer";
import { Marker } from "mapbox-gl";
import StartDrawerContent from "./start-drawer-content";
import EcoDrawerContent from "./eco-drawer-content";
import WalletDrawerContent from "./wallet-drawer-content";
import HistoryDrawerContent from "./history-drawer-content";

type ScooterDrawerProps = {
  marker: Marker;
  open: boolean;
  setOpen: (open: boolean) => void;
  view: "start" | "eco" | "history" | "wallet";
  setView: (view: "start" | "eco" | "history" | "wallet") => void;
};

export default function ScooterDrawer({
  open,
  setOpen,
  view,
  setView,
}: ScooterDrawerProps) {
  return (
    <Drawer trigger={<></>} open={open} setOpen={setOpen}>
      {view === "start" && <StartDrawerContent setCurrentView={setView} />}
      {view === "eco" && <EcoDrawerContent setCurrentView={setView} />}
      {view === "history" && <HistoryDrawerContent />}
      {view === "wallet" && (
        <WalletDrawerContent walletBalance={1200} paymentHistory={[]} />
      )}
    </Drawer>
  );
}
