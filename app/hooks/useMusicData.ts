import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { fetchAllMusicCardData, fetchFilteredMusicCardData } from "@/app/lib/processMusicCardData";
import { MusicCardData } from "@/app/components/MusicList/types";

const DEFAULT_PAGE_SIZE = 20;

export function useMusicData() {
    const [musicData, setMusicData] = useState<MusicCardData[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE); // Future: could be user-configurable
    const [totalPages, setTotalPages] = useState(0);
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("q")?.toLowerCase() || "";

    const fetchData = useCallback(async (page: number, pSize: number, query: string) => {
        setLoading(true);
        try {
            let result;
            if (query.trim()) {
                result = await fetchFilteredMusicCardData(query.trim(), pSize, page);
            } else {
                result = await fetchAllMusicCardData(pSize, page);
            }
            setMusicData(result.data);
            setTotalPages(Math.ceil(result.total_count / pSize));
        } catch (error) {
            console.error("Error fetching music data:", error);
            setMusicData([]);
            setTotalPages(0);
        } finally {
            setLoading(false);
        }
    }, []); // No dependencies, relies on arguments

    // Effect to fetch data when page, pageSize, or query changes
    useEffect(() => {
        fetchData(currentPage, pageSize, searchQuery);
    }, [currentPage, pageSize, searchQuery, fetchData]);

    // Reset to page 1 when search query changes
    useEffect(() => {
        if (searchQuery) { // Or even if it becomes empty from a non-empty state
            setCurrentPage(1);
        }
    }, [searchQuery]);


    return {
        musicData, // Renamed from filteredData, represents the current view's data
        loading,
        currentPage,
        setCurrentPage, // Allows UI to change page
        pageSize,
        setPageSize, // Allows UI to change page size (optional)
        totalPages,
    };
}