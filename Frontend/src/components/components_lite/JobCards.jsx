import React from "react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const JobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-lg shadow-lg bg-white border border-gray-200 cursor-pointer hover:shadow-xl hover:bg-gray-50 transition duration-300 ease-in-out"
      aria-label={`View details of ${job.title} at ${job.name}`}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-gray-800">{job.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
        <div className="flex-1">
          <h2 className="font-bold text-xl my-2 text-gray-700">{job.title}</h2>
          <p className="text-sm text-gray-600">{job.description}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 items-center justify-start">
        <Badge className="text-blue-600 font-bold" variant="ghost">
          {job.position} Open Positions
        </Badge>
        <Badge className="text-[#FA4F09] font-bold" variant="ghost">
          {job.salary} LPA
        </Badge>
        <Badge className="text-[#6B3AC2] font-bold" variant="ghost">
          {job.location}
        </Badge>
        <Badge className="text-black font-bold" variant="ghost">
          {job.jobType}
        </Badge>
      </div>
    </div>
  );
};

export default JobCards;
