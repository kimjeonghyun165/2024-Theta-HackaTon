import { useEffect } from "react";

const TermAandService = () => {
  useEffect(() => {
    window.location.href =
      "https://frosted-adapter-01f.notion.site/Terms-of-Service-2a02c6db908b4271a49a5895d08da261";
  }, []);

  return (
    <div>
      <p>Redirecting to Notion...</p>
    </div>
  );
};

export default TermAandService;
