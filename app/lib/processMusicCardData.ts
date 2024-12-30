// utils/fetchAllMusicCardData.ts
"use server";
import { createPool } from "@vercel/postgres";
import { MusicCardData } from "@/app/components/MusicCard/types";

const pool = createPool({
  connectionString: process.env.POSTGRES_URL || process.env.VERCEL_POSTGRES_URL,
});

export async function fetchAllMusicCardData(
  pageSize: number,
  page: number
): Promise<MusicCardData[]> {
  try {
    // Calculate offset for pagination
    const offset = (page - 1) * pageSize;

    // Fetch paginated music info
    const musicInfoResult = await pool.query(
      `
      SELECT id, image_url, music_title, original_artist, favorite
      FROM music_info
      ORDER BY id
      LIMIT $1 OFFSET $2
    `,
      [pageSize, offset]
    );

    // Get music IDs from the current page
    const musicIds = musicInfoResult.rows.map((row) => row.id);

    // Fetch tags only for the current page's music
    const musicTagsResult = await pool.query(
      `
      SELECT music_info_id, tag
      FROM music_tag
      WHERE music_info_id = ANY($1)
    `,
      [musicIds]
    );

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

    // Map the results to MusicCardData
    const allMusicData: MusicCardData[] = musicInfoResult.rows.map(
      (musicInfo) => {
        return {
          music_id: musicInfo.id,
          image_url: musicInfo.image_url,
          music_title: musicInfo.music_title,
          original_artist: musicInfo.original_artist,
          favorite: musicInfo.favorite,
          tags: tagsByMusicId[musicInfo.id] || [],
        };
      }
    );

    return allMusicData;
  } catch (error) {
    console.error("Error fetching music card data:", error);
    return [];
  }
}

export async function fetchMusicCardDataByMusicId(
  music_id: string
): Promise<MusicCardData | null> {
  try {
    const musicInfoResult = await pool.query(
      `
      SELECT id, image_url, music_title, original_artist, favorite
      FROM music_info
      WHERE id = $1
    `,
      [music_id]
    );

    const musicTagsResult = await pool.query(
      `
      SELECT music_info_id, tag
      FROM music_tag
      WHERE music_info_id = $1
    `,
      [music_id]
    );

    const tags = musicTagsResult.rows.map((row) => row.tag);

    const musicCardData: MusicCardData = {
      music_id: musicInfoResult.rows[0].id,
      image_url: musicInfoResult.rows[0].image_url,
      music_title: musicInfoResult.rows[0].music_title,
      original_artist: musicInfoResult.rows[0].original_artist,
      favorite: musicInfoResult.rows[0].favorite,
      tags: tags,
    };

    return musicCardData;
  } catch (error) {
    console.error("Error fetching music card data:", error);
    return null;
  }
}

export async function updateMusicCardDataByMusicId(musicCardData: MusicCardData) {
  try {
    // Update music_info table
    await pool.query(
      `
      UPDATE music_info
      SET music_title = $1, original_artist = $2
      WHERE id = $3
      `,
      [musicCardData.music_title, musicCardData.original_artist, musicCardData.music_id]
    );

    // Update tags (clear existing tags and insert new ones)
    await pool.query(
      `
      DELETE FROM music_tag
      WHERE music_info_id = $1
      `,
      [musicCardData.music_id]
    );

    for (const tag of musicCardData.tags) {
      await pool.query(
        `
        INSERT INTO music_tag (music_info_id, tag)
        VALUES ($1, $2)
        `,
        [musicCardData.music_id, tag]
      );
    }

    // Return a truthy value to indicate success
    return true;
  } catch (error) {
    console.error("Error updating music card data:", error);
    return null;
  }
}

// export async function deleteMusicCardDataByMusicId(music_id: string) {
//   await pool.query(`DELETE FROM music_info WHERE id = $1`, [music_id]);
//   //await pool.query(`DELETE FROM music_tag WHERE music_info_id = $1`, [music_id]);
// }

export async function deleteMusicCardDataByMusicId(music_id: string) {

    // Before deleting from music_info, delete any related records in music_tag
    await pool.query(`DELETE FROM music_tag WHERE music_info_id = $1`, [music_id]);

    const result = await pool.query(`DELETE FROM music_info WHERE id = $1`, [music_id]);

    return result;

}


export async function fetchFilteredMusicCardData(
  query: string,
): Promise<MusicCardData[]> {
  try {
    // Fetch music info that matches title, artist or tags
    const musicInfoResult = await pool.query(
      `
      SELECT mi.id, mi.image_url, mi.music_title, mi.original_artist, mi.favorite
      FROM music_info mi
      LEFT JOIN music_tag mt ON mi.id = mt.music_info_id
      WHERE 
        mi.music_title ILIKE $1 OR 
        mi.original_artist ILIKE $1 OR
        mt.tag ILIKE $1
      GROUP BY mi.id
      ORDER BY mi.id
    `,
      [`%${query}%`]
    );

    // Get music IDs from the results
    const musicIds = musicInfoResult.rows.map((row) => row.id);

    // Fetch tags only for the matched music
    const musicTagsResult = await pool.query(
      `
      SELECT music_info_id, tag
      FROM music_tag
      WHERE music_info_id = ANY($1)
    `,
      [musicIds]
    );

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

    // Map the results to MusicCardData
    const allMusicData: MusicCardData[] = musicInfoResult.rows.map(
      (musicInfo) => {
        return {
          music_id: musicInfo.id,
          image_url: musicInfo.image_url,
          music_title: musicInfo.music_title,
          original_artist: musicInfo.original_artist,
          favorite: musicInfo.favorite,
          tags: tagsByMusicId[musicInfo.id] || [],
        };
      }
    );

    return allMusicData;
  } catch (error) {
    console.error("Error fetching music card data:", error);
    return [];
  }
}

export async function fetchAllTags() {
  const tagsResult = await pool.query(`SELECT DISTINCT tag FROM music_tag`);
  return tagsResult.rows.map((row) => row.tag);
}
