"use client";

import { Match } from "@/components/mobile/ui/MatchCarousel";
import { StandingRow } from "@/components/mobile/ui/ClassificationTable";

export interface AppData {
  masculino: {
    posicion: string;
    matches: Match[];
    standings: StandingRow[];
    externalUrl: string;
    socialPost: {
      imageUrl: string;
      caption: string;
      postUrl: string;
      date: string;
    };
  };
  femenino: {
    posicion: string;
    matches: Match[];
    standings: StandingRow[];
    externalUrl: string;
    socialPost: {
      imageUrl: string;
      caption: string;
      postUrl: string;
      date: string;
    };
  };
}

// Tu URL real de Gist configurada para actualizaciones en tiempo real
const DEFAULT_GIST_URL = "https://gist.githubusercontent.com/fgarcivan-dot/377fdbc02765cffe49dbd86faa141dc4/raw/app_data.json";

export async function fetchAppData(url: string = DEFAULT_GIST_URL): Promise<AppData | null> {
  try {
    // Add timestamp to prevent caching issues on mobile
    const cacheBuster = `?t=${new Date().getTime()}`;
    const response = await fetch(url + cacheBuster);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data as AppData;
  } catch (error) {
    console.error("Error fetching app data from Gist:", error);
    return null; // Fallback to local static data
  }
}
