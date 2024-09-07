import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../../common/InputField";
import {
  createPasswordSchema,
  getErrorMessage,
} from "../../../../../utils/utils";
import { SetPasswordDto } from "../../../../../interfaces/auth.interface";
import { useSetPassword } from "../../../../../hooks/useAuthApi";
import {
  ModalKey,
  useModalStore,
  useSignUpStore,
} from "../../../../../store/useStore";

const setPasswordSchema = createPasswordSchema();

const SetPassword = () => {
  const {
    mutate: setPasswordMutation,
    isPending,
    isError,
    error,
  } = useSetPassword();
  const initialStep = useSignUpStore((state) => state.initialStep);
  const { closeModal, openModal } = useModalStore((state) => ({
    closeModal: state.closeModal,
    openModal: state.openModal,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetPasswordDto>({
    resolver: zodResolver(setPasswordSchema),
  });

  const onSubmit = (data: SetPasswordDto) => {
    setPasswordMutation(data);
    closeModal(ModalKey.LOGIN_MODAL);
    initialStep();
    openModal(ModalKey.SUCCESS_MODAL);
  };

  return (
    <>
      <form
        className="flex flex-col w-full gap-10 py-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          label="Password"
          type="password"
          placeholder="Enter Password"
          register={register("password")}
          errorMessage={errors.password?.message as string | undefined}
        />
        <InputField
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          register={register("confirmPassword")}
          errorMessage={errors.confirmPassword?.message as string | undefined}
        />
        <button
          className="w-full text-xl text-white rounded-full btn btn-xl"
          type="submit"
          disabled={isPending}
        >
          Register
        </button>
        {isError && (
          <div className="text-red-500">Error: {getErrorMessage(error)}</div>
        )}
      </form>
    </>
  );
};

export default SetPassword;
