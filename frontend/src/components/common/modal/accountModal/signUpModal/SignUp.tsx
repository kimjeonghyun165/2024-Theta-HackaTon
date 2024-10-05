import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useSignUpEmailStore,
  useSignUpStore,
} from "../../../../../store/useStore";
import InputField from "../../common/InputField";
import { useRegister } from "../../../../../hooks/useAuthApi";
import { getErrorMessage } from "../../../../../utils/utils";

const signUpSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .nonempty({ message: "Name cannot be empty" }),
  email: z.string().email({ message: "Invalid email address" }),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the Terms & Service" }),
  }),
  privacy: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the Privacy Policy" }),
  }),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const nextStep = useSignUpStore((state) => state.nextStep);
  const setEmail = useSignUpEmailStore((state) => state.setEmail);
  const { mutate: registerUser, isPending, isError, error } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpFormData) => {
    registerUser(
      { username: data.name, email: data.email },
      {
        onSuccess: () => {
          setEmail(data.email);
          nextStep();
        },
        onError: (error) => {
          const errorMessage = getErrorMessage(error);
          if (
            errorMessage.includes(
              "Please verify your email to complete the registration."
            )
          ) {
            setEmail(data.email);
            nextStep();
          } else {
            console.error("Registration failed:", errorMessage);
          }
        },
      }
    );
  };

  return (
    <>
      <form
        className="flex flex-col w-full h-full justify-center gap-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          label="Name"
          type="text"
          placeholder="Enter your name"
          register={register("name")}
          errorMessage={errors.name?.message}
        />
        <InputField
          label="Email"
          type="email"
          placeholder="Enter your email"
          register={register("email")}
          errorMessage={errors.email?.message}
        />
        <div className="flex flex-col gap-2">
          <div className="flex flex-col text-xs justify-start gap-2 pl-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-sm border-white"
                {...register("terms")}
              />
              <p>I agree to the</p>
              <a
                className="text-[#A1B0FF] underline"
                href="https://anvil3d.ai/terms-and-service"
              >
                Terms & Service
              </a>
            </div>
            {errors.terms && (
              <span className="text-red-500">{errors.terms.message}</span>
            )}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-sm border-white"
                {...register("privacy")}
              />
              <p>I agree to the</p>
              <a
                className="text-[#A1B0FF] underline"
                href="https://anvil3d.ai/privacy-policy"
              >
                Privacy Policy
              </a>
            </div>
            {errors.privacy && (
              <span className="text-red-500">{errors.privacy.message}</span>
            )}
          </div>
          <button
            className="w-full text-xl text-white rounded-full btn btn-xl"
            type="submit"
            disabled={isPending}
          >
            Sign Up
          </button>
        </div>
        {isError && (
          <div className="text-red-500">Error: {getErrorMessage(error)}</div>
        )}
      </form>
    </>
  );
};

export default SignUp;
