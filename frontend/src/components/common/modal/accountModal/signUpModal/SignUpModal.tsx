import AnimatedContent from "../../../../generate/common/AnimatedContent";
import SignUp from "./SignUp";
import VerifyEmail from "./VerifyEmail";
import SetPassword from "./SetPassword";
import { useModalStore, useSignUpStore } from "../../../../../store/useStore";
import SuccessModal from "../../successModal/SuccessModal";

const SignUpModal = () => {
  const { currentStep } = useSignUpStore();
  const modals = useModalStore((state) => state.modals);

  return (
    <div className="relative overflow-hidden w-full h-full">
      <AnimatedContent
        isVisible={currentStep === 0}
        direction={currentStep === 1 ? "left" : "right"}
      >
        <SignUp />
      </AnimatedContent>
      <AnimatedContent
        isVisible={currentStep === 1}
        direction={currentStep === 2 ? "left" : "right"}
      >
        <VerifyEmail />
      </AnimatedContent>
      <AnimatedContent isVisible={currentStep === 2} direction="right">
        <SetPassword />
      </AnimatedContent>
      <SuccessModal
        isVisible={modals.successModal}
        message={"Welcome aboard!\nYour account has been successfully created."}
        refreshUrl={"/"}
      />
    </div>
  );
};

export default SignUpModal;
