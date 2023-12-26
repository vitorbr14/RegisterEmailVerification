import React from "react";

const Form = () => {
  return (
    <div className="container md-auto bg-blue-300 h-4 text-cyan-100 h-screen m-auto md:flex">
      <div className="relative overflow-hidden md:flex w-1/2  bg-blue-500 justify-around items-center hidden"></div>
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form action="">
          <div className="flex flex-col">
            <small className="text-gray-500">Name</small>
            <input type="text" className="my-2 border-2 py-1 text-black px-4" />
          </div>
          <div className="flex flex-col">
            <small className="text-gray-500">Email address</small>
            <input
              type="email"
              className="my-2 border-2 py-1 text-black px-4 "
            />
          </div>
          <div className="flex flex-col">
            <small className="text-gray-500">Password</small>
            <input
              type="password"
              className="my-2 border-2 py-1 text-black px-4"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
