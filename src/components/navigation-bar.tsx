"use client";

import { Button } from "./ui/button";
import { ScanQrCode, User, History } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  {
    id: "home",
    label: "Главная",
    icon: ScanQrCode,
    path: "/",
  },
  {
    id: "profile",
    label: "Профиль",
    icon: User,
    path: "/profile",
  },
  {
    id: "history",
    label: "История",
    icon: History,
    path: "/history",
  },
];

export default function NavigationBar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="relative bg-white border-t border-gray-200 px-4 py-2 pb-5 z-1 w-full">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`flex-col h-auto py-2 px-3 ${
                isActive ? "text-blue-600" : "text-gray-600"
              }`}
              onClick={() => navigate(item.path)}
            >
              <IconComponent className="h-5 w-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}
