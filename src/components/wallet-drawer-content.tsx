import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Wallet,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface WalletScreenProps {
  walletBalance: number;
  paymentHistory: any[];
}

export default function WalletScreen({
  walletBalance,
  paymentHistory,
}: WalletScreenProps) {
  const topUpAmounts = [100, 300, 500, 1000, 2000, 5000];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "topup":
        return <ArrowDownLeft className="w-4 h-4 text-green-500" />;
      case "ride":
        return <ArrowUpRight className="w-4 h-4 text-blue-500" />;
      default:
        return <ArrowUpRight className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-sm mx-auto min-h-screen">
      {/* Header */}
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold mb-2 flex items-center">
          <Wallet className="w-7 h-7 mr-3 text-blue-500" />
          Кошелек
        </h1>
        <p className="text-sm opacity-70">Управление балансом и платежами</p>
      </div>

      {/* Balance Card */}
      <div className="px-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6 text-center">
            <div className="mb-4">
              <Wallet className="w-12 h-12 mx-auto mb-3 opacity-80" />
              <h2 className="text-4xl font-bold mb-1">{walletBalance} ₽</h2>
              <p className="opacity-80">Доступный баланс</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="font-bold">
                  {paymentHistory.filter((p) => p.type === "ride").length}
                </div>
                <div className="opacity-80">Поездок оплачено</div>
              </div>
              <div className="text-center">
                <div className="font-bold">
                  {paymentHistory
                    .filter((p) => p.type === "topup")
                    .reduce((sum, p) => sum + p.amount, 0)}{" "}
                  ₽
                </div>
                <div className="opacity-80">Всего пополнено</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Up Section */}
      <div className="px-4 mb-6">
        <h3 className="font-semibold mb-3 flex items-center">
          <Plus className="w-5 h-5 mr-2 text-green-500" />
          Пополнить кошелек
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {topUpAmounts.map((amount) => (
            <Button
              key={amount}
              variant="outline"
              className="py-3 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:from-green-100 hover:to-emerald-100"
            >
              <div className="text-center">
                <div className="font-bold text-green-700">{amount} ₽</div>
                {amount >= 1000 && (
                  <div className="text-xs text-green-600">
                    +{Math.floor(amount * 0.05)} ₽
                  </div>
                )}
              </div>
            </Button>
          ))}
        </div>

        {/* Bonus Info */}
        <Card className="mt-3 bg-green-50 border-green-200">
          <CardContent className="p-3">
            <div className="flex items-center text-sm text-green-800">
              <div className="text-lg mr-2">🎁</div>
              <div>
                <span className="font-semibold">Бонус при пополнении:</span>
                <br />
                <span>От 1000 ₽ — +5% к балансу</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods */}
      <div className="px-4 mb-6">
        <h3 className="font-semibold mb-3">Способы пополнения</h3>
        <div className="space-y-2">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3">
              <div className="flex items-center text-sm text-blue-800">
                <div className="text-lg mr-3">💳</div>
                <div>
                  <div className="font-semibold">Telegram Payments</div>
                  <div className="text-xs">Карты, Apple Pay, Google Pay</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-3">
              <div className="flex items-center text-sm text-purple-800">
                <div className="text-lg mr-3">⭐</div>
                <div>
                  <div className="font-semibold">Telegram Stars</div>
                  <div className="text-xs">Оплата через Telegram Stars</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Transaction History */}
      <div className="px-4 mb-6">
        <h3 className="font-semibold mb-3">История операций</h3>
        <div className="space-y-3">
          {paymentHistory.slice(0, 10).map((payment) => (
            <Card
              key={payment.id}
              className="hover:shadow-sm transition-shadow"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      {getTypeIcon(payment.type)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">
                        {payment.description}
                      </div>
                      <div className="text-xs text-gray-500">
                        {payment.date} • {payment.time}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`font-bold ${
                        payment.type === "topup"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {payment.type === "topup" ? "+" : "-"}
                      {payment.amount} ₽
                    </div>
                    <div className="flex items-center justify-end">
                      {getStatusIcon(payment.status)}
                      <span className="text-xs text-gray-500 ml-1 capitalize">
                        {payment.status === "completed"
                          ? "Завершено"
                          : payment.status === "pending"
                          ? "В обработке"
                          : "Ошибка"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {paymentHistory.length > 10 && (
          <Button variant="outline" className="w-full mt-3 bg-transparent">
            Показать все операции
          </Button>
        )}
      </div>

      {/* Auto Top-up */}
      <div className="px-4 pb-6">
        <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
          <CardContent className="p-4">
            <h4 className="font-semibold text-orange-800 mb-2 flex items-center">
              🔄 Автопополнение
            </h4>
            <p className="text-sm text-orange-700 mb-3">
              Автоматически пополняйте кошелек, когда баланс становится меньше
              100 ₽
            </p>
            <Button
              variant="outline"
              className="w-full bg-transparent border-orange-300 text-orange-700"
            >
              Настроить автопополнение
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
