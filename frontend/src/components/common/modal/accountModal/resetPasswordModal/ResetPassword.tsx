import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSetPassword } from "../../../../../hooks/useAuthApi";
import {
  ModalKey,
  useModalStore,
  useResetPasswordStore,
} from "../../../../../store/useStore";
import { createPasswordSchema } from "../../../../../utils/utils";
import Loading from "../../../Loading";
import InputField from "../../common/InputField";

const resetPasswordSchema = createPasswordSchema();

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const setCurrentStep = useResetPasswordStore((state) => state.setCurrentStep);
  const { mutate: setPassword, isPending, isError, error } = useSetPassword();
  const { closeModal, openModal } = useModalStore((state) => ({
    closeModal: state.closeModal,
    openModal: state.openModal,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    setPassword(
      { password: data.password, confirmPassword: data.confirmPassword },
      {
        onSuccess: () => {
          closeModal(ModalKey.LOGIN_MODAL);
          setCurrentStep(0);
          openModal(ModalKey.SUCCESS_MODAL);
        },
        onError: (error) => {
          if (error) window.location.reload();
        },
      }
    );
  };

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="px-6">Enter new password.</div>
      <form
        className="flex flex-col w-full gap-10 py-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          label="Password"
          type="password"
          placeholder="Enter Password"
          register={register("password")}
          errorMessage={errors.password?.message}
        />
        <InputField
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          register={register("confirmPassword")}
          errorMessage={errors.confirmPassword?.message}
        />
        {isError && <div className="text-red-500">Error: {error.message}</div>}
        <button
          className="w-full text-xl text-white rounded-full btn btn-xl"
          type="submit"
          disabled={isPending}
        >
          {isPending ? <Loading /> : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
