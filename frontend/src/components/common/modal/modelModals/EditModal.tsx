import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Check, Market, Question } from "../../../../assets/icons";
import { useCreateModel, useUpdateModel } from "../../../../hooks/useModelApi";
import { useModelStore } from "../../../../store/useModelStore";
import IconBtn from "../../IconBtn";
import ThreeScene from "../../threeScene/ThreeScene";
import InputField from "../common/InputField";
import ModalLayout from "../common/Layout";
import TextAreaField from "../common/TextAreaField";
import ActionField from "../common/ActionField";
import { Model } from "../../../../interfaces/model.interface";
import { ModalKey, useModalStore } from "../../../../store/useStore";

interface PostPopupProps {
  mode: "create" | "edit";
  initialModel?: Model;
}

const EditModal: React.FC<PostPopupProps> = ({ mode, initialModel }) => {
  const { newModel, setNewModel } = useModelStore((state) => ({
    newModel: state.newModel,
    setNewModel: state.setNewModel,
  }));
  const { modals, openModal, closeModal } = useModalStore((state) => ({
    modals: state.modals,
    openModal: state.openModal,
    closeModal: state.closeModal,
  }));

  const { mutate: createModel, isPending: isCreating } = useCreateModel();
  const { mutate: updateModel, isPending: isUpdating } = useUpdateModel();

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      title: initialModel?.title || newModel?.title || "",
      description: initialModel?.description || newModel?.description || "",
      price: initialModel?.price || newModel?.price || "",
      listing: initialModel?.listing || newModel?.listing || false,
    },
  });

  useEffect(() => {
    const subscription = watch((data) => {
      setNewModel({
        title: data.title,
        description: data.description,
        price: data.listing ? Number(data.price) : null,
        listing: data.listing,
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, setNewModel]);

  const handleSaveClick = async () => {
    if (mode === "create" && newModel) {
      createModel(newModel, {
        onSuccess: () => {
          closeModal(ModalKey.EDIT_MODAL);
          openModal(ModalKey.SUCCESS_MODAL);
        },
      });
    } else if (mode === "edit" && initialModel) {
      const updatedData: Partial<Model> = {};

      if (newModel.title !== initialModel.title)
        updatedData.title = newModel.title;
      if (newModel.description !== initialModel.description)
        updatedData.description = newModel.description;
      if (newModel.price !== initialModel.price)
        updatedData.price = newModel.price;
      if (newModel.listing !== initialModel.listing)
        updatedData.listing = newModel.listing;
      if (newModel.visibility !== initialModel.visibility)
        updatedData.visibility = newModel.visibility;

      if (Object.keys(updatedData).length > 0) {
        updateModel(
          { id: initialModel._id, updateData: updatedData },
          {
            onSuccess: () => {
              closeModal(ModalKey.EDIT_MODAL);
              window.location.replace("/mypage");
            },
          }
        );
      } else {
        closeModal(ModalKey.EDIT_MODAL);
      }
    }
  };
  return (
    <ModalLayout
      isVisible={modals.editModal}
      modalName={ModalKey.EDIT_MODAL}
      className={"min-w-[950px]"}
      className2={"h-4/5"}
    >
      <div className="w-1/2 h-full">
        {(initialModel?.file || newModel.file) && (
          <ThreeScene
            backgroundColor={0xffffff}
            backgroundOpacity={0}
            showGrid={true}
            modelPath={initialModel?.file || newModel.file}
          />
        )}
      </div>
      <form
        onSubmit={handleSubmit(handleSaveClick)}
        className="flex flex-col w-1/2 gap-6 px-6"
      >
        <InputField
          type="text"
          placeholder="Title : "
          register={register("title")}
        />
        <TextAreaField
          placeholder="Description: Strong muscular human statue. #statue, #muscular, #strong"
          register={register("description")}
        />
        <div className="w-full flex justify-between items-center bg-[#1C1C1C]/[.53] pl-4 rounded-full">
          <p className="text-sm">Upload to Market?</p>
          <label
            className={`btn btn-circle border-none p-4 ${
              newModel?.listing ? "bg-[#191d24]" : "bg-[#1C1C1C]/[.53]"
            }`}
          >
            <input
              className="hidden"
              type="checkbox"
              {...register("listing")}
            />
            <Check />
          </label>
        </div>
        <div className="flex justify-around gap-3">
          <InputField
            type="text"
            placeholder="Price: $ 0.792"
            register={register("price")}
            isDisabled={!newModel?.listing}
          />
          <IconBtn
            icon={Market}
            className="btn-circle p-4 bg-[#1C1C1C]/[.53]"
            tooltip="Market"
          />
          <IconBtn
            icon={Question}
            className="btn-circle p-4 bg-[#1C1C1C]/[.53]"
            tooltip="FAQ"
          />
        </div>
        <ActionField isLoading={isCreating || isUpdating} />
      </form>
    </ModalLayout>
  );
};

export default EditModal;
