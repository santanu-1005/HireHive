import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = () => {
    if (!query.trim()) return;
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="bg-white py-16">
      <div className="text-center max-w-4xl mx-auto px-4">
        <div className="flex flex-col gap-6">
          <span className="inline-flex items-center gap-2 mx-auto px-5 py-2 rounded-full bg-purple-100 text-purple-800 font-semibold text-sm">
            <PiBuildingOfficeBold size={18} className="text-purple-700" />
            Welcome to <span className="text-purple-700 font-bold">HirehHive</span>
          </span>

          <h2 className="text-5xl font-bold leading-tight text-gray-800">
            Search, Apply & <br />
            Get Your <span className="text-purple-700">Dream Job</span>
          </h2>

          <p className="text-gray-600 text-lg">
            Start your hunt for the best, life-changing career opportunities
            from here. Find jobs in your preferred areas and get hired quickly.
          </p>

          <div className="flex w-full max-w-xl mx-auto border border-gray-300 shadow-md rounded-full overflow-hidden bg-white">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find Your Dream Job"
              className="w-full px-6 py-2 text-gray-700 focus:outline-none"
            />
            <Button
              onClick={searchjobHandler}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-none rounded-r-full px-5 py-5"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
