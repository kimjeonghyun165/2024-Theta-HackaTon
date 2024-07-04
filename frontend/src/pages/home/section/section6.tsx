import {
  Band,
  Discord,
  Facebook,
  Instagram,
  Twitter,
} from "../../../assets/sns";

const Section6 = () => {
  return (
    <section className="flex flex-col gap-24 pl-24">
      <h1 id="contact-section" className="italic text-white">
        <p className="font-extralight text-4xl md:text-5xl lg:text-6xl">
          Contact Us
        </p>
      </h1>
      <footer className="footer text-lg text-white w-2/3">
        <nav className="gap-16">
          <a>FAQ</a>
          <a>PARTNERSHIP</a>
          <a>DISCORD</a>
          <a>SOCIAL MEDIA</a>
        </nav>
        <nav className="gap-16">
          <a className="link link-hover">stickyofstickyrice@gmail.com</a>
          <a className="link link-hover">stickyofstickyrice@gmail.com</a>
          <a className="link link-hover" href="https://discord.gg/nKDrn5kd">
            <Discord />
          </a>
          <a className="link link-hover flex items-center gap-6">
            <Instagram />
            <Facebook />
            <Band />
            <Twitter />
          </a>
        </nav>
      </footer>
    </section>
  );
};

export default Section6;
