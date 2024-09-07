import { Header } from "../Header";
import Menu from "./menu/Menu";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#030408] flex flex-col mx-auto min-w-[1500px] max-w-[2400px]">
      <Header />
      <div className="flex w-full h-full gap-12 pt-4">
        <div className="h-full mt-10">
          <Menu />
        </div>
        {children}
      </div>
    </div>
  );
};
