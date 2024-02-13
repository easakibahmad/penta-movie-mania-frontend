import { Menu } from "antd";
import { FaHeart, FaLaugh, FaStar, FaTheaterMasks } from "react-icons/fa";
import { Link } from "react-router-dom";

export const dropdownMenuNav = (
  <Menu style={{ borderRadius: 0, marginTop: "15px" }}>
    <Menu.Item key="1" icon={<FaStar />}>
      <Link to="/genre/action">Action</Link>
    </Menu.Item>
    <Menu.Item key="2" icon={<FaTheaterMasks />}>
      <Link to="/genre/adventure">Adventure</Link>
    </Menu.Item>
    <Menu.Item key="3" icon={<FaLaugh />}>
      <Link to="/genre/comedy">Comedy</Link>
    </Menu.Item>
    <Menu.Item key="4" icon={<FaHeart />}>
      <Link to="/genre/drama">Drama</Link>
    </Menu.Item>
  </Menu>
);

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
 
