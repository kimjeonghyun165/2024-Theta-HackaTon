import AnimatedContent from "../../../../generate/common/AnimatedContent";
import SignUp from "./SignUp";
import VerifyEmail from "./VerifyEmail";
import SetPassword from "./SetPassword";
import { useSignUpStore } from "../../../../../store/useStore";

const SignUpModal = () => {
  const { currentStep } = useSignUpStore();

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
    </div>
  );
};

export default SignUpModal;
