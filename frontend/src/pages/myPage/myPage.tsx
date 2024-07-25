import "../../components/myPage/scrollbarStyle.css";
import { Layout } from "../../components/common/layout/myPage/Layout";
import UserProfile from "../../components/myPage/UserProfile";
import UserOwnModel from "../../components/myPage/UserOwnModel";

const MyPage: React.FC = () => {
  return (
    <Layout>
      <section className="flex flex-col w-4/5 gap-40 mx-auto rounded-3xl">
        <UserProfile />
        <UserOwnModel />
      </section>
    </Layout>
  );
};

export default MyPage;
