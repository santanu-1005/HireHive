import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/data";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res?.data?.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      } else {
        console.error("Logout failed:", res.data);
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-4">
        {/* Brand */}
        <Link to="/">
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-indigo-600">Hire</span>
            <span className="text-orange-500">Hive</span>
          </h1>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-10">
          <ul className="flex gap-6 text-sm font-medium text-gray-700">
            {user?.role === "Recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies" className="hover:text-indigo-600">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="hover:text-indigo-600">
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/Home" className="hover:text-indigo-600">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/Browse" className="hover:text-indigo-600">
                    Browse
                  </Link>
                </li>
                <li>
                  <Link to="/Jobs" className="hover:text-indigo-600">
                    Jobs
                  </Link>
                </li>
                {/* <li>
                  <Link to="/Creator" className="hover:text-indigo-600">
                    About
                  </Link>
                </li> */}
              </>
            )}
          </ul>

          {/* Auth Actions */}
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline" className="rounded-md px-4 py-1.5">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-md px-4 py-1.5">
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer border">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="Profile"
                    className="object-cover"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4">
                <div className="flex items-center gap-4 mb-3">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-800">{user?.fullname}</h3>
                    <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {user?.role === "Student" && (
                    <div className="flex items-center gap-2">
                      <User2 size={18} className="text-gray-500" />
                      <Link to="/Profile">
                        <Button variant="link" className="p-0 text-gray-700 hover:text-indigo-600">
                          Profile
                        </Button>
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <LogOut size={18} className="text-gray-500" />
                    <Button onClick={logoutHandler} variant="link" className="p-0 text-gray-700 hover:text-red-600">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
