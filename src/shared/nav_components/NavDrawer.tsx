/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Drawer, Space } from "antd";
import { LiaBarsSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { FaHome, FaBookmark, FaFilm } from "react-icons/fa";
import {  DatePicker } from "antd";
import {  SearchOutlined } from "@ant-design/icons";
import { twoMonthsAgo, yesterday } from "./NavUtils";
const { RangePicker } = DatePicker;
import logo from "../../assets/logo.png";

const NavDrawer = () => {
  const [open, setOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState([
    twoMonthsAgo,
    yesterday,
  ]);

  const handleDateRangeChange = (dates: any) => {
    setSelectedDateRange(dates);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleLinkClick = () => {
    setOpen(false);
  };

  console.log(selectedDateRange);

  return (
    <>
      <Space
        className="flex justify-start bg-black py-2 pl-3 gap-6 border-b-2 border-yellow-500"
        style={{ color: "#006699" }}
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
            <a
              className="ant-dropdown-link flex items-center hover:text-blue-500"
              onClick={(e) => e.preventDefault()}
            >
              <FaFilm className="mr-1" /> Genre
            </a>
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
        <div className="grid grid-cols-1 mt-3">
          <span className="-mb-2 flex items-center">
            <SearchOutlined className="mr-1" /> Search Movies by Date Range
          </span>
          <RangePicker
            className="text-blue-500 mt-4"
            style={{ border: "1px solid #ccc", borderRadius: "5px" }}
            picker="date"
            placeholder={["Start Date", "End Date"]}
            onChange={handleDateRangeChange}
          />
        </div>
      </Drawer>
    </>
  );
};

export default NavDrawer;
