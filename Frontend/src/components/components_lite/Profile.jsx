import React, { useState, useRef } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import AppliedJob from "./AppliedJob";
import EditProfileModal from "./EditProfileModal";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data";
import axios from "axios"; // Make sure you import axios if it's not already

const Profile = () => {
  useGetAppliedJobs();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    file: null,
  });

  const fileInputRef = useRef(null); // Create a ref for the file input

  // Prevent rendering if user data is not available
  if (!user) {
    return <div>Loading...</div>;
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!input.file) {
      toast.error("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", input.file);

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_ENDPOINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success("File Uploaded");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <Navbar />

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl shadow-xl p-8 hover:shadow-xl transition-shadow duration-300">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-5">
            <Avatar className="cursor-pointer h-24 w-24">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                alt="Profile Picture"
                className="rounded-full"
              />
            </Avatar>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                {user?.fullname}
              </h1>
              <p className="text-gray-600">
                {user?.profile?.bio ? user.profile.bio : "No bio available"}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right border-2 border-gray-300 text-gray-700 hover:border-yellow-500 hover:text-yellow-500 p-2 rounded-full transition-all duration-300"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>

        {/* Contact Info */}
        <div className="my-5">
          <div className="flex items-center gap-3 my-2 text-gray-700">
            <Mail />
            <a
              href={`mailto:${user?.email}`}
              className="hover:text-blue-600 transition-colors duration-200"
            >
              {user?.email}
            </a>
          </div>
          <div className="flex items-center gap-3 my-2 text-gray-700">
            <Contact />
            <span className="hover:text-blue-600 transition-colors duration-200 cursor-pointer">
              {user?.phoneNumber || "NA"}
            </span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="my-5">
          <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
          <div className="flex gap-2 mt-2">
            {user?.profile?.skills?.length ? (
              user?.profile?.skills.map((skill, index) => (
                <Badge key={index} className="bg-blue-100 text-blue-600">
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500">No skills listed</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="my-5">
          <div className="text-md font-semibold text-gray-800">Resume</div>
          <div className="mt-2">
            {user?.profile?.resume ? (
              <a
                target="_blank"
                href={user?.profile?.resume}
                className="inline-block bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-4 py-2 transition-all duration-300"
              >
                <span className="font-semibold">Download</span>{" "}
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <Button
                onClick={() => fileInputRef.current.click()} // Trigger file input click
                className="bg-white hover:bg-blue-600 rounded-lg text-blue-600 hover:text-white"
              >
                Upload Resume
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-xl p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-5">
          Applied Jobs
        </h2>
        <AppliedJob />
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
