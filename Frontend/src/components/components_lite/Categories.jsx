import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Button } from "../ui/button";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "MERN Developer",
  "Data Scientist",
  "DevOps Engineer",
  "Machine Learning Engineer",
  "AI Engineer",
  "Cybersecurity Engineer",
  "Product Manager",
  "UX/UI Designer",
  "Graphics Engineer",
  "Graphics Designer",
  "Video Editor",
];

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  const [sliderRef] = useKeenSlider({
    loop: true, // Infinite scroll
    mode: "free-snap", // Smooth snapping between slides
    slides: {
      perView: 3, // Show 3 slides at a time
      spacing: 15, // Space between slides
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: { perView: 1.2, spacing: 10 },
      },
      "(min-width: 769px) and (max-width: 1024px)": {
        slides: { perView: 2.2, spacing: 12 },
      },
    },
    created(s) {
      // Automatically scroll to the next slide every 2.5 seconds
      setInterval(() => {
        s.next();
      }, 2500);
    },
  });

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white py-12 px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-700">Explore Job Categories</h2>
        <p className="text-gray-600 mt-2">Find your next opportunity here.</p>
      </div>

      <div ref={sliderRef} className="keen-slider">
        {categories.map((category, index) => (
          <div key={index} className="keen-slider__slide">
            <div className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition-all duration-300 p-6 mx-2 text-center">
              <Button
                variant="outline"
                className="w-full text-white bg-blue-700 hover:bg-blue-600 hover:text-white font-medium"
                onClick={() => searchJobHandler(category)}
              >
                {category}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
