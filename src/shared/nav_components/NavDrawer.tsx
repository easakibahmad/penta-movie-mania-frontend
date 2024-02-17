/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Drawer, Space } from "antd";
import { LiaBarsSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { FaHome, FaBookmark, FaFilm } from "react-icons/fa";
import {  DatePicker } from "antd";
import {  SearchOutlined } from "@ant-design/icons";
import { yesterday } from "./NavUtils";
const { RangePicker } = DatePicker;
import logo from "../../assets/logo.png";
import { useDispatch } from "react-redux";
import { setDateRange } from "../../redux/features/date_range/dateRangeSlice";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

const NavDrawer = () => {
  const [open, setOpen] = useState(false);
  const dateRange = useAppSelector((state: RootState) => state.dateRange);
  const dispatch = useDispatch();
   const [selectedDates, setSelectedDates] = useState<
     [Date | null, Date | null]
   >([null, null]);

   const handleDateRangeChange = (dates: any) => {
     if (dates && dates.length === 2) {
       setSelectedDates(dates);
       const [startDate, endDate] = dates.map((date: any) => date.toString());
       dispatch(setDateRange({ startDate, endDate }));
     } else {
       setSelectedDates([null, null]);
     }
   };

  const disabledDate = (current: any) => {
    return current && current > yesterday;
  };
  const handleClick = (event: any) => {
    event.preventDefault();
    const href = event.currentTarget.getAttribute("href");
    if (href) {
      setTimeout(() => {
        window.location.href = href;
      }, 500);
    }
  };

  const isSearchDisabled = !selectedDates[0] || !selectedDates[1];

  const onClose = () => {
    setOpen(false);
  };

  const handleLinkClick = () => {
    setOpen(false);
  };


  return (
    <>
      <Space
        className="flex justify-start bg-black py-2 pl-3 gap-6"
        style={{ color: "#006699", backgroundColor: "#36454F	" }}
      >
        <span
          className="text-3xl text-white font-bold cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <LiaBarsSolid />
        </span>
        <span className="text-md flex items-center gap-2 text-white font-bold">
          {" "}
          <img className="w-6 h-6 rounded-full" src={logo} alt="Logo" />
          Penta Movie Mania
        </span>
      </Space>
      <Drawer
        title="Penta Movie Mania"
        placement="left"
        onClose={onClose}
        visible={open}
      >
        <ul className="flex flex-col gap-4">
          <li>
            <Link
              to="/movie"
              className="flex items-center hover:text-blue-500"
              onClick={handleLinkClick}
            >
              <FaHome className="mr-2" /> Home
            </Link>
          </li>
          <li>
            <Link
              to="/genre"
              className="flex items-center hover:text-blue-500"
              onClick={handleLinkClick}
            >
              <FaFilm className="mr-2" /> Genre
            </Link>
          </li>
          <li>
            <Link
              to="/watchlist"
              className="flex items-center hover:text-blue-500"
              onClick={handleLinkClick}
            >
              <FaBookmark className="mr-2" /> Watchlist
            </Link>
          </li>
        </ul>
        <div className="grid grid-cols-1 mt-4">
          <span className="text-sm flex items-center">
            <SearchOutlined className="mr-1" /> Search Movies by Date
          </span>
          <div className="grid grid-cols-1 gap-4">
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

            <div className="w-40">
              <Link
                to={`/movie/${
                  dateRange.dateRange.startDate +
                  "&" +
                  dateRange.dateRange.endDate
                }`}
                // onClick={handleClick}
                className={` border-2 px-3 py-1 rounded-full ${
                  isSearchDisabled && "pointer-events-none"
                } ${!isSearchDisabled && "border-blue-500 text-blue-500"}`}
                onClick={
                  isSearchDisabled
                    ? (event) => event.preventDefault()
                    : handleClick
                }
              >
                Search
              </Link>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default NavDrawer;
