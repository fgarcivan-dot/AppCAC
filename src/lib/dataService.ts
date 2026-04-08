"use client";

import { Match } from "@/components/mobile/ui/MatchCarousel";
import { StandingRow } from "@/components/mobile/ui/ClassificationTable";

export interface HomeContent {
  manifesto?: {
    line1?: string;
    line2?: string;
    line3?: string;
    highlight?: string;
  };
  escolas?: {
    headerTitleLine1?: string;
    headerTitleHighlight?: string;
    title?: string;
    description?: string;
    btnText?: string;
    btnLink?: string;
    uneteImage?: string;
    modeloFormativoTitle?: string;
    tecnificacion?: { title: string; desc: string };
    metodoloxia?: { title: string; desc: string };
    cafyd?: { title: string; desc: string };
    direccion?: { title: string; desc: string };
    uneteTitle?: string;
    uneteDesc?: string;
    uneteLink?: string;
  };
  instaGrid?: {
    title1?: string;
    title2Highlight?: string;
    description?: string;
    images?: string[];
    btnText?: string;
    instagramUrl?: string;
  };
  membership?: {
    smallTitle?: string;
    mainTitleLine1?: string;
    mainTitleHighlight?: string;
    description?: string;
    benefit1?: string;
    benefit2?: string;
    benefit3?: string;
    btnText?: string;
    btnLink?: string;
    footerNote?: string;
  };
}

export interface ResultRow {
  id: number | string;
  home: string;
  away: string;
  score: string;
  date: string;
  time?: string;
  venue: string;
  category: string;
  result: "VITORIA" | "DERROTA" | "EMPATE";
  status?: string;
}

export interface DirectoContent {
  isLive: boolean;
  statusText: string;
  description: string;
  youtubeUrl: string;
  nextEventTitle: string;
  nextEventDate: string;
}

export interface ContactoContent {
  address: string;
  email: string;
  phone: string;
  instagramUrl: string;
  facebookUrl: string;
  twitterUrl: string;
}

export interface PartidosContent {
  matches: {
    id: number | string;
    home: string;
    away: string;
    date: string;
    time: string;
    category: string;
    venue: string;
  }[];
}

export interface AppConfig {
  temporada: string;
  mesResultados: string;
  mesPartidos: string;
}

export interface ResultadosData {
  lista: ResultRow[];
  balanceMasculino: { victorias: number; empates: number; derrotas: number };
  balanceFemenino: { victorias: number; empates: number; derrotas: number };
}

export interface PartidosData {
  proximos: {
    id: number | string;
    home: string;
    away: string;
    date: string;
    time: string;
    category: string;
    venue: string;
  }[];
}

export interface EquiposData {
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

export interface AppData {
  config: AppConfig;
  inicio: HomeContent;
  equipos: EquiposData;
  resultados: ResultadosData;
  partidos: PartidosData;
  directo: DirectoContent;
  contacto: ContactoContent;
}

// URL de la API de GitHub para evitar la caché agresiva de raw.githubusercontent.com
const DEFAULT_API_URL = "https://api.github.com/repos/fgarcivan-dot/AppCAC/contents/public/app_data.json?ref=master";

export async function fetchAppData(url: string = DEFAULT_API_URL): Promise<AppData | null> {
  try {
    // Add timestamp to prevent caching issues
    const cacheBuster = `&t=${new Date().getTime()}`;
    const response = await fetch(url + cacheBuster, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Cache-Control': 'no-cache'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from GitHub API: ${response.statusText}`);
    }

    const json = await response.json();
    
    // La API de GitHub devuelve el contenido en base64
    if (json.content) {
      const decodedContent = atob(json.content.replace(/\n/g, ''));
      const data = JSON.parse(decodedContent);
      return data as AppData;
    }

    return json as AppData; // Fallback if it's already parsed
  } catch (error) {
    console.error("Error fetching app data:", error);
    return null;
  }
}
