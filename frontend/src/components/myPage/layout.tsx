import { Header } from "../common/layout/header";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-[#030408]">
      <div className="flex flex-col  min-h-screen mx-auto min-w-[1500px] max-w-[2400px]">
        <Header />
        <div className="w-full flex flex-grow pb-4 md:pb-20 pt-4 gap-12">
          {children}
        </div>
      </div>
    </main>
  );
};
