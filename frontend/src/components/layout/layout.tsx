import { Header } from "./header";
import "./layout.css";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col mx-auto min-h-screen max-w-[1800px] min-w-min">
      <Header />
      <div className="relative w-full h-full">
        <div className="absolute w-[80vw] h-[80vw] left-[10vw] top-[20vh] bg-gradient-radial"></div>
      </div>
      <div className="w-full flex-grow pt-10 p-6 md:p-10">{children}</div>
      <div className="mt-24 b-0 z-10"></div>
    </main>
  );
};
