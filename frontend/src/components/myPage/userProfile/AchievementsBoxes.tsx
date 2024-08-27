import React from "react";

function AchievementsBox({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="bg-fifth/[0.2] rounded-3xl gap-4 flex flex-row lg:flex-col justify-between items-center py-1 px-4 lg:px-1 lg:py-7">
      <div className="text-sm">{title}</div>
      <div className="font-bold text-2xl xl:text-3xl">{content}</div>
    </div>
  );
}

function AchievementsBoxes({ children }: { children: React.ReactNode }) {
  const childrenStr = React.Children.toArray(children).join("");
  const items = childrenStr.split(",").map((item) => item.trim());

  return (
    <div className="flex flex-col mt-2 lg:flex-row justify-between gap-5">
      {items.map((item, index) => {
        const [title, content] = item.split(": ").map((part) => part.trim());
        return (
          <div key={index} className="flex-1">
            <AchievementsBox title={title} content={content} />
          </div>
        );
      })}
    </div>
  );
}

export default AchievementsBoxes;
