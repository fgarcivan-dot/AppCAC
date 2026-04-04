import { AppData } from "./dataService";

export const INITIAL_DATA: AppData = {
  config: {
    temporada: "TEMP. 24/25",
    mesResultados: "MARZO 2025",
    mesPartidos: "ABRIL 2025"
  },
  inicio: {
    manifesto: {
      line1: "FORXA DE",
      line2: "CERCEDENSE",
      line3: "ORGULLO",
      highlight: "VIVO"
    },
    escolas: {
      headerTitleLine1: "ESCOLA DE FÚTBOL",
      headerTitleHighlight: "CAC",
      title: "FORXANDO O FUTURO",
      description: "Máis que un club, somos unha familia dedicada ao crecemento deportivo e persoal dos nosos rapaces. Un modelo formativo integral dende a base ata o máis alto.",
      btnText: "SABER MÁIS",
      btnLink: "/escola",
      uneteImage: "/images/unete_cac.webp",
      modeloFormativoTitle: "O NOSO MODELO FORMATIVO",
      tecnificacion: { title: "TECNIFICACIÓN", desc: "Mellora individualizada." },
      metodoloxia: { title: "METODOLOXÍA", desc: "Crecemento progresivo." },
      cafyd: { title: "CAFYD", desc: "Preparación física profesional." },
      direccion: { title: "DIRECCIÓN", desc: "Titulada pola RFEF/AGF." },
      uneteTitle: "ÚNETE Á FAMILIA DO CERCEDENSE",
      uneteDesc: "Forma parte de algo grande. Descubre a nosa metodoloxía e medra con nós.",
      uneteLink: "https://forms.gle/exemplo"
    },
    instaGrid: {
      title1: "VIVE A NOSA",
      title2Highlight: "PAIXÓN",
      description: "Sigue o día a día do club en tempo real. Fotos de adestramentos, partidos e toda a vida do CAC.",
      images: [
        "/images/insta1.webp",
        "/images/insta2.webp",
        "/images/insta3.webp",
        "/images/insta4.webp"
      ],
      btnText: "SEGUIR NO INSTAGRAM",
      instagramUrl: "https://instagram.com/atleticocercedense"
    },
    membership: {
      smallTitle: "FAI COA TÚA CARNÉ",
      mainTitleLine1: "SE O MEU AMIGO,",
      mainTitleHighlight: "FAI CLUB",
      description: "Desfruta de todos os partidos en casa, descontos en tendas colaboradoras e participa directamente no crecemento do noso club.",
      benefit1: "ACCESO A TODOS OS PARTIDOS EN CADA",
      benefit2: "10% DESCONTO NA TENDA OFICIAL",
      benefit3: "SORTEOS EXCLUSIVOS EN CADA XORNADA",
      btnText: "FAITE SOCIO AGORA",
      btnLink: "/socios",
      footerNote: "Temporada 2024/2025 - Unidos polo sentimento"
    }
  },
  equipos: {
    masculino: {
      posicion: "4º",
      matches: [
        {
          title: "PRÓXIMO PARTIDO",
          date: "DOM 06 ABR, 17:00H",
          home: "CERCEDENSE",
          away: "S.D.C TEIXEIRO",
          score: "0-0",
          venue: "O ROXO",
          time: "17:00H",
          status: "PRÓXIMO"
        },
        {
          title: "ÚLTIMO RESULTADO",
          date: "DOM 30 MAR, 17:00H",
          home: "AD PORTOMAZO",
          away: "CERCEDENSE",
          score: "1-2",
          venue: "O VAL",
          status: "FIN"
        }
      ],
      standings: [
        { pos: 1, team: "ORDES CF", pts: 58, pj: 24 },
        { pos: 2, team: "SD ABRENSE", pts: 54, pj: 24 },
        { pos: 3, team: "BETANZOS CF", pts: 51, pj: 24 },
        { pos: 4, team: "CERCEDENSE", pts: 49, pj: 24 },
        { pos: 5, team: "MEIRás", pts: 45, pj: 24 }
      ],
      externalUrl: "https://www.siguetuliga.com/liga/galicia-segunda-autonomica-coruna-grupo-2",
      socialPost: {
        imageUrl: "/images/social_masc.webp",
        caption: "Gran vitoria no campo do Portomazo. Seguimos escalando! #ForzaCac",
        postUrl: "https://instagram.com/p/masculino",
        date: "Fai 2 días"
      }
    },
    femenino: {
      posicion: "2ª",
      matches: [
        {
          title: "PRÓXIMO PARTIDO",
          date: "SÁB 05 ABR, 12:00H",
          home: "BETANZOS CF",
          away: "CERCEDENSE",
          score: "0-0",
          venue: "BETANZOS",
          time: "12:00H",
          status: "PRÓXIMO"
        },
        {
          title: "ÚLTIMO RESULTADO",
          date: "SÁB 22 MAR, 12:00H",
          home: "AD CULLEREDO",
          away: "CERCEDENSE",
          score: "1-8",
          venue: "CAMPO ALEGRET",
          status: "FIN"
        }
      ],
      standings: [
        { pos: 1, team: "ORDES CF", pts: 62, pj: 22 },
        { pos: 2, team: "CERCEDENSE", pts: 58, pj: 22 },
        { pos: 3, team: "AD CULLEREDO", pts: 45, pj: 22 },
        { pos: 4, team: "MEIRÁS CF", pts: 41, pj: 22 }
      ],
      externalUrl: "https://www.siguetuliga.com/liga/galicia-femenina-coruna",
      socialPost: {
        imageUrl: "/images/social_fem.webp",
        caption: "Goleada histórica en Culleredo. Imos polo ascenso! #OrgulloCac",
        postUrl: "https://instagram.com/p/femenino",
        date: "Fai 1 semana"
      }
    }
  },
  resultados: {
    lista: [
      { id: 1, home: "CERCEDENSE", away: "ORDES CF", score: "2 - 1", date: "MAR 30", venue: "CAMPO O ROXO", category: "SENIOR MASCULINO", result: "VITORIA", status: "FIN" },
      { id: 2, home: "BETANZOS CF", away: "CERCEDENSE", score: "0 - 3", date: "MAR 30", venue: "CAMPO DEP. BETANZOS", category: "SENIOR FEMININO", result: "VITORIA", status: "FIN" },
      { id: 3, home: "CERCEDENSE", away: "SD FISTERRA", score: "4 - 4", date: "MAR 29", venue: "CAMPO O ROXO", category: "XUVENIL", result: "EMPATE", status: "FIN" },
      { id: 4, home: "DESCANSO", away: "CERCEDENSE", score: "DESCANSA", date: "MAR 29", venue: "O ROXO", category: "CADETE", result: "EMPATE", status: "FIN" },
      { id: 5, home: "CERCEDENSE", away: "VICTORIA CF", score: "1 - 3", date: "MAR 29", venue: "CAMPO O ROXO", category: "INFANTIL", result: "DERROTA", status: "FIN" },
      { id: 6, home: "BOIRO CF", away: "CERCEDENSE", score: "1 - 2", date: "MAR 31", venue: "CAMPO MUNICIPAL BOIRO", category: "ALEVÍN A", result: "VITORIA", status: "FIN" },
      { id: 7, home: "CERCEDENSE", away: "URAL CF", score: "0 - 1", date: "MAR 31", venue: "CAMPO O ROXO", category: "ALEVÍN B", result: "DERROTA", status: "FIN" },
      { id: 8, home: "CERCEDENSE", away: "SAN TIRSO SD", score: "2 - 2", date: "MAR 31", venue: "CAMPO O ROXO", category: "BENXAMÍN A", result: "EMPATE", status: "FIN" },
      { id: 9, home: "ONCE CABALLEROS", away: "CERCEDENSE", score: "0 - 5", date: "MAR 31", venue: "CAMPO O TEMPLE", category: "BENXAMÍN B", result: "VITORIA", status: "FIN" },
      { id: 10, home: "CERCEDENSE", away: "DESCANSO", score: "DESCANSA", date: "MAR 17", venue: "O ROXO", category: "PREBENXAMÍN", result: "EMPATE", status: "FIN" },
      { id: 11, home: "CERCEDENSE", away: "CALASANZ", score: "3 - 1", date: "MAR 17", venue: "CAMPO O ROXO", category: "BIBERÓN", result: "VITORIA", status: "FIN" }
    ],
    balanceMasculino: { victorias: 14, empates: 4, derrotas: 6 },
    balanceFemenino: { victorias: 10, empates: 2, derrotas: 3 }
  },
  partidos: {
    proximos: [
      { id: 1, home: "CERCEDENSE", away: "S.D.C TEIXEIRO", date: "06 Abr", time: "17:00H", category: "SENIOR MASCULINO", venue: "CAMPO O ROXO" },
      { id: 2, home: "BETANZOS CF", away: "CERCEDENSE", date: "05 Abr", time: "12:00H", category: "SENIOR FEMININO", venue: "CAMPO DEP. BETANZOS" },
      { id: 3, home: "CERCEDENSE", away: "SD FISTERRA", date: "04 Abr", time: "16:30H", category: "XUVENIL", venue: "CAMPO O ROXO" },
      { id: 4, home: "DESCANSO", away: "CERCEDENSE", date: "04 Abr", time: "DESCANSA", category: "CADETE", venue: "O ROXO" },
      { id: 5, home: "CERCEDENSE", away: "VICTORIA CF", date: "04 Abr", time: "10:30H", category: "INFANTIL", venue: "CAMPO O ROXO" },
      { id: 6, home: "BOIRO CF", away: "CERCEDENSE", date: "06 Abr", time: "11:00H", category: "ALEVÍN A", venue: "CAMPO MUNICIPAL BOIRO" },
      { id: 7, home: "CERCEDENSE", away: "URAL CF", date: "06 Abr", time: "12:30H", category: "ALEVÍN B", venue: "CAMPO O ROXO" },
      { id: 8, home: "CERCEDENSE", away: "SAN TIRSO SD", date: "06 Abr", time: "10:00H", category: "BENXAMÍN A", venue: "CAMPO O ROXO" },
      { id: 9, home: "ONCE CABALLEROS", away: "CERCEDENSE", date: "06 Abr", time: "11:15H", category: "BENXAMÍN B", venue: "CAMPO O TEMPLE" },
      { id: 10, home: "CERCEDENSE", away: "DESCANSO", date: "07 Abr", time: "DESCANSA", category: "PREBENXAMÍN", venue: "O ROXO" },
      { id: 11, home: "CERCEDENSE", away: "CALASANZ", date: "07 Abr", time: "10:00H", category: "BIBERÓN", venue: "CAMPO O ROXO" }
    ]
  },
  directo: {
    isLive: false,
    statusText: "PRÓXIMA RETRANSMISIÓN",
    description: "Sigue en directo o partido do Senior Masculino dende o Campo O Roxo.",
    youtubeUrl: "https://youtube.com/live/exemplo",
    nextEventTitle: "CERCEDENSE vs TEIXEIRO",
    nextEventDate: "DOMINGO 06 ABRIL, 17:00H"
  },
  contacto: {
    address: "Campo O Roxo, Cerceda, 15185 A Coruña",
    email: "clubatleticocercedense@gmail.com",
    phone: "600 000 000",
    instagramUrl: "https://instagram.com/atleticocercedense",
    facebookUrl: "https://facebook.com/atleticocercedense",
    twitterUrl: "https://twitter.com/atleticocercedense"
  }
};
