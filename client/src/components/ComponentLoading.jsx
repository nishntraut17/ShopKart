import React from "react";
import Lottie from "lottie-react";
import componentLoading from "../assets/componentLoading.json";

const ComponentLoading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie
        animationData={componentLoading}
        loop={true}
        className="w-80 h-80"
      />
    </div>
  );
};

export default ComponentLoading;
