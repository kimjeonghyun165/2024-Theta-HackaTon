import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import {
  useSendVerificationCode,
  useVerifyEmail,
} from "../../../../../hooks/useAuthApi";
import InputField from "../../common/InputField";
import {
  useResetPasswordStore,
  useSignUpEmailStore,
} from "../../../../../store/useStore";
import { useVerifyTokenStore } from "../../../../../store/useUserStore";

const verifyEmailSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty({ message: "Email is required" }),
  code: z.string().nonempty({ message: "Verification code is required" }),
});

type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;

const SendAndVerifyEmail = () => {
  const setCurrentStep = useResetPasswordStore((state) => state.setCurrentStep);
  const setSignUpEmail = useSignUpEmailStore((state) => state.setEmail);
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
    watch,
  } = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { email }, // 이메일 초기값 설정
  });

  const currentEmail = watch("email");

  useEffect(() => {
    setSignUpEmail(currentEmail || "");
  }, [currentEmail, setSignUpEmail]);

  const handleSendCode = () => {
    if (currentEmail) {
      sendCode(
        { email: currentEmail, action: "resetPassword" },
        {
          onSuccess: () => {},
          onError: () => {},
        }
      );
    }
  };

  const onSubmit = (data: VerifyEmailFormData) => {
    verifyCode(
      { email: data.email, code: data.code },
      {
        onSuccess: (response) => {
          setVerifyToken(response.accessToken);
          setCurrentStep(1);
        },
        onError: (error) => {
          console.error("Failed to verify email:", error);
        },
      }
    );
  };

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="px-6">
        We’ll send a link that signs you into the website instantly.
      </div>
      <form
        className="flex flex-col w-full h-full gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          label="Email"
          type="email"
          placeholder="your-email@example.com"
          register={register("email")}
          errorMessage={errors.email?.message}
        />
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
            {isSendingCode ? "Sending..." : "Send Code"}
          </button>
        </div>
        {isError && <div className="text-red-500">Error: {error.message}</div>}
        <button
          className="w-full text-xl text-second rounded-full btn btn-xl"
          type="submit"
          disabled={isVerifying}
        >
          {isVerifying ? "Verifying..." : "Verify Email"}
        </button>
      </form>
      <div className="text-center text-xs">
        <p>Do you have any question? Contact</p>
        <p className="text-[#A1B0FF]">faqanvilai@gmail.com</p>
      </div>
    </div>
  );
};

export default SendAndVerifyEmail;
