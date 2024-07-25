import { Header } from "../Header";
import Menu from "./menu/Menu";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#030408] flex flex-col  min-h-screen mx-auto min-w-[1500px] max-w-[2400px]">
      <Header />
      <div className="flex flex-grow w-full gap-12 pt-4 pb-4 md:pb-20">
        <div className="h-full mt-10">
          <Menu />
        </div>
        {children}
      </div>
    </div>
  );
};
