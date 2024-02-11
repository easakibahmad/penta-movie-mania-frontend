import { Link } from "react-router-dom";
import {
  FaHome,
  FaBookmark,
  FaFilm,
  FaStar,
  FaTheaterMasks,
  FaLaugh,
  FaHeart,
} from "react-icons/fa";
import { Menu, Dropdown, DatePicker } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";
const { RangePicker } = DatePicker;

const Navbar = () => {
  const navItemsStyle = "flex items-center";
  const linkHoverClass = "hover:text-blue-500"; // Define a CSS class for link hover effect
  const [selectedDateRange, setSelectedDateRange] = useState([
    new Date("2024-01-01"),
    new Date("2024-01-01"),
  ]);

  const handleDateRangeChange = (dates: [Date, Date]) => {
    setSelectedDateRange(dates);
    // console.log("Selected Date Range:", dates[0].$d, dates[1].$d);
  };

  console.log(selectedDateRange);

  const menu = (
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

  return (
    <nav className="bg-black text-white flex items-center justify-between gap-8 h-16 px-4">
      <ul className="flex items-center gap-4">
        <Link to="/movie" className="text-2xl font-bold">
          Penta Movie Mania
        </Link>
        <li>
          <Link to="/movie" className={`${navItemsStyle} ${linkHoverClass}`}>
            <FaHome className="mr-2" /> Home
          </Link>
        </li>
        <li>
          <Link
            to="/watchlist"
            className={`${navItemsStyle} ${linkHoverClass}`}
          >
            <FaBookmark className="mr-2" /> Watchlist
          </Link>
        </li>
        <li>
          <Dropdown overlay={menu}>
            <a
              className={`ant-dropdown-link ${navItemsStyle} ${linkHoverClass}`}
              onClick={(e) => e.preventDefault()}
            >
              <FaFilm className="mr-1" /> Genre{" "}
              <DownOutlined className="ml-2" style={{ fontSize: "10px" }} />
            </a>
          </Dropdown>
        </li>
      </ul>
      <RangePicker
        className="text-blue-500"
        style={{
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
        picker="date"
        placeholder={["Start Date", "End Date"]}
        onChange={handleDateRangeChange}
      />
    </nav>
  );
};

export default Navbar;
