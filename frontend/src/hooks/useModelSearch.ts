import { useState } from "react";
import { Model } from "../interfaces/model.interface";
import { useGetUserModels } from "./useUserApi";

const useModelSearch = (filterModelDto: any) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isRecent, setIsRecent] = useState(true);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error } =
        useGetUserModels(filterModelDto);

    const filteredModels = data?.pages
        .flat()
        .filter((model: Model) =>
            model.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            return isRecent
                ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        });

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (newSortOrder: boolean) => {
        setIsRecent(newSortOrder);
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        const bottom =
            target.scrollHeight - target.scrollTop === target.clientHeight;
        if (bottom && hasNextPage) {
            fetchNextPage();
        }
    };

    return {
        searchTerm,
        isRecent,
        filteredModels,
        handleSearchChange,
        handleSortChange,
        handleScroll,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
        error,
    };
};

export default useModelSearch;
