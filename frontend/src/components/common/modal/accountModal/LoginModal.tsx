import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import IconBtn from "../../IconBtn";
import InputField from "../InputField";
import { login } from "../../../../api/userApi";
import { Google } from "../../../../assets/login/Google";
import { Facebook } from "../../../../assets/login/Facebook";
import { Apple } from "../../../../assets/login/Apple";

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
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

  const clickLoginButton: SubmitHandler<ILogin> = ({
    email,
    password,
  }: ILogin) => {
    console.log(email);
    console.log(password);
  };

  return (
    <form
      onSubmit={handleSubmit(clickLoginButton)}
      className="modal-box flex flex-col gap-10 py-20 bg-sixteenth"
    >
      <InputField
        label="Email"
        type="email"
        placeholder="anvil3dai@gmail.com"
        register={register("email")}
        error={errors.email?.message}
      />
      <InputField
        label="Password"
        type="password"
        placeholder="Enter Password"
        register={register("password")}
        error={errors.password?.message}
      />
      <div>
        <button
          className="btn btn-xl w-full text-xl text-white rounded-full mt-4"
          type="submit"
        >
          Login
        </button>
        <div className="flex justify-center gap-1 mt-2 text-xs">
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
            bgColor="bg-[#1C1C1C]/[.53]"
            size="p-2"
            onClick={() => login()}
          />
          <IconBtn icon={Facebook} bgColor="bg-[#1C1C1C]/[.53]" size="p-2" />
          <IconBtn icon={Apple} bgColor="bg-[#1C1C1C]/[.53]" size="p-2" />
        </div>
      </div>
    </form>
  );
};

export default LoginModal;
