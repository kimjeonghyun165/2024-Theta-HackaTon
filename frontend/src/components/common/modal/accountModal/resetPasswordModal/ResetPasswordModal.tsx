import AnimatedContent from "../../../../generate/common/AnimatedContent";
import {
  useModalStore,
  useResetPasswordStore,
} from "../../../../../store/useStore";
import SendAndVerifyEmail from "./SendAndVerifyEmail";
import ResetPassword from "./ResetPassword";
import SuccessModal from "../../successModal/SuccessModal";

const ResetPasswordModal = () => {
  const { currentStep } = useResetPasswordStore();
  const modals = useModalStore((state) => state.modals);

  return (
    <div className="relative overflow-hidden w-full h-full">
      <AnimatedContent
        isVisible={currentStep === 0}
        direction={currentStep === 1 ? "left" : "right"}
      >
        <SendAndVerifyEmail />
      </AnimatedContent>
      <AnimatedContent isVisible={currentStep === 1} direction="right">
        <ResetPassword />
      </AnimatedContent>
      <SuccessModal
        isVisible={modals.successModal}
        message={"Your password has been successfully changed."}
        refreshUrl={"/"}
      />
    </div>
  );
};

export default ResetPasswordModal;
