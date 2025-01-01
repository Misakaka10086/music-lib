"use server";
import { createPool } from "@vercel/postgres";
import { MusicCardData } from "@/app/components/MusicList/types";

const pool = createPool({
  connectionString: process.env.POSTGRES_URL || process.env.VERCEL_POSTGRES_URL,
});

// Create new music record
export async function createMusicRecord(data: Omit<MusicCardData, 'music_id'>) {
  try {
    // Insert into music_info table
    const musicResult = await pool.query(
      `
      INSERT INTO music_info (music_title, original_artist, image_url, favorite)
      VALUES ($1, $2, $3, $4)
      RETURNING id
      `,
      [data.music_title, data.original_artist, data.image_url, data.favorite || 0]
    );

    const musicId = musicResult.rows[0].id;

    // Insert tags into music_tag table
    if (data.tags && data.tags.length > 0) {
      for (const tag of data.tags) {
        await pool.query(
          `
          INSERT INTO music_tag (music_info_id, tag)
          VALUES ($1, $2)
          `,
          [musicId, tag]
        );
      }
    }

    return { success: true, music_id: musicId };
  } catch (error) {
    console.error("Error creating music record:", error);
    return { success: false, error: error };
  }
}

// Read music record by ID
export async function readMusicRecord(music_id: string) {
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
      SELECT tag
      FROM music_tag
      WHERE music_info_id = $1
      `,
      [music_id]
    );

    const tags = musicTagsResult.rows.map((row) => row.tag);

    const musicData: MusicCardData = {
      music_id: musicInfoResult.rows[0].id,
      image_url: musicInfoResult.rows[0].image_url,
      music_title: musicInfoResult.rows[0].music_title,
      original_artist: musicInfoResult.rows[0].original_artist,
      favorite: musicInfoResult.rows[0].favorite,
      tags: tags,
    };

    return musicData;
  } catch (error) {
    console.error("Error reading music record:", error);
    return null;
  }
}

// Update music record
export async function updateMusicRecord(data: MusicCardData) {
  try {
    // Update music_info table
    await pool.query(
      `
      UPDATE music_info
      SET music_title = $1, original_artist = $2, image_url = $3, favorite = $4
      WHERE id = $5
      `,
      [data.music_title, data.original_artist, data.image_url, data.favorite, data.music_id]
    );

    // Update tags (clear existing tags and insert new ones)
    await pool.query(
      `
      DELETE FROM music_tag
      WHERE music_info_id = $1
      `,
      [data.music_id]
    );

    if (data.tags && data.tags.length > 0) {
      for (const tag of data.tags) {
        await pool.query(
          `
          INSERT INTO music_tag (music_info_id, tag)
          VALUES ($1, $2)
          `,
          [data.music_id, tag]
        );
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating music record:", error);
    return { success: false, error: error };
  }
}

// Delete music record
export async function deleteMusicRecord(music_id: string) {
  try {
    // Delete related tags first
    await pool.query(
      `
      DELETE FROM music_tag
      WHERE music_info_id = $1
      `,
      [music_id]
    );

    // Delete music info
    await pool.query(
      `
      DELETE FROM music_info
      WHERE id = $1
      `,
      [music_id]
    );

    return { success: true };
  } catch (error) {
    console.error("Error deleting music record:", error);
    return { success: false, error: error };
  }
}

// List all music records
export async function listMusicRecords() {
  try {
    const musicInfoResult = await pool.query(
      `
      SELECT id, image_url, music_title, original_artist, favorite
      FROM music_info
      ORDER BY music_title
      `
    );

    const musicIds = musicInfoResult.rows.map((row) => row.id);

    const musicTagsResult = await pool.query(
      `
      SELECT music_info_id, tag
      FROM music_tag
      WHERE music_info_id = ANY($1)
      `,
      [musicIds]
    );

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
        tags: tagsByMusicId[musicInfo.id] || [],
      };
    });

    return allMusicData;
  } catch (error) {
    console.error("Error listing music records:", error);
    return [];
  }
}

interface StreamerData {
  id?: string;
  name: string;
  live_url: string;
  follower?: number;
}

// Create new streamer record
export async function createStreamerRecord(data: Omit<StreamerData, 'id'>) {
  try {
    const result = await pool.query(
      `
      INSERT INTO live_streamer (name, live_url, follower)
      VALUES ($1, $2, $3)
      RETURNING id
      `,
      [data.name, data.live_url, data.follower || 0]
    );
    return { success: true, id: result.rows[0].id };
  } catch (error) {
    console.error("Error creating streamer record:", error);
    return { success: false, error: error };
  }
}

// Read streamer record by ID
export async function readStreamerRecord(id: string) {
  try {
    const result = await pool.query(
      `
      SELECT id, name, live_url, follower
      FROM live_streamer
      WHERE id = $1
      `,
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error reading streamer record:", error);
    return null;
  }
}

// Update streamer record
export async function updateStreamerRecord(data: StreamerData) {
  try {
    await pool.query(
      `
      UPDATE live_streamer
      SET name = $1, live_url = $2, follower = $3
      WHERE id = $4
      `,
      [data.name, data.live_url, data.follower, data.id]
    );
    return { success: true };
  } catch (error) {
    console.error("Error updating streamer record:", error);
    return { success: false, error: error };
  }
}

// Delete streamer record
export async function deleteStreamerRecord(id: string) {
  try {
    await pool.query(
      `
      DELETE FROM live_streamer
      WHERE id = $1
      `,
      [id]
    );
    return { success: true };
  } catch (error) {
    console.error("Error deleting streamer record:", error);
    return { success: false, error: error };
  }
}

// List all streamer records
export async function listStreamerRecords() {
  try {
    const result = await pool.query(
      `
      SELECT id, name, live_url, follower
      FROM live_streamer
      ORDER BY name
      `
    );
    return result.rows;
  } catch (error) {
    console.error("Error listing streamer records:", error);
    return [];
  }
} 