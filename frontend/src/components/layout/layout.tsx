import { Footer } from "./footer";
import { Header } from "./header";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="w-full max-w-none flex-grow pt-10 p-6 md:p-10">
        {children}
      </div>
      <div className="mt-12 b-0">
        <Footer />
      </div>
    </main>
  );
};
