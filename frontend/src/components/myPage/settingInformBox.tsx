import { Check, Question } from "../../assets/icons";
import DownTriangle from "../../assets/icons/downTriangle";
import IconBtn from '../common/iconBtn';

const icons = {
  License: Question,
  Language: DownTriangle,
  Region: DownTriangle,
  Notification: Check,
} as const;

type IconKeys = keyof typeof icons;

function SettingInformBox({ children }: { children: string }) {
  const sentenceArr = children.split(",").map(sentence => sentence.split(": "));
  return (
    <ul>
      {sentenceArr.map(([title, content], index) => (
        <li className="flex items-center gap-4 py-1" key={index}>
          <span className="w-48 font-bold">{title}</span>
          <span className="bg-[#777777] text-second rounded-[30px] px-10 flex items-center py-3 min-w-48 justify-center">
            {content}
          </span>
          {icons[title as IconKeys] && <IconBtn icon={icons[title as IconKeys]} bgColor='bg-[#777777]'/>}
        </li>
      ))}
    </ul>
  );
}

export default SettingInformBox;
