import { useState } from "react";
import { ArrowLeft, Star, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PaymentScreenProps {
  setCurrentView: (
    view: "start" | "eco" | "history" | "wallet" | "payment" | "active-ride"
  ) => void;
}

export function PaymentScreen({ setCurrentView }: PaymentScreenProps) {
  const [paymentMethod, setPaymentMethod] = useState<"stars" | "card">("stars");
  const [isProcessing] = useState(false);

  const handlePayment = async () => {
    setCurrentView("active-ride");
  };

  const unlockFee = 20;

  return (
    <div className="p-4 space-y-6 h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentView("start")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">Payment</h1>
      </div>

      {/* Order Summary */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Order Summary</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Scooter E-Bike Unit-05</span>
            <span className="font-semibold">15 ₽/min</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Unlock fee</span>
            <span>{unlockFee} ₽</span>
          </div>
          <div className="flex justify-between border-t pt-3">
            <span className="font-semibold">Initial charge</span>
            <span className="font-semibold text-blue-600">{unlockFee} ₽</span>
          </div>
        </div>
        <p className="text-xs text-gray-500">
          * Actual cost will be calculated based on trip duration
        </p>
      </div>

      {/* Payment Method */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Payment Method</h3>

        {/* Telegram Stars */}
        <Card
          className={`cursor-pointer transition-colors ${
            paymentMethod === "stars" ? "ring-2 ring-blue-600 bg-blue-50" : ""
          }`}
          onClick={() => setPaymentMethod("stars")}
        >
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                <Star className="h-5 w-5 text-white fill-white" />
              </div>
              <div>
                <div className="font-semibold">Telegram Stars</div>
                <div className="text-sm text-gray-600">Fast and secure</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold">20</span>
            </div>
          </CardContent>
        </Card>

        {/* Bank Card */}
        <Card
          className={`cursor-pointer transition-colors ${
            paymentMethod === "card" ? "ring-2 ring-blue-600 bg-blue-50" : ""
          }`}
          onClick={() => setPaymentMethod("card")}
        >
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-semibold">Bank Card</div>
              <div className="text-sm text-gray-600">Visa, MasterCard</div>
            </div>
          </CardContent>
        </Card>

        {/* Card Details */}
        {paymentMethod === "card" && (
          <div className="space-y-4 pt-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" className="mt-1" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pay Button */}
      <Button
        className="w-full bg-green-600 hover:bg-green-700"
        size="lg"
        onClick={handlePayment}
        disabled={isProcessing}
      >
        {isProcessing
          ? "Processing..."
          : paymentMethod === "stars"
          ? "Pay ⭐ 20 Stars and Start"
          : `Pay ${unlockFee} ₽ and Start`}
      </Button>
    </div>
  );
}
