import { Layout } from "../components/common/layout/Layout";
import UserProfile from "../components/myPage/UserProfile";
import UserOwnModel from "../components/myPage/UserOwnModel";
import { Model } from "../store/useModelStore";
import { InfiniteQueryObserverResult } from "@tanstack/react-query";


export interface PaginatedModels {
  pages: Model[][];
  pageParams: number[];
}

export interface QueryResponse {
  data: PaginatedModels | undefined;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult<PaginatedModels, Error>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  error: Error | null;
  isError: boolean;
}

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
