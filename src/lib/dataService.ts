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

// Tu URL real de Gist configurada para actualizaciones en tiempo real
const DEFAULT_GIST_URL = "https://raw.githubusercontent.com/fgarcivan-dot/AppCAC/master/public/app_data.json";

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
