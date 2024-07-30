import React from 'react';

function AchievementsBox({ title, content }: { title: string, content: string }) {
  return (
    <div className="w-full bg-[#777777]/[0.2] rounded-[30px] flex flex-row xl:flex-col justify-between items-center py-1 xl:py-7 px-5">
      <h4 className="text-xl xl:text-2xl">{title}</h4>
      <h5 className="font-bold md:base xl:text-[64px]">{content}</h5>
    </div>
  );
}

function AchievementsBoxes({ children }: { children: React.ReactNode }) {
  const childrenStr = React.Children.toArray(children).join('');
  const items = childrenStr.split(',').map(item => item.trim());

  return (
    <div className="flex flex-col gap-8 xl:flex-row">
      {items.map((item, index) => {
        const [title, content] = item.split(': ').map(part => part.trim());
        return <AchievementsBox key={index} title={title} content={content} />;
      })}
    </div>
  );
}

export default AchievementsBoxes;