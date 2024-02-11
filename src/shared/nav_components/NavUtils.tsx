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