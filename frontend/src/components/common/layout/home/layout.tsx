import { Header } from "../header";
import "./home.css";
export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col min-h-screen mx-auto min-w-[1024px] max-w-[2400px]">
      <Header />
      <div className="w-full flex-grow pt-10 p-6 md:p-10">
        <div className="absolute w-[80vw] h-[80vw] left-[10vw] top-[20vh] bg-gradient-radial hidden lg:block"></div>
        {children}
      </div>
    </main>
  );
};
