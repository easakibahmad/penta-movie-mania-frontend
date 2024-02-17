/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router-dom";
import { FaHome, FaBookmark, FaFilm } from "react-icons/fa";
import { DatePicker } from "antd";
import { yesterday } from "./nav_components/NavUtils";
const { RangePicker } = DatePicker;
import logo from "../assets/logo.png";
import { SearchOutlined } from "@ant-design/icons";
import { setDateRange } from "../redux/features/date_range/dateRangeSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { useState } from "react";
import { Dayjs } from "dayjs";

type TDate = Dayjs | Date | null;
const Navbar = () => {
  const watchlistLength = useAppSelector(
    (state: RootState) => state.watchList.watchlist
  );

  const dateRange = useAppSelector((state: RootState) => state.dateRange);

  const navItemsStyle: string = "flex items-center";
  const linkHoverClass: string = "hover:text-blue-500"; // Define a CSS class for link hover effect

  const dispatch = useDispatch();

  const [selectedDates, setSelectedDates] = useState<[TDate, TDate]>([
    null,
    null,
  ]);
  const handleDateRangeChange = (
    dates: [TDate, TDate],
    dateStrings: [string, string]
  ): void => {
    if (dates && dates.length === 2) {
      setSelectedDates(dates);
      const [startDate, endDate] = dates.map(
        (date: TDate) => date?.toString() ?? ""
      );
      dispatch(setDateRange({ startDate, endDate }));
    } else {
      setSelectedDates([null, null]);
    }
  };

  const disabledDate = (current: Date | Dayjs): boolean => {
    return current && current > yesterday;
  };
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    event.preventDefault();
    const href = event.currentTarget.getAttribute("href");
    if (href) {
      setTimeout(() => {
        window.location.href = href;
      }, 500);
    }
  };

  const isSearchDisabled: boolean = !selectedDates[0] || !selectedDates[1];

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

          <Link
            to={`/movie/${
              dateRange.dateRange.startDate + "&" + dateRange.dateRange.endDate
            }`}
            // onClick={handleClick}
            className={` border-2 px-3 py-1 rounded-full ${
              isSearchDisabled && "pointer-events-none"
            } ${!isSearchDisabled && "border-blue-500 text-blue-500"}`}
            onClick={
              isSearchDisabled ? (event) => event.preventDefault() : handleClick
            }
          >
            Search
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
