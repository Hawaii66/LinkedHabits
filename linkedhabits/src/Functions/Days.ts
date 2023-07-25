import { format } from "date-fns";

export const IndexToName = (index: number) => {
  switch (index) {
    case 0:
      return "Mon";
    case 1:
      return "Tue";
    case 2:
      return "Wed";
    case 3:
      return "Thu";
    case 4:
      return "Fri";
    case 5:
      return "Sat";
    case 6:
      return "Sun";
  }

  return "";
};

export const GetNextDay = (days: number[]) => {
  var index = parseInt(format(new Date(), "i")) - 1;
  var t = 0;

  while (t < 20) {
    t += 1;
    if (days.includes(index)) {
      const isToday = index === parseInt(format(new Date(), "i")) - 1;
      return isToday ? "Today" : IndexToName(index);
    }

    index = (index + 1) % 7;
  }

  return "";
};
