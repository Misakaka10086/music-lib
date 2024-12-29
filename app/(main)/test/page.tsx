import { Box } from "@mui/material";
import TestSkeleton from "@/app/components/ui/skeleton";
import MusicCard from "@/app/components/ui/card";
import Search from "@/app/components/ui/search";
import { Suspense } from "react";
export default async function Page(props: {
  searchParams?: Promise<{
    query: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  return (
    <Box sx={{ p: 1 }}>
      <Search placeholder="Search for music" />
      <Suspense key={query} fallback={<TestSkeleton />}>
        <MusicCard query={query} />
      </Suspense>
    </Box>
  );
}
