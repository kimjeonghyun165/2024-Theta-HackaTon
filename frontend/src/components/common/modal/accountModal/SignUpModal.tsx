import { z } from "zod";
import InputField from "../InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Route } from "react-router-dom";
import { useState } from "react";
import { Check } from "../../../../assets/icons";

const SignUpModal = () => {
  const signUpSchema = z
    .object({
      name: z.string(),
      email: z.string().email({ message: "invalid mail" }).toLowerCase(),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(
          /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
          {
            message:
              "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
          }
        ),
      confirmPassword: z.string(),
      accessKey: z.string({ message: "enter the accessKey" }),
    })
    .refine((val) => val.password === val.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }); // 왜 안되지

  const sendAccessKey = async (email: string) => {};

  const checkAccessKey = async (email: string, accessKey: string) => {};

  const signUp = async (data: ISignUp) => {
    const dataToJson = JSON.stringify({
      email: data.email,
      password: data.confirmPassword,
      name: data.name,
      accessKey: data.accessKey,
    });
  };

  const clickAccessKeyRequireButton = async () => {
    const errorMessage = await sendAccessKey(watch("email"));
  };

  const clickAccessKeyCheckButton = async () => {
    const errorMessage = await checkAccessKey(
      watch("email"),
      watch("accessKey")
    );
  };
  interface ISignUp {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    accessKey: string;
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setError,
  } = useForm<ISignUp>({ resolver: zodResolver(signUpSchema) });
  const clickSignUpButton: SubmitHandler<ISignUp> = (data) => {
    console.log(data);
  };
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <form
        onSubmit={handleSubmit(clickSignUpButton)}
        className="flex flex-col w-full gap-6 modal-box bg-sixteenth"
      >
        <label className="w-full form-control">
          <div className="label">
            <span className="ml-3 text-xl text-white label-text">name</span>
          </div>
          <InputField
            type="name"
            placeholder="anvil3dai@gmail.com"
            className="pl-8 py-7"
            register={register("name")}
          />
          {errors.name?.message && <span>{errors.name?.message}</span>}
        </label>
        <label className="w-full form-control">
          <div className="label">
            <span className="ml-3 text-xl text-white label-text">Email</span>
          </div>
          <InputField
            type="email"
            placeholder="anvil3dai@gmail.com"
            className="pl-8 py-7"
            register={register("email")}
          />
          {errors.email?.message && <span>{errors.email?.message}</span>}
        </label>
        <label className="w-full form-control">
          <div className="label">
            <span className="ml-3 text-xl text-white label-text">Password</span>
          </div>
          <InputField
            type="password"
            placeholder="Enter Password"
            className="pl-8 py-7"
            register={register("password")}
          />
          {errors.password?.message && <span>{errors.password?.message}</span>}
        </label>
        <label className="w-full form-control">
          <div className="label">
            <span className="ml-3 text-xl text-white label-text">
              Confirm Password
            </span>
          </div>
          <InputField
            type="password"
            placeholder="Enter Password"
            className="pl-8 py-7"
            register={register("confirmPassword")}
          />
          {errors.confirmPassword?.message && (
            <span>{errors.confirmPassword?.message}</span>
          )}
        </label>
        <div className="flex items-center gap-5 mt-2 ml-3 text-base">
          <button
            className="w-[30px] h-[30px] rounded-[5px] bg-[#777]/[0.2] flex justify-center items-center"
            onClick={() => setIsChecked((prev) => !prev)}
            aria-label="Toggle check"
          >
            {isChecked ? <Check /> : <div className="w-[51px]" />}
          </button>
          <span>
            I agree to the
            <a className="text-[#A1B0FF] ml-1">Terms & Conditions</a>
          </span>
        </div>
        <button
          className="w-full text-xl text-white rounded-full btn btn-xl"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </>
  );
};

export default SignUpModal;
