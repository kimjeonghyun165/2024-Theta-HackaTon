import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import IconBtn from "../../IconBtn";
import InputField from "../common/InputField";
import { Google } from "../../../../assets/login/Google";
import { Facebook } from "../../../../assets/login/Facebook";
import { Apple } from "../../../../assets/login/Apple";
import { facebookLogin, googleLogin } from "../../../../api/authApi";
import { useLogin } from "../../../../hooks/useAuthApi";
import { getErrorMessage } from "../../../../utils/utils";

const loginSchema = z.object({
  email: z
    .string({ message: "There is no Email" })
    .email({ message: "invalid Email" }),
  password: z
    .string({ message: "There is no Password" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
      {
        message: "Incorrect email or password",
      }
    ),
});

interface ILogin {
  email: string;
  password: string;
}

const LoginModal = ({
  setSelectOption,
}: {
  setSelectOption: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILogin>({ resolver: zodResolver(loginSchema) });

  const { mutate: login, isPending, isError, error } = useLogin();

  const clickLoginButton: SubmitHandler<ILogin> = (data: ILogin) => {
    login(data);
  };

  return (
    <form
      onSubmit={handleSubmit(clickLoginButton)}
      className="flex flex-col w-full gap-10 py-10"
    >
      <InputField
        label="Email"
        type="email"
        placeholder="anvil3dai@gmail.com"
        register={register("email")}
        errorMessage={errors.email?.message}
      />
      <InputField
        label="Password"
        type="password"
        placeholder="Enter Password"
        register={register("password")}
        errorMessage={errors.password?.message}
      />
      <div>
        <button
          className="w-full mt-4 text-xl text-white rounded-full btn btn-xl"
          type="submit"
          disabled={isPending}
        >
          Login
        </button>
        {isError && (
          <div className="text-red-500">{`${getErrorMessage(error)}`}</div>
        )}
        <div className="flex justify-center gap-1 mt-5 text-xs">
          <span>Forgotten your password?</span>
          <button
            onClick={() => setSelectOption("resetPassword")}
            className="text-[#A1B0FF]"
          >
            Reset Password
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="divider text-xs text-second/[.5]">or continue with</div>
        <div className="flex justify-around">
          <IconBtn
            icon={Google}
            className="bg-[#1C1C1C]/[.53] p-2 btn-circle"
            onClick={() => googleLogin()}
          />
          <IconBtn
            icon={Facebook}
            className="bg-[#1C1C1C]/[.53] p-2 btn-circle"
            onClick={() => facebookLogin()}
          />
          <IconBtn icon={Apple} className="bg-[#1C1C1C]/[.53] p-2 btn-circle" />
        </div>
      </div>
    </form>
  );
};

export default LoginModal;
