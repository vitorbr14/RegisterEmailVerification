import React from "react";

const SubmitButton = () => {
  return (
    <button
      type="submit"
      className="
                  flex
                  mt-2
                  items-center
                  justify-center
                  focus:outline-none
                  text-white text-sm
                  sm:text-base
                  bg-blue-500
                  hover:bg-blue-600
                  rounded-2xl
                  py-2
                  w-full
                  transition
                  duration-150
                  ease-in
                "
    >
      <span className="mr-2 uppercase">Sign Up</span>
    </button>
  );
};

export default SubmitButton;
