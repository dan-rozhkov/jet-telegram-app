import { MapPin, Clock, Leaf, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PageWrapper from "./page-wrapper";

const trips = [
  {
    id: 1,
    route: "Красная площадь → Парк Горького",
    date: "2024-07-01",
    time: "14:30",
    duration: "12 min",
    cost: "200 ₽",
    co2Saved: "0.3 kg CO₂",
  },
  {
    id: 2,
    route: "Арбат → Кропоткинская",
    date: "2024-06-30",
    time: "18:45",
    duration: "8 min",
    cost: "140 ₽",
    co2Saved: "0.2 kg CO₂",
  },
  {
    id: 3,
    route: "Новокузнецкая → Сокольники",
    date: "2024-06-29",
    time: "12:15",
    duration: "15 min",
    cost: "245 ₽",
    co2Saved: "0.4 kg CO₂",
  },
  {
    id: 4,
    route: "Тверская → Пушкинская",
    date: "2024-06-28",
    time: "16:20",
    duration: "6 min",
    cost: "110 ₽",
    co2Saved: "0.1 kg CO₂",
  },
];

export default function HistoryScreen() {
  return (
    <PageWrapper>
      <div className="p-4 space-y-6 h-full overflow-y-auto w-full">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Trip History</h1>
          <p className="text-gray-600">View your recent rides</p>
        </div>

        {/* This Month Stats */}
        <Card className="bg-gray-50">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-4">This Month</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">4</div>
                <div className="text-sm text-gray-600">Trips</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">1.0kg</div>
                <div className="text-sm text-gray-600">CO₂ Saved</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">7.7km</div>
                <div className="text-sm text-gray-600">Distance</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trip List */}
        <div className="space-y-3">
          {trips.map((trip) => (
            <Card
              key={trip.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="font-medium text-sm">{trip.route}</span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          {trip.date} • {trip.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Leaf className="h-3 w-3 text-green-600" />
                        <span>{trip.co2Saved}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-2">
                    <div>
                      <div className="font-semibold">{trip.cost}</div>
                      <div className="text-xs text-gray-600">
                        {trip.duration}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
