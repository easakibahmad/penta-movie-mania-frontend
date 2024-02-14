

  export const twoMonthsAgo = new Date();
twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
twoMonthsAgo.setHours(0, 0, 0, 0); // Set time to start of the day

export const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
yesterday.setHours(23, 59, 59, 999); // Set time to end of the day

function formatDate(date: Date): string {
  const days: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months: string[] = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const dayOfWeek = days[date.getDay()];
  const day = date.getDate().toString().padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  const formattedDate = `${dayOfWeek}, ${day} ${month} ${year} ${hours}:${minutes}:${seconds} GMT`;

  return formattedDate;
}

// Example usage
export const twoMonthsAgoFormatted = formatDate(twoMonthsAgo);
export const yesterdayFormatted = formatDate(yesterday);
 
