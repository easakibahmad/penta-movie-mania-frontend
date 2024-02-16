/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaBookmark, FaFilm } from "react-icons/fa";
import { Button, DatePicker } from "antd";
import { yesterday } from "./nav_components/NavUtils";
const { RangePicker } = DatePicker;
import logo from "../assets/logo.png";
import { SearchOutlined } from "@ant-design/icons";
import { setDateRange } from "../redux/features/date_range/dateRangeSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";

const Navbar = () => {
  const navigate = useNavigate();
  const watchlistLength = useAppSelector(
    (state: RootState) => state.watchList.watchlist
  );

  console.log(watchlistLength);
  const dateRange = useAppSelector((state: RootState) => state.dateRange);
  console.log(dateRange);

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
  const handleClick = () => {
    navigate(
      `/movie/${
        dateRange.dateRange.startDate + "&" + dateRange.dateRange.endDate
      }`
    );
    setTimeout(() => window.location.reload(), 500);
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
          <Link to="/genre" className={`${navItemsStyle} ${linkHoverClass}`}>
            <FaFilm className="mr-1" /> Genre
          </Link>
        </li>

        <li>
          <Link
            to="/watchlist"
            className={`${navItemsStyle} ${linkHoverClass}`}
          >
            <FaBookmark className="mr-2" /> Watchlist
            <span className="text-green-500 font-bold text-md mb-2 ml-1">
              {watchlistLength != 0 && `(${watchlistLength})`}
            </span>
          </Link>
        </li>
      </ul>
      <div className="grid grid-cols-1">
        <span className="text-sm flex items-center">
          <SearchOutlined className="mr-1" /> Search Movies by Date
        </span>
        <div className="flex justify-between gap-2">
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
          <Button className="text-white" onClick={handleClick}>
            Search
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
