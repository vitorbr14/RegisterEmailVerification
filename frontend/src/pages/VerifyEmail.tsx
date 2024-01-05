import React from "react";
import SubmitButton from "../components/SubmitButton";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

type Inputs = {
  user_id: number;
};

const VerifyEmail = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    axios
      .patch(`http://localhost:5003/api/v1/auth/verify/${id}`, data)

      .then(function (response) {
        console.log(response);
        navigate(`/dashboard/${id}`);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  let { id } = useParams();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div
        className="
          flex flex-col
          bg-white
          shadow-md
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          py-8
          rounded-3xl
          w-50
          max-w-md
        "
      >
        <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
          Register Now! {id}
        </div>
        <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
          Enter your credentials to get access account
        </div>

        <div className="mt-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mb-5">
              <label className="mb-1 text-xs tracking-wide text-gray-600">
                Code:
              </label>
              <div className="relative">
                <div
                  className="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                >
                  <i className="fas fa-user text-blue-500"></i>
                </div>

                <input
                  id="email"
                  type="number"
                  className="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                  placeholder="Enter your code"
                  {...register("user_id")}
                />
              </div>
            </div>

            <div className="flex w-full">
              <SubmitButton text="Enviar" />
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-center items-center mt-6">
        <a
          href="#"
          target="_blank"
          className="
            inline-flex
            items-center
            text-gray-700
            font-medium
            text-xs text-center
          "
        >
          <span className="ml-2">
            Didn't receive your verification code?
            <a href="#" className="text-xs ml-2 text-blue-500 font-semibold">
              Resend here
            </a>
          </span>
        </a>
      </div>
    </div>
  );
};

export default VerifyEmail;
