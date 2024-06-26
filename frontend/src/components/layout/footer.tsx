export const Footer = () => {
  return (
    <footer className="footer p-10 flex justify-center z-10">
      <div className="flex w-full max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <aside className="flex items-center">
          <p className="text-xs text-center md:text-sm md:text-start">
            ABVIL-AILtd.
            <br />© 2024. ABVIL all rights reserved.
            <br />
            googooplanet@gmail.com
          </p>
        </aside>
        <nav>
          <header className="footer-title md:text-start text-center ">
            About us
          </header>
          <div className="grid grid-flow-col gap-4">
            <a>카카오톡</a>
            <a>구구봇</a>
            <a>광고문의</a>
          </div>
        </nav>
      </div>
    </footer>
  );
};
