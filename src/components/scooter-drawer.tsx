import Drawer from "./drawer";
import { Marker } from "mapbox-gl";
import StartDrawerContent from "./start-drawer-content";
import EcoDrawerContent from "./eco-drawer-content";
import WalletDrawerContent from "./wallet-drawer-content";
import HistoryDrawerContent from "./history-drawer-content";
import { PaymentScreen } from "./payment-drawer-content";
import { ActiveRentalScreen } from "./active-ride-drawer-content";

type ScooterDrawerProps = {
  marker: Marker;
  open: boolean;
  setOpen: (open: boolean) => void;
  view: "start" | "eco" | "history" | "wallet" | "payment" | "active-ride";
  setView: (
    view: "start" | "eco" | "history" | "wallet" | "payment" | "active-ride"
  ) => void;
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
      {view === "payment" && <PaymentScreen setCurrentView={setView} />}
      {view === "active-ride" && (
        <ActiveRentalScreen
          rental={{
            startTime: new Date(),
          }}
          setCurrentView={setView}
        />
      )}
      {view === "eco" && <EcoDrawerContent setCurrentView={setView} />}
      {view === "history" && <HistoryDrawerContent />}
      {view === "wallet" && (
        <WalletDrawerContent walletBalance={1200} paymentHistory={[]} />
      )}
    </Drawer>
  );
}
