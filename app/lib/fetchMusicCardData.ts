// utils/fetchAllMusicCardData.ts
'use server';
import { createPool } from '@vercel/postgres';
import { MusicCardData } from "@/app/components/MusicCard/types";

const pool = createPool({
  connectionString: process.env.POSTGRES_URL || process.env.VERCEL_POSTGRES_URL,
});

async function fetchAllMusicCardData(): Promise<MusicCardData[]> {
  try {
    const musicInfoResult = await pool.query(`
      SELECT id, image_url, music_title, original_artist, favorite
      FROM music_info
    `);

    const musicTagsResult = await pool.query(`
      SELECT music_info_id, tag
      FROM music_tag
    `);

    // Create a map to efficiently group tags by music_info_id
    const tagsByMusicId: { [key: string]: string[] } = {};
    musicTagsResult.rows.forEach((row) => {
      const { music_info_id, tag } = row;
      if (tagsByMusicId[music_info_id]) {
        tagsByMusicId[music_info_id].push(tag);
      } else {
        tagsByMusicId[music_info_id] = [tag];
      }
    });

    const allMusicData: MusicCardData[] = musicInfoResult.rows.map((musicInfo) => {
      return {
        music_id: musicInfo.id,
        image_url: musicInfo.image_url,
        music_title: musicInfo.music_title,
        original_artist: musicInfo.original_artist,
        favorite: musicInfo.favorite,
        tags: tagsByMusicId[musicInfo.id] || [], // Use an empty array if no tags found
      };
    });

    return allMusicData;
  } catch (error) {
    console.error('Error fetching all music card data:', error);
    return []; // Return an empty array in case of error
  }
}

export default fetchAllMusicCardData;