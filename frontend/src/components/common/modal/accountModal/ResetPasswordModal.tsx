import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { useState } from "react";

const ResetPasswordModal = () => {
  interface IResetPassword {
    email: string;
    accessKey: string;
    password: string;
    confirmPassword: string;
  }
  const resetPasswordSchema = z
    .object({
      email: z.string().email({ message: "invalid Email" }).toLowerCase(),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(
          /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
          {
            message:
              "At least 8 characters, Contain both lower- and upper-case letters, Contain a number, Contain a special character, e.g.: -!@#$%^&*+",
          }
        ),
      confirmPassword: z.string(),
      accessKey: z.string().refine((val) => val.trim() !== "",{message:"Enter Verify Code"}),
    })
    .refine((val) => val.password === val.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<IResetPassword>({ resolver: zodResolver(resetPasswordSchema) });
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidKey, setIsValidKey] = useState(false);

  const clickSendKeyButton = () => {
    setIsValidEmail(true);
  };
  const clickVerifyCodeButton = () => {
    setIsValidKey(true);
  };
  const clickResetPasswordButton = () => { };

  return (
    <form
      onSubmit={handleSubmit(clickResetPasswordButton)}
      className="flex flex-col w-full gap-6 modal-box bg-sixteenth"
    >
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
        <div className="flex w-full gap-3 form-control">
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
        </div>
      )}
      {isValidKey && (
        <>
          <div className="w-full form-control">
            <InputField
              label="Password"
              type="password"
              placeholder="Enter Password"
              className="pl-8 py-7"
              register={register("password")}
              errorMessage={errors.password?.message}
            />
          </div>
          <InputField
            label="Confirm Password"
            type="password"
            placeholder="Enter Password"
            className="pl-8 py-7"
            register={register("confirmPassword")}
            errorMessage={errors.confirmPassword?.message}
          />
          <button
            className="w-full text-xl text-white rounded-full btn btn-xl"
            onClick={clickSendKeyButton}
            type="submit"
          >
            Reset Password
          </button>
        </>
      )}
    </form>
  );
};

export default ResetPasswordModal;
