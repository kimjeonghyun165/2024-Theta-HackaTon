import { useEffect, useRef, useState } from "react";
import { surveyQuestions } from "../../../../constant/survey";
import { useSurveyResponse } from "../../../../hooks/useUserApi";
import { ModalKey, useModalStore } from "../../../../store/useStore";
import { useSurveyStore } from "../../../../store/useUserStore";
import SelectDropdown from "../../dropdown/SelectDropdown";
import ModalLayout from "../common/Layout";
import { z } from "zod";

const surveySchema = z
  .object({
    country: z.string().nonempty("Country is required"),
    occupation: z.array(z.string()).nonempty("Occupation is required"),
    companyIndustry: z
      .array(z.string())
      .nonempty("Company industry is required"),
    usageOfAnvilAI: z
      .array(z.string())
      .nonempty("Usage of ANVIL AI is required"),
    companySize: z.string().nonempty("Company size is required"),
    teamSize: z.string().optional(),
    teamSharesAccount: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.companySize !== "Only me") {
        return data.teamSize && data.teamSharesAccount !== undefined;
      }
      return true;
    },
    {
      message:
        "Team size and sharing account information are required for companies larger than 'Only me'.",
      path: ["teamSize"],
    }
  );

const SurveyModal = () => {
  const { modals } = useModalStore((state) => ({
    modals: state.modals,
  }));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCompanySize, setSelectedCompanySize] =
    useState<string>("Only me");
  const shouldShowConditionalQuestions = selectedCompanySize !== "Only me";
  const { openState, surveyData, setSurveyData } = useSurveyStore();
  const { mutate: surveyResponse } = useSurveyResponse();

  const handleSubmitSurvey = () => {
    const result = surveySchema.safeParse(surveyData);
    if (result.success) {
      setErrorMessage(null);
      surveyResponse(surveyData);
    } else {
      setErrorMessage(
        "Please complete all required fields before submitting the survey."
      );
    }
  };

  const handleSelectChange = (subtitle: string, value: string | string[]) => {
    switch (subtitle) {
      case "Country":
        setSurveyData({ country: value as string });
        break;
      case "Occupation":
        setSurveyData({ occupation: value as string[] });
        break;
      case "Company Industry":
        setSurveyData({ companyIndustry: value as string[] });
        break;
      case "Usage of ANVIL AI":
        setSurveyData({ usageOfAnvilAI: value as string[] });
        break;
      case "Company Size":
        setSurveyData({ companySize: value as string });
        setSelectedCompanySize(value as string);
        break;
      case "Size of your Team":
        setSurveyData({ teamSize: value as string });
        break;
      case "Do your team shares this account?":
        setSurveyData({ teamSharesAccount: Boolean(value) });
        break;
      default:
        break;
    }
  };

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        scrollToBottom();
      });

      resizeObserver.observe(containerRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [surveyQuestions, shouldShowConditionalQuestions, openState]);

  return (
    <ModalLayout
      isVisible={modals.surveyModal}
      modalName={ModalKey.SURVEY_MODAL}
      closeBtn={false}
      className={"min-h-[600px] min-w-[650px]"}
    >
      <div className="flex flex-col items-start w-full gap-3">
        <p className="font-bold text-lg">
          Shape the Future with Your Insights!
        </p>
        <p className="text-xs">
          Complete a Quick Survey to Unlock Tailored AI Solutions and Receive
          Free Credits.
        </p>
        <div
          className="flex items-start overflow-y-auto h-full w-full no-scrollbar"
          ref={containerRef}
        >
          <div>
            {surveyQuestions.map((question, index) => {
              if (
                question.condition === "Company Size" &&
                !shouldShowConditionalQuestions
              ) {
                return null;
              }

              return (
                <div className="my-4" key={index}>
                  <div className="ml-5 mb-1 text-sm">{question.subtitle}</div>
                  <SelectDropdown
                    subtitle={question.subtitle}
                    options={question.options}
                    placeHolder={question.placeHolder}
                    isSearch={question.isSearch}
                    isMulti={question.isMulti}
                    value={[]}
                    onChange={(value) =>
                      handleSelectChange(question.subtitle, value)
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          <div
            className="btn text-white w-2/3 rounded-full"
            onClick={handleSubmitSurvey}
          >
            Get Free Credit and Start!
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm mt-1">{errorMessage}</div>
          )}
        </div>
      </div>
    </ModalLayout>
  );
};

export default SurveyModal;
