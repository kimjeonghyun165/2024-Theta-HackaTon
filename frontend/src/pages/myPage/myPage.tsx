import "../../components/myPage/scrollbarStyle.css";
import { Layout } from "../../components/common/layout/Layout";
import UserProfile from "../../components/myPage/UserProfile";
import UserOwnModel from "../../components/myPage/UserOwnModel";

const MyPage: React.FC = () => {
  return (
    <Layout>
      <section className="flex flex-col w-5/6 gap-40 mx-auto">
        <UserProfile />
        <UserOwnModel />
      </section>
    </Layout>
  );
};

export default MyPage;
