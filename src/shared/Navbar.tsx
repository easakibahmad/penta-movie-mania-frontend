/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { FaHome, FaBookmark, FaFilm } from "react-icons/fa";
import { Dropdown, DatePicker } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { dropdownMenuNav, yesterday } from "./nav_components/NavUtils";
const { RangePicker } = DatePicker;
import logo from "../assets/logo.png";
import { SearchOutlined } from "@ant-design/icons";
import { setDateRange } from "../redux/features/date_range/dateRangeSlice";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const navItemsStyle = "flex items-center";
  const linkHoverClass = "hover:text-blue-500"; // Define a CSS class for link hover effect

  const dispatch = useDispatch();
  const handleDateRangeChange = (dates: any) => {
    if (dates && dates.length === 2) {
      const [startDate, endDate] = dates.map((date: any) => date.toString());
      dispatch(setDateRange({ startDate, endDate }));
    }
  };

  const disabledDate = (current: any) => {
    return current && current > yesterday;
  };

  return (
    <nav
      style={{ backgroundColor: "#36454F	", height: "74px" }}
      className="  text-white flex items-center justify-between gap-8 px-4"
    >
      <ul className="flex items-center gap-4">
        <Link
          to="/movie"
          className="text-2xl mr-16 font-bold flex items-center gap-2"
        >
          <img src={logo} className="w-12 h-12 rounded-full" alt="logo" />
          <span>Penta Movie Mania</span>
        </Link>
        <li>
          <Link to="/movie" className={`${navItemsStyle} ${linkHoverClass}`}>
            <FaHome className="mr-2" /> Home
          </Link>
        </li>
        <li>
          <Dropdown overlay={dropdownMenuNav}>
            <a
              className={`ant-dropdown-link ${navItemsStyle} ${linkHoverClass}`}
              onClick={(e) => e.preventDefault()}
            >
              <FaFilm className="mr-1" /> Genre{" "}
              <DownOutlined className="ml-2" style={{ fontSize: "10px" }} />
            </a>
          </Dropdown>
        </li>
        <li>
          <Link
            to="/watchlist"
            className={`${navItemsStyle} ${linkHoverClass}`}
          >
            <FaBookmark className="mr-2" /> Watchlist
          </Link>
        </li>
      </ul>
      <div className="grid grid-cols-1">
        <span className="text-sm flex items-center">
          <SearchOutlined className="mr-1" /> Search Movies by Date Range
        </span>
        <RangePicker
          className="text-blue-500"
          style={{
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
          picker="date"
          placeholder={["Start Date", "End Date"]}
          onChange={handleDateRangeChange}
          disabledDate={disabledDate}
        />
      </div>
    </nav>
  );
};

export default Navbar;
