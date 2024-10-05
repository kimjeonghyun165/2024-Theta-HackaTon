import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useSignUpEmailStore,
  useSignUpStore,
} from "../../../../../store/useStore";
import InputField from "../../common/InputField";
import {
  useSendVerificationCode,
  useVerifyEmail,
} from "../../../../../hooks/useAuthApi";
import { getErrorMessage } from "../../../../../utils/utils";
import { useVerifyTokenStore } from "../../../../../store/useUserStore";

const verifyEmailSchema = z.object({
  code: z.string().nonempty({ message: "Verification code is required" }),
});

type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;

const VerifyEmail = () => {
  const nextStep = useSignUpStore((state) => state.nextStep);
  const email = useSignUpEmailStore((state) => state.email);
  const setVerifyToken = useVerifyTokenStore((state) => state.setVerifyToken);
  const { mutate: sendCode, isPending: isSendingCode } =
    useSendVerificationCode();
  const {
    mutate: verifyCode,
    isPending: isVerifying,
    isError,
    error,
  } = useVerifyEmail();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
  });

  const handleSendCode = () => {
    if (email) {
      sendCode(
        { email: email, action: "register" },
        {
          onSuccess: () => {},
          onError: () => {},
        }
      );
    }
  };

  const onSubmit = (data: VerifyEmailFormData) => {
    verifyCode(
      { email, code: data.code },
      {
        onSuccess: (response) => {
          const token = response.accessToken;
          setVerifyToken(token);
          nextStep();
        },
      }
    );
  };

  return (
    <div className="flex flex-col justify-between gap-14 pt-10">
      <div className="px-8">
        Please verify your email and start smithing all your imaginations.
      </div>
      <form
        className="flex flex-col w-full gap-12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-start gap-4">
          <InputField
            type="text"
            placeholder="Enter your Verify Code"
            register={register("code")}
            errorMessage={errors.code?.message}
          />
          <button
            className="btn rounded-full text-second"
            onClick={handleSendCode}
            disabled={isSendingCode}
          >
            Send Code
          </button>
        </div>
        <button
          className="w-full text-xl text-second rounded-full btn btn-xl"
          type="submit"
          disabled={isVerifying}
        >
          Verify Email
        </button>
        {isError && (
          <div className="text-red-500">Error: {getErrorMessage(error)}</div>
        )}
      </form>
      <div className="text-center text-xs">
        <p>Do you have any question? Contact</p>
        <p className="text-[#A1B0FF]">support_anvilai@gmail.com</p>
      </div>
    </div>
  );
};

export default VerifyEmail;
