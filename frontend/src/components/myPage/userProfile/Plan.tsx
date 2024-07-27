const Plan = ({ plan }: { plan: string | undefined }) => {
  const mark = {
    bronze: "linear-gradient(135deg, rgba(120, 91, 47, 0.3) 0%, rgba(255, 233, 200, 0.91) 55.1%, rgba(226, 198, 154, 0.8) 63.6%, #785B2F 100%)",
    silver: "linear-gradient(135deg, rgba(157, 157, 157, 0.3) 0%, rgba(255, 255, 255, 0.9) 55.1%, rgba(202, 202, 202, 0.9) 63.6%, #888888 100%)",
    gold: "linear-gradient(135deg, rgba(195, 167, 22, 0.3) 0%, rgba(255, 244, 186, 0.9) 33.33%, rgba(195, 167, 22, 0.9) 66.67%, #C3A716 100%)",
    platinum: "linear-gradient(135deg, rgba(36, 72, 98, 0.3) 0%, rgba(255, 255, 255, 0.9) 55.1%, rgba(255, 255, 255, 0.9) 63.6%, #244862 100%)",
  };

  if (typeof plan === "undefined") {
    return <div>No Plan</div>;
  }

  const planToLowerCase = plan.toLowerCase();
  const backgroundKey = Object.keys(mark).find((key) =>
    planToLowerCase.includes(key)
  ) as keyof typeof mark | undefined;

  const backgroundStyle = backgroundKey ? mark[backgroundKey] : "";

  return (
    <>
      <div
        className="w-[17px] h-[17px] xl:w-[27px] xl:h-[27px] rounded-md"
        style={{
          borderRadius: "10px 0px 10px 13.5px",
          background: backgroundStyle,
        }}
        aria-label="User Plan"
      />
      {plan}
    </>
  );
};

export default Plan;