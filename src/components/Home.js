import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        src="https://i.pinimg.com/564x/a0/d1/13/a0d1139e1db44c3f40c7e8b9185af20a.jpg"
        alt="quiz icon"
      />
      <Link
        to="/quiz"
        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Start Quiz
      </Link>
    </div>
  );
};

export default Home;
