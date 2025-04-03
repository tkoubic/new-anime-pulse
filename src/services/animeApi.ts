
import { toast } from "sonner";

export interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
    }
  };
  synopsis: string;
  score: number;
  aired: {
    from: string;
    to: string | null;
  };
  episodes: number | null;
  status: string;
  genres: {
    mal_id: number;
    name: string;
  }[];
  themes: {
    mal_id: number;
    name: string;
  }[];
  studios: {
    mal_id: number;
    name: string;
  }[];
}

interface AnimeResponse {
  data: Anime[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
  }
}

interface SingleAnimeResponse {
  data: Anime;
}

const BASE_URL = 'https://api.jikan.moe/v4';

// Rate limit handling - Jikan API has a limit of 3 requests per second
const queue: (() => Promise<void>)[] = [];
let processing = false;

const processQueue = async () => {
  if (processing || queue.length === 0) return;
  
  processing = true;
  const request = queue.shift();
  
  if (request) {
    await request();
    // Wait 350ms before processing next request to respect rate limit
    setTimeout(() => {
      processing = false;
      processQueue();
    }, 350);
  } else {
    processing = false;
  }
};

const enqueueRequest = <T>(requestFn: () => Promise<T>): Promise<T> => {
  return new Promise((resolve, reject) => {
    queue.push(async () => {
      try {
        const data = await requestFn();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
    
    processQueue();
  });
};

export const fetchRecentAnime = async (page = 1): Promise<AnimeResponse> => {
  return enqueueRequest(async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/seasons/now?page=${page}&limit=24&sfw=true`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch recent anime');
      }
      
      return await response.json();
    } catch (error) {
      toast.error("Error fetching anime data. Please try again later.");
      console.error("Error fetching anime data:", error);
      return { data: [], pagination: { last_visible_page: 1, has_next_page: false } };
    }
  });
};

export const fetchAnimeById = async (id: number): Promise<SingleAnimeResponse> => {
  return enqueueRequest(async () => {
    try {
      const response = await fetch(`${BASE_URL}/anime/${id}/full`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch anime details');
      }
      
      return await response.json();
    } catch (error) {
      toast.error("Error fetching anime details. Please try again later.");
      console.error("Error fetching anime details:", error);
      throw error;
    }
  });
};

export const fetchUpcomingAnime = async (page = 1): Promise<AnimeResponse> => {
  return enqueueRequest(async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/seasons/upcoming?page=${page}&limit=12&sfw=true`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch upcoming anime');
      }
      
      return await response.json();
    } catch (error) {
      toast.error("Error fetching upcoming anime data. Please try again later.");
      console.error("Error fetching upcoming anime data:", error);
      return { data: [], pagination: { last_visible_page: 1, has_next_page: false } };
    }
  });
};
