import Band from "../../../assets/sns/Band";
import Discord from "../../../assets/sns/Discord";
import Facebook from "../../../assets/sns/Facebook";
import Instagram from "../../../assets/sns/Instagram";
import Twitter from "../../../assets/sns/Twiiter";

const HomeSection7 = () => {
  return (
    <section className="flex flex-col gap-24 pl-24 mb-32">
      <h1 id="contact-section" className="italic text-white">
        <span className="text-4xl font-extralight md:text-5xl lg:text-6xl">
          Contact Us
        </span>
      </h1>
      <footer className="w-5/6 text-lg text-white footer">
        <nav className="flex flex-col w-full gap-16">
          <span className="flex justify-between w-full">
            <h2 className="flex-1">FAQ</h2>
            <h3 className="flex flex-1 font-light link link-hover flex-start">
              faqanvilai@gmail.com
            </h3>
          </span>
          <span className="flex justify-between w-full">
            <h2 className="flex-1">PARTNERSHIP</h2>
            <h3 className="flex flex-1 font-light link link-hover flex-start">
              faqanvilai@gmail.com
            </h3>
          </span>
          <span className="flex justify-between w-full">
            <h2 className="flex-1">DISCORD</h2>
            <h3
              className="flex flex-1 link link-hover flex-start"
              aria-label="discord link"
            >
              <a href="https://discord.gg/nKDrn5kd">
                <Discord />
              </a>
            </h3>
          </span>
          <span className="flex justify-between w-full">
            <h2 className="flex-1">SOCIAL MEDIA</h2>
            <h3 className="flex items-center flex-1 gap-6 link link-hover flex-start">
              <Instagram />
              <Facebook />
              <Band />
              <Twitter />
            </h3>
          </span>
        </nav>
      </footer>
    </section>
  );
};

export default HomeSection7;
