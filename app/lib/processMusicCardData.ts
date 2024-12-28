// utils/fetchAllMusicCardData.ts
"use server";
import { MusicCardData } from "@/app/components/MusicCard/types";
import * as fs from 'fs/promises';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(),'public', 'fake_data.json');

async function readJsonData(): Promise<{ [key: string]: any }> {
  try {
    const fileContents = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return {};
  }
}

async function writeJsonData(data: { [key: string]: any }): Promise<void> {
  try {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 4), 'utf-8');
  } catch (error) {
    console.error("Error writing to JSON file:", error);
  }
}

export async function fetchAllMusicCardData(
  pageSize: number,
  page: number
): Promise<MusicCardData[]> {
  try {
    const jsonData = await readJsonData();
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const musicCardDataArray: MusicCardData[] = [];

    const entries = Object.entries(jsonData);
    const paginatedEntries = entries.slice(startIndex, endIndex);

    for (const [music_id, data] of paginatedEntries) {
      musicCardDataArray.push({
        music_id: music_id,
        image_url: data.music_info.image_url,
        music_title: data.music_info.music_title,
        original_artist: data.music_info.original_artist,
        favorite: data.music_info.favorites,
        tags: data.music_tag,
      });
    }

    return musicCardDataArray;
  } catch (error) {
    console.error("Error fetching music card data:", error);
    return [];
  }
}

export async function fetchMusicCardDataByMusicId(
  music_id: string
): Promise<MusicCardData | null> {
  try {
    const jsonData = await readJsonData();
    const musicData = jsonData[music_id];

    if (!musicData) {
      return null;
    }

    const musicCardData: MusicCardData = {
      music_id: music_id,
      image_url: musicData.music_info.image_url,
      music_title: musicData.music_info.music_title,
      original_artist: musicData.music_info.original_artist,
      favorite: musicData.music_info.favorites,
      tags: musicData.music_tag,
    };

    return musicCardData;
  } catch (error) {
    console.error("Error fetching music card data:", error);
    return null;
  }
}

export async function updateMusicCardDataByMusicId(musicCardData: MusicCardData) {
  try {
    const jsonData = await readJsonData();

    if (jsonData[musicCardData.music_id]) {
      jsonData[musicCardData.music_id] = {
        ...jsonData[musicCardData.music_id],
        music_info: {
          ...jsonData[musicCardData.music_id].music_info,
          music_title: musicCardData.music_title,
          original_artist: musicCardData.original_artist,
          favorites: musicCardData.favorite // Assuming 'favorite' maps to 'favorites' in JSON
        },
        music_tag: musicCardData.tags,
      };
      await writeJsonData(jsonData);
      return true;
    } else {
      console.error(`Music ID ${musicCardData.music_id} not found in JSON data.`);
      return null;
    }
  } catch (error) {
    console.error("Error updating music card data:", error);
    return null;
  }
}

export async function deleteMusicCardDataByMusicId(music_id: string) {
  try {
    const jsonData = await readJsonData();
    if (jsonData[music_id]) {
      delete jsonData[music_id];
      await writeJsonData(jsonData);
      return { success: true }; // Return a similar structure to the original SQL response
    } else {
      console.warn(`Music ID ${music_id} not found, cannot delete.`);
      return { success: false, message: `Music ID ${music_id} not found.` };
    }
  } catch (error) {
    console.error("Error deleting music card data:", error);
    return { success: false, error: error };
  }
}