import React from "react";
import Lottie from "lottie-react";
import Animation from "../../static/Loading.json";

const PageLoading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie
        animationData={Animation}
        loop={true}
        className="w-40 h-40"
      />
    </div>
  );
};

export default PageLoading;
