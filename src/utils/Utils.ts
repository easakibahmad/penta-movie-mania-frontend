export function formatDateString(inputString: string): Date {
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

  const array: string[] = inputString?.split(/\s|,\s?/);

  // Validate array length to ensure it has enough elements
  if (array.length < 6) {
    throw new Error("Invalid input format");
  }

  const day: number = parseInt(array[1]);
  const month: number = months.indexOf(array[2]);
  const year: number = parseInt(array[3]);
  const hours: number = parseInt(array[4].split(":")[0]);
  const minutes: number = parseInt(array[4].split(":")[1]);
  const seconds: number = parseInt(array[4].split(":")[2]);

  return new Date(year, month, day, hours, minutes, seconds);
}
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  }); 
};
