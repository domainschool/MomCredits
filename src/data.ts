export interface Coupon {
  id: string;
  title: string;
  description: string;
  style: {
    gradient: string;
    icon: string;
  };
  isCustom?: boolean;
}

export const coupons: Coupon[] = [
  {
    id: "1",
    title: "The Master Chef Special",
    description: "A 3-course dinner cooked entirely by me.",
    style: {
      gradient: "from-orange-400 to-rose-500",
      icon: "🧑‍🍳"
    }
  },
  {
    id: "2",
    title: "The Zen Zone Pass",
    description: "2 hours of total silence and zero requests from anyone.",
    style: {
      gradient: "from-teal-400 to-emerald-500",
      icon: "🧘‍♀️"
    }
  },
  {
    id: "3",
    title: "Digital Detox Assistant",
    description: "I’ll handle all your tech issues, app updates, and 'how-do-I-do-this' questions for a day.",
    style: {
      gradient: "from-blue-400 to-indigo-500",
      icon: "📱"
    }
  },
  {
    id: "4",
    title: "The 'Yes' Day",
    description: "For 3 hours, the answer to any reasonable request you have is 'Yes.'",
    style: {
      gradient: "from-fuchsia-400 to-purple-500",
      icon: "✨"
    }
  },
  {
    id: "5",
    title: "Laundry Legend",
    description: "I will wash, dry, fold, and actually *put away* two full loads.",
    style: {
      gradient: "from-sky-400 to-blue-500",
      icon: "🧺"
    }
  },
  {
    id: "6",
    title: "Car Spa Day",
    description: "A deep interior clean, exterior wash, and a full tank of gas.",
    style: {
      gradient: "from-slate-400 to-gray-600",
      icon: "🚗"
    }
  },
  {
    id: "7",
    title: "The Ultimate Bed-In",
    description: "Breakfast, hot coffee, and the TV remote delivered to your bed.",
    style: {
      gradient: "from-rose-400 to-pink-500",
      icon: "☕"
    }
  },
  {
    id: "8",
    title: "Memory Lane Walk",
    description: "I will curate and organize 100 of your phone photos into a beautiful digital album.",
    style: {
      gradient: "from-amber-400 to-orange-500",
      icon: "📸"
    }
  },
  {
    id: "9",
    title: "Grocery Hero",
    description: "You write the list; I do the shopping and the heavy lifting.",
    style: {
      gradient: "from-green-400 to-emerald-600",
      icon: "🛒"
    }
  },
  {
    id: "10",
    title: "Garden Guardian",
    description: "A full afternoon of weeding, watering, and repotting your plants.",
    style: {
      gradient: "from-lime-400 to-green-500",
      icon: "🪴"
    }
  }
];
