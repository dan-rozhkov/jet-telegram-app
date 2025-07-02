import { Share, Trophy, Rocket, Sprout, MapPin, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageWrapper from "@/components/page-wrapper";

export default function ProfileScreen() {
  const achievements = [
    {
      id: 1,
      name: "First Ride",
      description: "Completed",
      icon: Rocket,
      color: "bg-yellow-100 border-yellow-300",
      earned: true,
    },
    {
      id: 2,
      name: "Eco Warrior",
      description: "5kg CO₂ saved",
      icon: Sprout,
      color: "bg-green-100 border-green-300",
      earned: true,
    },
    {
      id: 3,
      name: "Explorer",
      description: "10+ locations",
      icon: MapPin,
      color: "bg-blue-100 border-blue-300",
      earned: true,
    },
    {
      id: 4,
      name: "VIP Rider",
      description: "50 rides",
      icon: Crown,
      color: "bg-purple-100 border-purple-300",
      earned: false,
    },
  ];

  const handleShareToStories = () => {
    // Generate eco impact image/card for sharing
    if (
      typeof window !== "undefined" &&
      window.Telegram &&
      window.Telegram.WebApp &&
      typeof window.Telegram.WebApp.shareToStory === "function"
    ) {
      window.Telegram.WebApp.shareToStory("./images/scooter-light.png", {
        text: "I saved 5.2kg CO₂ with @jetshr! 🌱 Join me in making cities greener! 🛴",
      });
    } else {
      // fallback: alert or console
      alert("Sharing to Telegram Stories is only available in Telegram app.");
    }
  };

  const handleShareReferral = () => {
    // Share referral code via Telegram
    const referralText = `Join jetshr and get ₽50 bonus! Use my code: JETSHR24\n\nhttps://t.me/jetshr_bot?start=JETSHR24`;

    if (navigator.share) {
      navigator.share({
        title: "Join jetshr",
        text: referralText,
      });
    } else {
      navigator.clipboard.writeText(referralText);
      if (
        typeof window !== "undefined" &&
        window.Telegram &&
        window.Telegram.WebApp &&
        typeof window.Telegram.WebApp.showAlert === "function"
      ) {
        window.Telegram.WebApp.showAlert("Referral code copied to clipboard!");
      } else {
        alert("Referral code copied to clipboard!");
      }
    }
  };

  return (
    <PageWrapper>
      <div className="p-4 space-y-6 h-full overflow-y-auto w-full">
        {/* Profile Header */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">JD</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold">John Doe</h1>
            <p className="text-gray-600">+7 (999) 123-45-67</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">24</div>
            <div className="text-sm text-gray-600">Total Rides</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">5.2kg</div>
            <div className="text-sm text-gray-600">CO₂ Saved</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">18.5km</div>
            <div className="text-sm text-gray-600">Distance</div>
          </div>
        </div>

        {/* Eco Impact Card */}
        <Card className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sprout className="h-6 w-6" />
                <span className="font-semibold">Eco Impact</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={handleShareToStories}
              >
                <Share className="h-5 w-5" />
              </Button>
            </div>

            <div className="mb-4">
              <div className="text-3xl font-bold mb-1">5.2 kg CO₂</div>
              <div className="text-green-100">Carbon emissions saved</div>
            </div>

            <div className="bg-white/20 rounded-lg p-3 mb-4">
              <div className="text-sm font-medium mb-1">
                Environmental Impact
              </div>
              <div className="flex items-center gap-2">
                <span>Equivalent to planting</span>
                <Sprout className="h-4 w-4" />
                <span className="font-semibold">10 trees</span>
              </div>
            </div>

            <Button
              className="w-full bg-white text-green-600 hover:bg-gray-100"
              onClick={handleShareToStories}
            >
              Share to Telegram Stories
            </Button>
          </CardContent>
        </Card>

        {/* Achievements */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-600" />
            <h2 className="text-lg font-semibold">Achievements</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement) => {
              const IconComponent = achievement.icon;
              return (
                <Card
                  key={achievement.id}
                  className={`${achievement.color} ${
                    !achievement.earned ? "opacity-50" : ""
                  }`}
                >
                  <CardContent className="p-4 text-center">
                    <IconComponent className="h-8 w-8 mx-auto mb-2" />
                    <div className="font-semibold text-sm">
                      {achievement.name}
                    </div>
                    <div className="text-xs text-gray-600">
                      {achievement.description}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Referral Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Share className="h-5 w-5 text-blue-600" />
            Invite Friends
          </h2>

          <Card className="bg-gray-50">
            <CardContent className="p-4 text-center">
              <div className="text-sm text-gray-600 mb-2">
                Your referral code
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-2">
                JETSHR24
              </div>
              <div className="text-sm text-gray-600 mb-4">
                Share and get ₽50 bonus for each friend who joins!
              </div>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={handleShareReferral}
              >
                <Share className="h-4 w-4 mr-2" />
                Share Referral Code
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
