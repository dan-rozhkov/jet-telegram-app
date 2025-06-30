import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Leaf, Users, MessageCircle } from "lucide-react";

export default function EcoDrawerContent({
  setCurrentView,
}: {
  setCurrentView: (view: "eco" | "history" | "wallet") => void;
}) {
  return (
    <div>
      {/* CO2 Savings Card */}
      <div className="px-4 mb-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 overflow-hidden">
          <CardContent className="p-6 text-center relative">
            <div className="absolute top-2 right-2">
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                НОВОЕ
              </span>
            </div>
            <div className="mb-4">
              <Leaf className="w-16 h-16 text-green-600 mx-auto mb-2" />
              <h2 className="text-4xl font-bold text-green-700 mb-1">10 кг</h2>
              <p className="text-green-600 font-medium">CO₂ сэкономлено</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="font-bold text-gray-800">10 км</div>
                <div className="text-gray-600">Пройдено</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-800">🌳 2.4</div>
                <div className="text-gray-600">Деревьев спасено</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Telegram Integration Cards */}
      <div className="px-4 mb-6">
        <h3 className="font-semibold mb-3 flex items-center">
          <MessageCircle className="w-5 h-5 mr-2 text-blue-500" />
          Поделиться в Telegram
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <Button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl h-auto flex flex-col items-center">
            <div className="text-2xl mb-1">📱</div>
            <div className="text-sm font-medium">Stories</div>
          </Button>
          <Button className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl h-auto flex flex-col items-center">
            <div className="text-2xl mb-1">📢</div>
            <div className="text-sm font-medium">Канал</div>
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="px-4 mb-6">
        <h3 className="font-semibold mb-3">Статистика поездок</h3>
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">23</div>
              <div className="text-sm text-gray-600">Поездки</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">2ч 15м</div>
              <div className="text-sm text-gray-600">Время в пути</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* View History Button */}
      <div className="px-4 mb-6">
        <Button
          onClick={() => {
            setCurrentView("history");
          }}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium"
        >
          📊 Подробная история поездок
        </Button>
      </div>

      {/* Telegram Friends Section */}
      <div className="px-4 mb-6">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-blue-800 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Друзья в Telegram
              </h4>
              <Button variant="ghost" size="sm" className="text-blue-600">
                Пригласить
              </Button>
            </div>
            <div className="flex -space-x-2 mb-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
              <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center text-gray-600 text-xs">
                +5
              </div>
            </div>
            <p className="text-sm text-blue-700">
              8 друзей уже экономят CO₂! Пригласите еще и получите бонусы 🎁
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Environmental Impact */}
      <div className="px-4 mb-6">
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <h4 className="font-semibold text-green-800 mb-2">🌍 Ваш вклад</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-green-700">
                  Эквивалент посаженных деревьев:
                </span>
                <span className="font-bold">2.4 🌳</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Сэкономлено бензина:</span>
                <span className="font-bold">4.2 л ⛽</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Чистый воздух для:</span>
                <span className="font-bold">12 человек 💨</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
