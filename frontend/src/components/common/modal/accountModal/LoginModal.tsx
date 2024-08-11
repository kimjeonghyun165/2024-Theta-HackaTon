
import { Apple } from "../../../../assets/login/Apple";
import { Google } from "../../../../assets/login/Google";
import { Facebook } from "../../../../assets/login/Facebook";
import IconBtn from "../../IconBtn";
import InputField from "../InputField";
import { login } from "../../../../api/userApi";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from "react-hook-form";

const LoginModal = ({ setSelectOption }: { setSelectOption: React.Dispatch<React.SetStateAction<string>> }) => {
  // const { user, fetchUser } = useUserStore((state) => ({
  //   user: state.user,
  //   fetchUser: state.fetchUser,
  // }));

  // const handleLogin = async () => {
  //   const user = await login() // sso login할 시 로직 구성.
  // }

  interface ILogin {
    email: string;
    password: string;
  }

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
      .min(8, { message: "Password must be at least 8 characters long" }).
      regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/, {
        message: "Incorrect email or password"
      })
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILogin>({ resolver: zodResolver(loginSchema) });

  const clickLoginButton: SubmitHandler<ILogin> = ({ email, password }: ILogin) => {
    console.log(email);
    console.log(password);
  }

  return (
    <form onSubmit={handleSubmit(clickLoginButton)} className="flex flex-col w-full gap-6 mx-auto modal-box">
      <label className="w-full form-control">
        <div className="label">
          <span className="ml-3 text-xl text-white label-text">Email</span>
        </div>
        <InputField
          type="email"
          placeholder="anvil3dai@gmail.com"
          className="pl-8 py-7"
          register={register('email')}
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
          register={register('password')}
        />
        {errors.password?.message && <span>{errors.password?.message}</span>}
      </label>
      <button className="w-full text-xl text-white rounded-full btn btn-xl" type="submit">
        Login
      </button>
      <div className="w-full mt-7">
        <div className="flex justify-center gap-1 mt-2 text-xs">
          <span>Forgotten your password?</span>
          <button onClick={()=>setSelectOption("resetPassword")} className="text-[#A1B0FF]">
            Reset Password
          </button>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <div className="divider text-xs text-second/[.5]">
            or continue with
          </div>
          <div className="flex justify-around">
            <IconBtn
              icon={Google}
              bgColor={"bg-[#1C1C1C]/[.53]"}
              size={"p-2"}
              onClick={() => login()}
            />
            <IconBtn
              icon={Facebook}
              bgColor={"bg-[#1C1C1C]/[.53]"}
              size={"p-2"}
            />
            <IconBtn
              icon={Apple}
              bgColor={"bg-[#1C1C1C]/[.53]"}
              size={"p-2"}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginModal;
