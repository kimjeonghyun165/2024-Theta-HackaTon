import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useModalStore,
  useSignUpEmailStore,
  useSignUpStore,
} from "../../../../../store/useStore";
import InputField from "../../common/InputField";
import { useRegister } from "../../../../../hooks/useAuthApi";
import { getErrorMessage } from "../../../../../utils/utils";
import TermsModal from "../../modals/TermsModal";

const signUpSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .nonempty({ message: "Name cannot be empty" }),
  email: z.string().email({ message: "Invalid email address" }),
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
          <div className="flex text-xs items-center justify-start gap-2 pl-2">
            <input
              type="checkbox"
              className="checkbox checkbox-sm border-white"
            />
            <p>I agree to the</p>
            <TermsModal />
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
