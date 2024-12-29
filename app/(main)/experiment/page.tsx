import { Box } from "@mui/material";
import TableSkeleton from "@/app/components/ui/TableSkeleton";
import Search from "@/app/components/ui/search";
import { Suspense } from "react";
import MusicTable from "@/app/components/ui/MusicTable";
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
      <Suspense key={query} fallback={<TableSkeleton />}>
        <MusicTable query={query} />
      </Suspense>
    </Box>
  );
}
