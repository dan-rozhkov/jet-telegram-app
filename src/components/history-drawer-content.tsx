import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Leaf, MessageCircle, Share2 } from "lucide-react";

export default function HistoryDrawerContent() {
  const [trips] = useState([
    {
      id: 1,
      date: "2024-06-30",
      time: "14:30",
      distance: 3.2,
      duration: "18 мин",
      startLocation: "ул. Тверская, 15",
      endLocation: "Красная площадь",
      cost: 89,
      scooterId: "Unit 05",
      co2Saved: 0.64,
    },
    {
      id: 2,
      date: "2024-06-29",
      time: "09:15",
      distance: 5.8,
      duration: "32 мин",
      startLocation: "Парк Горького",
      endLocation: "ТЦ Атриум",
      cost: 156,
      scooterId: "Unit 12",
      co2Saved: 1.16,
    },
    {
      id: 3,
      date: "2024-06-28",
      time: "19:45",
      distance: 2.1,
      duration: "12 мин",
      startLocation: "Метро Сокольники",
      endLocation: "ул. Русаковская, 23",
      cost: 67,
      scooterId: "Unit 08",
      co2Saved: 0.42,
    },
    {
      id: 4,
      date: "2024-06-27",
      time: "16:20",
      distance: 4.5,
      duration: "25 мин",
      startLocation: "ВДНХ",
      endLocation: "Ботанический сад",
      cost: 125,
      scooterId: "Unit 03",
      co2Saved: 0.9,
    },
    {
      id: 5,
      date: "2024-06-26",
      time: "11:00",
      distance: 6.2,
      duration: "35 мин",
      startLocation: "Арбат",
      endLocation: "Воробьевы горы",
      cost: 178,
      scooterId: "Unit 15",
      co2Saved: 1.24,
    },
  ]);

  const totalTrips = trips.length;
  const totalDistance = trips.reduce((sum, trip) => sum + trip.distance, 0);
  const totalCO2Saved = trips.reduce((sum, trip) => sum + trip.co2Saved, 0);
  const avgTripDistance = totalDistance / totalTrips;

  const groupedTrips = trips.reduce((groups, trip) => {
    const date = trip.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(trip);
    return groups;
  }, {} as Record<string, typeof trips>);

  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showStats, setShowStats] = useState(false);

  return (
    <div className="max-w-sm mx-auto min-h-screen">
      {/* Header */}
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">История поездок</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowStats(!showStats)}
            className="text-blue-600"
          >
            📊
          </Button>
        </div>
        <p className="text-sm opacity-70">Детализация ваших эко-поездок</p>
      </div>

      {/* Enhanced Summary Stats */}
      <div className="px-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-50 via-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {totalTrips}
                </div>
                <div className="text-sm text-gray-600">Поездок</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {totalCO2Saved.toFixed(1)} кг
                </div>
                <div className="text-sm text-gray-600">CO₂ сэкономлено</div>
              </div>
            </div>

            {/* Progress Bar for CO2 Savings */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">
                  Прогресс к цели (10 кг CO₂)
                </span>
                <span className="text-green-600">
                  {((totalCO2Saved / 10) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min((totalCO2Saved / 10) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">
                  {totalDistance.toFixed(1)} км
                </div>
                <div className="text-xs text-gray-600">Общий путь</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-orange-600">
                  {avgTripDistance.toFixed(1)} км
                </div>
                <div className="text-xs text-gray-600">Средняя поездка</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Telegram Achievements */}
      <div className="px-4 mb-6">
        <h3 className="font-semibold mb-3 flex items-center">
          🏆 Достижения в Telegram
          <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            2
          </span>
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          <Card className="min-w-[120px] bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-3 text-center">
              <div className="text-2xl mb-1">🌱</div>
              <div className="text-xs font-semibold">Эко-новичок</div>
              <div className="text-xs text-gray-600">5+ поездок</div>
              <Button size="sm" className="mt-2 text-xs bg-blue-500 text-white">
                Поделиться
              </Button>
            </CardContent>
          </Card>
          <Card className="min-w-[120px] bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-3 text-center">
              <div className="text-2xl mb-1">🚀</div>
              <div className="text-xs font-semibold">Скоростной</div>
              <div className="text-xs text-gray-600">20+ км/ч</div>
              <Button size="sm" className="mt-2 text-xs bg-blue-500 text-white">
                Поделиться
              </Button>
            </CardContent>
          </Card>
          <Card className="min-w-[120px] border-dashed border-gray-300">
            <CardContent className="p-3 text-center">
              <div className="text-2xl mb-1 opacity-50">🌍</div>
              <div className="text-xs font-semibold opacity-50">Эко-герой</div>
              <div className="text-xs text-gray-400">10 кг CO₂</div>
              <div className="text-xs text-blue-500 mt-2">Скоро!</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Filter Buttons */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto">
          {["all", "today", "week", "month"].map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap ${
                selectedFilter === filter
                  ? "bg-blue-500 text-white"
                  : "bg-transparent"
              }`}
              onClick={() => {
                setSelectedFilter(filter);
              }}
            >
              {filter === "all" && "Все"}
              {filter === "today" && "Сегодня"}
              {filter === "week" && "Неделя"}
              {filter === "month" && "Месяц"}
            </Button>
          ))}
        </div>
      </div>

      {/* Weekly Stats Card */}
      {showStats && (
        <div className="px-4 mb-4">
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3 text-purple-800">
                📈 Статистика недели
              </h4>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div>
                  <div className="font-bold text-purple-600">3</div>
                  <div className="text-xs text-gray-600">Поездки</div>
                </div>
                <div>
                  <div className="font-bold text-green-600">2.2 кг</div>
                  <div className="text-xs text-gray-600">CO₂ за неделю</div>
                </div>
                <div>
                  <div className="font-bold text-blue-600">+15%</div>
                  <div className="text-xs text-gray-600">Рост активности</div>
                </div>
              </div>

              {/* Simple Chart Visualization */}
              <div className="mt-3">
                <div className="flex items-end justify-between h-16 gap-1">
                  {[0.3, 0.8, 0.5, 0.9, 0.4, 0.7, 1.0].map((height, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-t from-purple-400 to-purple-600 rounded-t flex-1 transition-all duration-500"
                      style={{ height: `${height * 100}%` }}
                    ></div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Пн</span>
                  <span>Вт</span>
                  <span>Ср</span>
                  <span>Чт</span>
                  <span>Пт</span>
                  <span>Сб</span>
                  <span>Вс</span>
                </div>
              </div>

              <Button className="w-full mt-3 bg-blue-500 text-white">
                <Share2 className="w-4 h-4 mr-2" />
                Поделиться прогрессом
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Grouped Trip List */}
      <div className="px-4 space-y-4 pb-6">
        {Object.entries(groupedTrips).map(([date, dayTrips]) => {
          const dayTotalCO2 = dayTrips.reduce(
            (sum, trip) => sum + trip.co2Saved,
            0
          );

          return (
            <div key={date}>
              {/* Date Header */}
              <div className="flex justify-between items-center mb-3 px-2">
                <h3 className="font-semibold text-gray-800">{date}</h3>
                <div className="text-sm text-gray-500">
                  {dayTrips.length} поездок • -{dayTotalCO2.toFixed(1)} кг CO₂
                </div>
              </div>

              {/* Trips for this date */}
              <div className="space-y-3">
                {dayTrips.map((trip) => (
                  <Card
                    key={trip.id}
                    className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-lg">🛴</span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">
                              {trip.time}
                            </div>
                            <div className="text-sm text-gray-500">
                              {trip.scooterId}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600 flex items-center">
                            <Leaf className="w-4 h-4 mr-1" />-{trip.co2Saved} кг
                          </div>
                          <div className="text-sm text-gray-500">
                            {trip.cost} ₽
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center text-sm">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                          <span className="text-gray-600 flex-1 truncate">
                            {trip.startLocation}
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                          <span className="text-gray-600 flex-1 truncate">
                            {trip.endLocation}
                          </span>
                        </div>
                      </div>

                      {/* Trip Metrics */}
                      <div className="grid grid-cols-3 gap-3 text-center text-sm bg-gray-50 rounded-lg p-2 mb-3">
                        <div>
                          <div className="font-bold text-blue-600">
                            {trip.distance} км
                          </div>
                          <div className="text-xs text-gray-500">
                            Расстояние
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-purple-600">
                            {trip.duration}
                          </div>
                          <div className="text-xs text-gray-500">Время</div>
                        </div>
                        <div>
                          <div className="font-bold text-orange-600">
                            {(
                              (trip.distance /
                                Number.parseFloat(trip.duration)) *
                              60
                            ).toFixed(1)}{" "}
                            км/ч
                          </div>
                          <div className="text-xs text-gray-500">Скорость</div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Эко-поездка
                          </span>
                          {trip.distance > 5 && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              Длинная
                            </span>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 p-0 h-auto"
                          // onClick={() => {
                          //   const message = `🛴 Поездка: ${trip.startLocation} → ${trip.endLocation}\n📏 ${trip.distance} км за ${trip.duration}\n🌱 Сэкономил ${trip.co2Saved} кг CO₂!`;
                          //   if (window.Telegram?.WebApp) {
                          //     window.Telegram.WebApp.openTelegramLink(
                          //       `https://t.me/share/url?text=${encodeURIComponent(
                          //         message
                          //       )}`
                          //     );
                          //   }
                          // }}
                        >
                          Поделиться →
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Telegram Bot Integration */}
      <div className="px-4 pb-6">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Telegram Бот
            </h4>
            <p className="text-sm text-blue-700 mb-3">
              Получайте уведомления о новых достижениях и еженедельные отчеты
              прямо в Telegram!
            </p>
            <Button
              className="w-full bg-blue-500 text-white"
              onClick={() => {
                // if (window.Telegram?.WebApp) {
                //   window.Telegram.WebApp.openTelegramLink(
                //     "https://t.me/EcoScooterBot"
                //   );
                // }
              }}
            >
              Подписаться на бота
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
