import React from 'react';

function AchievementsBox({ title, content }: { title: string, content: string }) {
  return (
    <div className="w-full bg-[#777777]/[0.2] rounded-[30px] flex flex-col justify-between items-center py-7">
      <h4 className="text-2xl">{title}</h4>
      <h5 className="font-bold text-[64px]">{content}</h5>
    </div>
  );
}

function AchievementsBoxes({ children }: { children: React.ReactNode }) {
  const childrenStr = React.Children.toArray(children).join('');
  const items = childrenStr.split(',').map(item => item.trim());

  return (
    <div className="flex gap-8">
      {items.map((item, index) => {
        const [title, content] = item.split(': ').map(part => part.trim());
        return <AchievementsBox key={index} title={title} content={content} />;
      })}
    </div>
  );
}

export default AchievementsBoxes;