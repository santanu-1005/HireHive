import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Home = () => {
  const { loading, error } = useGetAllJobs();
  const jobs = useSelector((state) => state.jobs.allJobs);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "Recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Categories />

        {loading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
            <p className="ml-4 text-blue-500 font-medium">Loading jobs...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        )}

        {!loading && !error && jobs?.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-center">Latest Jobs</h2>
            <LatestJobs jobs={jobs} />
          </>
        )}

        {!loading && !error && jobs?.length === 0 && (
          <p className="text-center text-gray-500">No jobs available at the moment.</p>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
