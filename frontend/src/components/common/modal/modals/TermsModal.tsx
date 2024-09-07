import { ModalKey, useModalStore } from "../../../../store/useStore";
import ModalLayout from "../common/Layout";

const TermsModal = () => {
  const { modals, openModal } = useModalStore((state) => ({
    modals: state.modals,
    openModal: state.openModal,
  }));

  return (
    <>
      <p
        className="text-[#A1B0FF] cursor-pointer text-sm"
        onClick={() => openModal(ModalKey.TERMS_MODAL)}
      >
        Terms & Conditions
      </p>
      <ModalLayout
        isVisible={modals.termsModal}
        modalName={ModalKey.TERMS_MODAL}
        className={"min-h-[600px] min-w-[500px]"}
      >
        <div className="flex flex-col items-start w-full">
          <div className="text-3xl font-bold mb-4">Terms & Conditions</div>
          <div className="w-full overflow-auto max-h-[400px] px-4 py-2 bg-white text-black rounded-lg">
            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
            <p className="mb-4">
              Welcome to Anvil-Ai! These Terms and Conditions govern your use of
              our website and services. By accessing or using our services, you
              agree to comply with and be bound by these terms. If you do not
              agree to these terms, please do not use our services.
            </p>

            <h2 className="text-xl font-semibold mb-2">2. Use of Services</h2>
            <p className="mb-4">
              You must be at least 18 years old to use our services. You agree
              to use our services only for lawful purposes and in a way that
              does not infringe the rights of others or restrict or inhibit
              anyone else's use and enjoyment of the services.
            </p>

            <h2 className="text-xl font-semibold mb-2">
              3. Account Registration
            </h2>
            <p className="mb-4">
              To access certain features of our services, you may be required to
              register an account. You agree to provide accurate, current, and
              complete information during the registration process and to update
              such information as necessary. You are responsible for
              safeguarding your password and for any activities or actions under
              your account.
            </p>
          </div>
        </div>
      </ModalLayout>
    </>
  );
};

export default TermsModal;
