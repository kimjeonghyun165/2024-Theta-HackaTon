import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { z } from "zod";
import InputField from "../InputField";
import { useState } from "react";

const ResetPasswordModal = () => {
  interface IResetPassword {
    email: string,
    accessKey: string,
    password: string,
    confirmPassword: string,
  }
  const resetPasswordSchema = z.object({
    email: z
      .string()
      .email({ message: 'invalid mail' })
      .toLowerCase(),
    password: z.string()
      .min(8, { message: "Password must be at least 8 characters long" }).
      regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/, {
        message: "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
      }),
    confirmPassword: z.string(),
    accessKey: z
      .string({ message: 'enter the accessKey' }),
  }).refine((val) => val.password === val.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }); // 왜 안되지

  const { handleSubmit, register, watch, formState: { errors } } = useForm<IResetPassword>({ resolver: zodResolver(resetPasswordSchema) });
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidKey, setIsValidKey] = useState(false);

  const clickSendKeyButton = () => {
    setIsValidEmail(true);
  }
  const clickVerifyCodeButton = () => {
    setIsValidKey(true);
  }
  const clickResetPasswordButton = () => {
  }

  return (
    <form onSubmit={handleSubmit(clickResetPasswordButton)} className="flex flex-col w-full gap-6 mx-auto modal-box">
      <label className="w-full form-control">
        <div className="label">
          <span className="ml-3 text-xl text-white label-text">Email</span>
        </div>
        <div className="flex gap-3">
          <InputField
            type="email"
            placeholder="anvil3dai@gmail.com"
            className="pl-8 py-7"
            register={register('email')}
          />
          <button className="text-xl text-white bg-gray-900 rounded-full hover:bg-gray-700" onClick={clickSendKeyButton}>
            Send Code
          </button>
        </div>
        {errors.email?.message && <span>{errors.email?.message}</span>}
      </label>
      {isValidEmail && <label className="w-full form-control">
        <div className="label">
          <span className="ml-3 text-xl text-white label-text">Verify Code</span>
        </div>
        <div className="flex gap-3">
          <InputField
            type="string"
            placeholder="Enter Verify Code"
            className="pl-8 py-7"
            register={register('accessKey')}
          />
          <button className="text-xl text-white bg-gray-900 rounded-full hover:bg-gray-700" onClick={clickVerifyCodeButton}>
            Verify Code
          </button>
        </div>
        {errors.accessKey?.message && <span>{errors.accessKey?.message}</span>}
      </label>
      }
      {
        isValidKey &&
        <>
        <label className="w-full form-control">
        <div className="label">
          <span className="ml-3 text-xl text-white label-text">Password</span>
        </div>
        <InputField
          type="password"
          placeholder="Enter Password"
          className="pl-8 py-7"
          register={register('password')}
        />
        {errors.password?.message && <span>{errors.password?.message}</span>}
      </label>
      <label className="w-full form-control">
        <div className="label">
          <span className="ml-3 text-xl text-white label-text">Confirm Password</span>
        </div>
        <InputField
          type="password"
          placeholder="Enter Password"
          className="pl-8 py-7"
          register={register('confirmPassword')}
        />
        {errors.confirmPassword?.message && <span>{errors.confirmPassword?.message}</span>}
      </label>
      <button className="w-full text-xl text-white rounded-full btn btn-xl" onClick={clickSendKeyButton} type="submit">
        Reset Password
      </button>
      </>
      }
    </form>
  )
}

export default ResetPasswordModal