import React from "react";
import { useSelector } from "react-redux";
import JobCards from "./JobCards";

const LatestJobs = () => {
  const allJobs = useSelector((state) => state.jobs?.allJobs || []);
  const latestJobs = allJobs.slice(0, 6);

  return (
    <section className="max-w-7xl mx-auto my-20 px-4">
      <h2 className="text-4xl font-bold mb-6">
        <span className="text-[#6A38C2]">Latest & Top </span>Job Openings
      </h2>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        role="list"
      >
        {latestJobs.length > 0 ? (
          latestJobs.map((job) =>
            job?._id ? (
              <JobCards key={job._id} job={job} />
            ) : (
              <div key={Math.random()} className="text-red-500">
                Invalid Job Data
              </div>
            )
          )
        ) : (
          <div className="col-span-full text-gray-500 text-lg">
            No job openings available at the moment.
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestJobs;
