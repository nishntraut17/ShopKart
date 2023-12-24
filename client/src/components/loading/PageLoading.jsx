import React from "react";
import Lottie from "lottie-react";
import Animation from "../../static/Animation.json";

const PageLoading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie
        animationData={Animation}
        loop={true}
        className="w-80 h-80"
      />
    </div>
  );
};

export default PageLoading;
