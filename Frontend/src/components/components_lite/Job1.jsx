import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Bookmark } from "lucide-react";

const Job1 = ({ job }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="p-5 rounded-xl shadow-lg bg-white border border-gray-100 hover:shadow-xl transition-shadow duration-300 max-w-[600px] w-full mx-auto">
      {/* Job time and bookmark button */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="outline"
          className={`rounded-full ${isBookmarked ? "bg-black" : ""}`}
          size="icon"
          onClick={() => setIsBookmarked(!isBookmarked)}
        >
          <Bookmark className={isBookmarked ? "text-white" : "text-black"} />
        </Button>
      </div>

      {/* Company info and avatar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 my-4">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage
              src={job?.company?.logo}
              alt={`${job?.company?.name} logo`}
            />
          </Avatar>
        </Button>
        <div className="text-center sm:text-left">
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      {/* Job title, description, and job details */}
      <div>
        <h2 className="font-bold text-xl mb-2">{job?.title}</h2>
        <p className="text-sm text-gray-600 mb-4">{job?.description}</p>
        <div className="flex flex-wrap gap-2">
          <Badge className="text-blue-700 font-bold" variant="ghost">
            {job?.position} Positions
          </Badge>
          <Badge className="text-[#F83002] font-bold" variant="ghost">
            {job?.jobType}
          </Badge>
          <Badge className="text-[#7209b7] font-bold" variant="ghost">
            {job?.salary}LPA
          </Badge>
        </div>
      </div>

      {/* Actions: Details and Save for Later */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="font-semibold rounded-sm w-full sm:w-auto"
        >
          Details
        </Button>
        <Button
          variant="outline"
          className="bg-[#7209b7] text-white font-semibold rounded-sm w-full sm:w-auto"
        >
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job1;
