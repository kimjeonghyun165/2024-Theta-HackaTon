import { Header } from "../common/layout/header";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-[#030408]">
      <div className="flex flex-col  min-h-screen mx-auto min-w-[1500px] max-w-[2400px]">
        <Header />
        <div className="flex flex-grow w-full gap-12 pt-4 pb-4 md:pb-20">
          {children}
        </div>
      </div>
    </main>
  );
};
