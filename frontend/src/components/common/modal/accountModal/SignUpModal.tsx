import { z } from "zod";
import InputField from "../InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Check } from "../../../../assets/icons";

const SignUpModal = () => {
  const signUpSchema = z
    .object({
      name: z.string().refine((value) => value.trim() !== "", {
        message: "Name cannot be just spaces",
      }),
      email: z.string().email({ message: "invalid Email" }).toLowerCase(),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(
          /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
          {
            message:
              "At least 8 characters... Contain both lower- and upper-case letters... Contain a number... Contain a special character e.g.: -!@#$%^&*+",
          }
        ),
      confirmPassword: z.string(),
      accessKey: z.string().refine((val) => val.trim() !== "",{message:"Enter Verify Code"}),
    })
    .refine((val) => val.password === val.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const sendAccessKey = async (email: string) => { };

  const checkAccessKey = async (email: string, accessKey: string) => { };

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
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidKey, setIsValidKey] = useState(false);
  const clickSendKeyButton = () => {
    setIsValidEmail(true);
  };
  const clickVerifyCodeButton = () => {
    setIsValidKey(true);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(clickSignUpButton)}
        className="flex flex-col w-full gap-6 modal-box bg-sixteenth"
      >
          <InputField
            label="Name"
            type="name"
            placeholder="anvil3dai@gmail.com"
            className="pl-8 py-7"
            register={register("name")}
            errorMessage={errors.name?.message}
          />
          <InputField
            label="Email"
            type="email"
            placeholder="anvil3dai@gmail.com"
            className="pl-8 py-7"
            register={register("email")}
            errorMessage={errors.email?.message}
            button="Send Code"
            buttonFn={clickSendKeyButton}
          />
        {isValidEmail && (
            <InputField
              label="Verify Code"
              type="string"
              placeholder="Enter Verify Code"
              className="pl-8 py-7"
              register={register("accessKey")}
              errorMessage={errors.accessKey?.message}
              button="Verify Code"
              buttonFn={clickVerifyCodeButton}
            />
        )}
        {isValidKey &&
          <>
              <InputField
                label="Password"
                type="password"
                placeholder="Enter Password"
                className="pl-8 py-7"
                register={register("password")}
                errorMessage={errors.password?.message}
              />
              <InputField
                label="Confirm Password"
                type="password"
                placeholder="Enter Password"
                className="pl-8 py-7"
                register={register("confirmPassword")}
                errorMessage={errors.confirmPassword?.message}
              />
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
          </>
        }
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
