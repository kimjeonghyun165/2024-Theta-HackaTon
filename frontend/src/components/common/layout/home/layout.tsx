import { Header } from "../header";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col mx-auto min-h-screen max-w-[1800px] min-w-min">
      <Header />
      <div className="w-full flex-grow pt-10 p-6 md:p-10">{children}</div>
    </main>
  );
};
