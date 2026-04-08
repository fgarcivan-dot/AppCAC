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

import { CapacitorHttp } from '@capacitor/core';

// Interfaces (no cambiadas) ...

// URL de la API de GitHub para evitar la caché agresiva de raw.githubusercontent.com
const DEFAULT_API_URL = "https://api.github.com/repos/fgarcivan-dot/AppCAC/contents/public/app_data.json?ref=master";
// URL de rescate si la API falla
const FALLBACK_URL = "https://raw.githubusercontent.com/fgarcivan-dot/AppCAC/master/public/app_data.json";

export async function fetchAppData(url: string = DEFAULT_API_URL): Promise<AppData | null> {
  console.log("[DEBUG_CAC] Iniciando descarga de datos...");
  try {
    const cacheBuster = `${new Date().getTime()}`;
    
    // 🛠️ USO DE CAPACITOR HTTP NATIVO (Más robusto para móviles)
    const options = {
      url: url + `&t=${cacheBuster}`,
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
      connectTimeout: 15000,
      readTimeout: 15000
    };

    console.log("[DEBUG_CAC] Llamando a GitHub API Nativa...");
    const response = await CapacitorHttp.get(options);

    if (response.status !== 200) {
      throw new Error(`Status ${response.status}`);
    }

    const json = response.data;
    
    // La API de GitHub devuelve el contenido en base64. 
    if (json.content) {
      console.log("[DEBUG_CAC] Contenido recibido (Base64), decodificando...");
      const binaryString = atob(json.content.replace(/\n/g, ''));
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const decodedContent = new TextDecoder('utf-8').decode(bytes);
      const data = JSON.parse(decodedContent);
      console.log("[DEBUG_CAC] ¡Datos decodificados y listos!");
      return data as AppData;
    }

    if (json.config) return json as AppData;

  } catch (error) {
    console.warn("[DEBUG_CAC] GitHub API Nativa falló, intentando Fallback...", error);
    
    // Segundo intento: URL directa (Fallback) Nativa
    try {
      const cacheBuster = `${new Date().getTime()}`;
      const fallbackOptions = {
        url: FALLBACK_URL + `?t=${cacheBuster}`,
        headers: { 'Cache-Control': 'no-cache' }
      };
      const fallbackResponse = await CapacitorHttp.get(fallbackOptions);
      
      if (fallbackResponse.status === 200 && fallbackResponse.data && fallbackResponse.data.config) {
        console.log("[DEBUG_CAC] ¡Carga recuperada por Fallback Nativo!");
        return fallbackResponse.data as AppData;
      }
    } catch (fallbackError) {
      console.error("[DEBUG_CAC] Todos los intentos de descarga fallaron:", fallbackError);
    }
  }
  
  return null;
}
