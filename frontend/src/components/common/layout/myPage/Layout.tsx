import { Header } from "../Header";
import "./mypage.css";
export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col min-h-screen mx-auto min-w-[1024px] max-w-[2400px]">
      <Header />
      <div className="flex-grow w-full p-6 pt-10 md:p-10">
        {children}  
      </div>
    </main>
  );
};
