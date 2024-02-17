import { Dayjs } from "dayjs";
type TDateDayjs = Date | Dayjs;
type TFormatDate = (date: TDateDayjs) => string;

export const twoMonthsAgo: TDateDayjs = new Date();
twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
twoMonthsAgo.setHours(0, 0, 0, 0); // Set time to start of the day

export const yesterday: TDateDayjs = new Date();
yesterday.setDate(yesterday.getDate() - 1);
yesterday.setHours(23, 59, 59, 999); // Set time to end of the day

export const formatDate: TFormatDate = (date) => {
  const days: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const actualDate: Date = date instanceof Date ? date : date.toDate();

  const dayOfWeek = days[actualDate.getDay()];
  const day = actualDate.getDate().toString().padStart(2, "0");
  const month = months[actualDate.getMonth()];
  const year = actualDate.getFullYear();
  const hours = actualDate.getHours().toString().padStart(2, "0");
  const minutes = actualDate.getMinutes().toString().padStart(2, "0");
  const seconds = actualDate.getSeconds().toString().padStart(2, "0");

  const formattedDate = `${dayOfWeek}, ${day} ${month} ${year} ${hours}:${minutes}:${seconds} GMT`;

  return formattedDate;
};

export const twoMonthsAgoFormatted: string = formatDate(twoMonthsAgo);
export const yesterdayFormatted: string = formatDate(yesterday);
