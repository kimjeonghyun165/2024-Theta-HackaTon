import AnimatedContent from "../../../../generate/common/AnimatedContent";
import { useResetPasswordStore } from "../../../../../store/useStore";
import SendAndVerifyEmail from "./SendAndVerifyEmail";
import ResetPassword from "./ResetPassword";

const ResetPasswordModal = () => {
  const { currentStep } = useResetPasswordStore();

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
    </div>
  );
};

export default ResetPasswordModal;
