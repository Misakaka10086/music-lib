import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { fetchAllMusicCardData, fetchFilteredMusicCardData } from "@/app/lib/processMusicCardData";
import { MusicCardData } from "@/app/components/MusicList/types";

const DEFAULT_PAGE_SIZE = 20;

export function useMusicData() {
    const [musicData, setMusicData] = useState<MusicCardData[]>([]);
    const [initialLoading, setInitialLoading] = useState(true); // For the very first load
    const [loadingMore, setLoadingMore] = useState(false); // For subsequent "load more" actions
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [totalPages, setTotalPages] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("q")?.toLowerCase() || "";

    const fetchData = useCallback(async (pageToFetch: number, currentQuery: string, currentPSize: number, isNewQuery: boolean) => {
        if (isNewQuery) {
            setInitialLoading(true);
            setMusicData([]); // Clear data for new query
            setCurrentPage(1); // Reset page for new query
        } else {
            setLoadingMore(true);
        }
        setError(null);

        try {
            let result;
            if (currentQuery.trim()) {
                result = await fetchFilteredMusicCardData(currentQuery.trim(), currentPSize, pageToFetch);
            } else {
                result = await fetchAllMusicCardData(currentPSize, pageToFetch);
            }

            if (pageToFetch === 1 || isNewQuery) {
                setMusicData(result.data);
            } else {
                setMusicData(prevData => [...prevData, ...result.data]);
            }

            const newTotalPages = Math.ceil(result.total_count / currentPSize);
            setTotalPages(newTotalPages);
            setHasMore(pageToFetch < newTotalPages);

        } catch (e) {
            console.error("Error fetching music data:", e);
            setError(e instanceof Error ? e : new Error('Failed to fetch data'));
            // Optionally, clear data or handle error state more gracefully
            // setMusicData([]);
            // setHasMore(false);
        } finally {
            if (isNewQuery) {
                setInitialLoading(false);
            }
            setLoadingMore(false);
        }
    }, []);

    // Effect for initial load and when search query or page size changes
    useEffect(() => {
        // This effect handles changes in searchQuery or pageSize,
        // which should trigger a fresh load from page 1.
        fetchData(1, searchQuery, pageSize, true);
    }, [searchQuery, pageSize, fetchData]);

    // Effect for loading more data (incrementing current page)
    // This is separated to avoid re-triggering a full refresh when only currentPage changes for loading more.
    useEffect(() => {
        // Only fetch if it's not the initial load triggered by searchQuery/pageSize change
        // and currentPage is greater than 1.
        if (currentPage > 1) {
            fetchData(currentPage, searchQuery, pageSize, false);
        }
    }, [currentPage, fetchData]); // searchQuery and pageSize are stable within this context due to the other useEffect


    const loadMore = useCallback(() => {
        if (!loadingMore && hasMore) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    }, [loadingMore, hasMore]);

    // Handling of setPageSize:
    // When pageSize changes, the first useEffect (for searchQuery, pageSize)
    // will trigger, calling fetchData with isNewQuery=true, which resets data and currentPage.
    // So, setPageSize can be exposed directly.

    return {
        musicData,
        loading: initialLoading || loadingMore, // Combined loading state for UI
        initialLoading,
        loadingMore,
        loadMore,
        hasMore,
        error,
        // Note: Exposing setCurrentPage directly might be confusing with loadMore.
        // If direct page setting is needed, ensure it interacts correctly with data accumulation.
        // For pure infinite scroll, loadMore is the primary interaction.
        // Exposing pageSize and setPageSize for now.
        pageSize,
        setPageSize,
        totalPages, // For context, though UI might not show it directly with infinite scroll
        currentPage // For context or debugging
    };
}