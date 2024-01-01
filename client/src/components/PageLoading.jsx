import React from "react";
import Lottie from "lottie-react";
import Animation from "../assets/Loading.json";

const PageLoading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie
        animationData={Animation}
        loop={true}
        className="w-32 h-32"
      />
    </div>
  );
};

export default PageLoading;
