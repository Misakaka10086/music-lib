import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Fuse from "fuse.js";
import { fetchAllMusicCardData } from "@/app/lib/processMusicCardData";
import { MusicCardData } from "@/app/components/MusicList/types";

export function useMusicData() {
    const [allMusicData, setAllMusicData] = useState<MusicCardData[]>([]);
    const [filteredData, setFilteredData] = useState<MusicCardData[]>([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();

    // Fetch all music data once when component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAllMusicCardData(Number.MAX_SAFE_INTEGER, 1);
                setAllMusicData(data);
            } catch (error) {
                console.error("Error fetching music data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Initialize Fuse.js
    const fuse = useMemo(() => {
        return new Fuse(allMusicData, {
            keys: ["music_title", "original_artist", "tags"],
            threshold: 0.3,
        });
    }, [allMusicData]);

    // Filter data based on search query
    useEffect(() => {
        const query = searchParams.get("q")?.toLowerCase() || "";
        if (!query.trim()) {
            setFilteredData(allMusicData);
            return;
        }

        // First, perform a search for the entire query string
        const exactSearchResults = fuse.search(query.trim()).map(result => result.item);

        // If the query contains multiple words, perform an intersection search
        const queryWords = query.trim().split(/\s+/).filter(word => word.trim() !== '');
        let intersectionResults: MusicCardData[] = [];

        if (queryWords.length > 1) {
            const resultsByWord = queryWords.map(word =>
                fuse.search(word).map(result => result.item)
            );

            intersectionResults = allMusicData.filter(item =>
                resultsByWord.every(results => results.includes(item))
            );
        }

        // Combine the results, prioritizing exact matches and avoiding duplicates
        const combinedResults = [
            ...exactSearchResults,
            ...intersectionResults.filter(item => !exactSearchResults.includes(item))
        ];

        setFilteredData(combinedResults);
    }, [searchParams, fuse, allMusicData]);

    return {
        filteredData,
        loading
    };
} 