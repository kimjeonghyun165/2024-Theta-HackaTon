import { Layout } from "../components/common/layout/Layout";
import UserProfile from "../components/myPage/UserProfile";
import UserOwnModel from "../components/myPage/UserOwnModel";
import { InfiniteQueryObserverResult } from "@tanstack/react-query";
import { Model } from "../interfaces/model.interface";

export interface PaginatedModels {
  pages: Model[][];
  pageParams: number[];
}

export interface QueryResponse {
  data: PaginatedModels | undefined;
  fetchNextPage: () => Promise<
    InfiniteQueryObserverResult<PaginatedModels, Error>
  >;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  error: Error | null;
  isError: boolean;
}

const MyPage: React.FC = () => {
  return (
    <Layout>
      <section className="flex flex-col w-full gap-40 mx-auto max-w-5xl min-w-3xl">
        <UserProfile />
        <UserOwnModel />
      </section>
    </Layout>
  );
};

export default MyPage;
