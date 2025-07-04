import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Zap, Navigation, Square } from "lucide-react";

interface ActiveRentalScreenProps {
  setCurrentView: (
    view: "start" | "eco" | "history" | "wallet" | "payment" | "active-ride"
  ) => void;
  rental: any;
}

export function ActiveRentalScreen({
  setCurrentView,
  rental,
}: ActiveRentalScreenProps) {
  const [duration, setDuration] = useState(0);
  const [cost, setCost] = useState(20); // Initial unlock fee

  useEffect(() => {
    const interval = setInterval(() => {
      if (rental?.startTime) {
        const elapsed = Math.floor(
          (Date.now() - rental.startTime.getTime()) / 1000
        );
        setDuration(elapsed);

        // Calculate cost: unlock fee + (minutes * rate)
        const minutes = Math.floor(elapsed / 60);
        const newCost =
          (rental.scooter?.unlockFee || 20) +
          minutes * (rental.scooter?.pricePerMin || 15);
        setCost(newCost);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [rental]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleEndRental = () => {
    setCurrentView("start");
  };

  const handlePauseRental = () => {
    setCurrentView("start");
  };

  return (
    <div className="p-4 space-y-6 h-full">
      {/* Active Rental Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
          <Zap className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-green-600">Rental Active</h1>
        <p className="text-gray-600">Enjoy your ride!</p>
      </div>

      {/* Timer and Cost */}
      <Card className="bg-gray-50">
        <CardContent className="p-6 text-center">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-3xl font-bold">{formatTime(duration)}</div>
              <div className="text-sm text-gray-600">Duration</div>
            </div>
            <div>
              <div className="w-8 h-8 mx-auto mb-2 text-green-600 text-2xl">
                ₽
              </div>
              <div className="text-3xl font-bold text-green-600">{cost}</div>
              <div className="text-sm text-gray-600">Current Cost</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scooter Info */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">
                {rental?.scooter?.name || "E-Bike Unit-05"}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>Currently riding</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full bg-transparent"
          size="lg"
          onClick={handlePauseRental}
        >
          <Navigation className="h-5 w-5 mr-2" />
          Pause Rental
        </Button>

        <Button
          className="w-full bg-red-600 hover:bg-red-700"
          size="lg"
          onClick={handleEndRental}
        >
          <Square className="h-5 w-5 mr-2" />
          End Rental
        </Button>
      </div>

      {/* Safety Tips */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">
            Safety Reminder
          </h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Always wear a helmet</li>
            <li>• Follow traffic rules</li>
            <li>• Park in designated areas</li>
            <li>• End rental when finished</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
