// Contenu du site. Tout le texte est ici : modifie-le librement sans toucher à app.js.
// Les `id` (votants, questions, options) servent de clés dans Firebase : ne les change pas
// une fois que des votes existent (les noms affichés, eux, peuvent changer à tout moment).
//
// Version du 3 novembre 2026 : nouvelles dates (13 → 21 février 2027), nouvelles formules.
// Les questions portent le suffixe « -fev27 » : les votes d'octobre (questions sans suffixe)
// restent dans Firebase mais ne sont plus affichés, ce qui remet les compteurs à zéro.

export const TRIP = {
  title: "Raid motoneige en Laponie",
  dates: "13 – 21 février 2027",
  from: "Paris",
  summary:
    "Trois frères, trois permis B, une motoneige chacun. Nouvelles dates en plein cœur de l'hiver : neige et glace au top, nuits longues pour les aurores, et toutes les recherches refaites. Les quatre formules ci-dessous reprennent ce que vous aviez voté en octobre (Père Noël, aurores, sauna, une vraie part de raid) : lisez, puis votez en bas de page. Les compteurs repartent de zéro.",
};

// Les trois votants. Change `name` pour mettre vos vrais prénoms.
// Les `id` doivent rester identiques à ceux de firestore.rules.
export const VOTERS = [
  { id: "frere1", name: "Etienne" },
  { id: "frere2", name: "Nicolas" },
  { id: "frere3", name: "Benjamin" },
];

// Les parents donnent leur avis : il s'affiche à part et ne compte pas dans le résultat.
// Mêmes règles que VOTERS pour les `id` (repris dans firestore.rules).
export const PARENTS = [
  { id: "papa", name: "Papa" },
  { id: "maman", name: "Maman" },
];

// Ce que les votes d'octobre 2026 ont déjà tranché. Sert de cahier des charges aux formules.
export const PREFERENCES = [
  {
    title: "Formules",
    items: [
      "Raid 2 jours, raid 5 jours et plan éco : 3 votes sur 3 chacun.",
      "Base en ville sans itinérance, et double raid à ~3 000 € : aucun vote.",
      "Donc : une vraie part de raid, sans exploser le budget.",
    ],
  },
  {
    title: "Activités",
    items: [
      "Santa Claus Village, aurores boréales, sauna + bain glacé : 3 sur 3.",
      "Husky : Etienne et Nicolas. Pêche sur glace : Nicolas et Benjamin. Ferme de rennes : Etienne.",
      "Donc : Père Noël, une sortie aurores et du sauna dans chaque formule ; husky et pêche en option.",
    ],
  },
  {
    title: "Logistique",
    items: [
      "Hébergement : le moins cher (3 sur 3). Nicolas : en ville si elle vaut le coup, sinon chalet, et penser aux restos.",
      "Vols : le moins cher, peu importe la compagnie (3 sur 3).",
      "Durée : les 9 jours complets (3 sur 3), donc du samedi 13 au dimanche 21 février.",
    ],
  },
];

// Le plan mis en avant, et la grille qui le justifie face aux autres.
// Statuts : "ok" = coché, "mid" = à moitié, "ko" = non.
export const RECOMMENDATION = {
  plan: "plan4",
  title: "Plan 4 : Père Noël puis Inari",
  summary:
    "C'est le seul plan qui coche toutes vos conditions sauf une : une motoneige chacun garantie par l'opérateur, le Père Noël, une nuit dehors avec sauna, et surtout les meilleures chances d'aurores, votre priorité n°1. Il coûte environ 100 € de moins que le plan 1, pour un ciel bien plus noir.",
  tradeoffs: [
    "Deux trajets de bus d'environ 4 h 20 entre Rovaniemi et Inari.",
    "≈ 2 800 € : 250 à 300 € de plus que les plans 2 et 3.",
    "Une seule nuit dehors, comme les plans 1 et 2.",
  ],
  criteria: [
    {
      label: "Une motoneige chacun, garantie",
      cells: { plan1: ["ok", "Écrit par l'opérateur"], plan2: ["ko", "Tarif à 2 par motoneige"], plan3: ["ok", "Tarif solo sur chaque sortie"], plan4: ["ok", "Imposé par l'opérateur"] },
    },
    {
      label: "Père Noël (3 sur 3)",
      cells: { plan1: ["ok", "Dimanche 14"], plan2: ["ok", "Dimanche 14"], plan3: ["ok", "Dimanche 14"], plan4: ["ok", "Dimanche 14"] },
    },
    {
      label: "Aurores (3 sur 3)",
      cells: { plan1: ["mid", "66,5°N"], plan2: ["mid", "66,5°N"], plan3: ["mid", "66°N"], plan4: ["ok", "69°N, ciel noir"] },
    },
    {
      label: "Sauna (3 sur 3)",
      cells: { plan1: ["ok", "Cabane du raid"], plan2: ["ok", "Cabane, sauna au bois"], plan3: ["mid", "Selon le logement"], plan4: ["ok", "Chalet du raid"] },
    },
    {
      label: "Une vraie part de raid",
      cells: { plan1: ["ok", "2 jours, 1 nuit dehors"], plan2: ["ok", "2 jours, 1 nuit dehors"], plan3: ["mid", "4 jours, sans nuit dehors"], plan4: ["ok", "2 jours, 1 nuit dehors"] },
    },
    {
      label: "Paysages",
      cells: { plan1: ["mid", "Forêts et fells"], plan2: ["mid", "Forêts et lacs"], plan3: ["mid", "Collines de Ruka"], plan4: ["ok", "Lac Inari, culture sami"] },
    },
    {
      label: "Budget, vols compris",
      cells: { plan1: ["mid", "≈ 2 900 €"], plan2: ["ok", "≈ 2 500 € + solo"], plan3: ["ok", "≈ 2 550 €"], plan4: ["mid", "≈ 2 800 €"] },
    },
  ],
};

export const SOURCES = {
  heartOfWilderness: { label: "Arctic Expeditions – Heart of Wilderness (2 jours)", url: "https://www.arcticexpeditions.fi/heart-of-wilderness/" },
  staylapland: { label: "StayLapland – nuit en cabane + 2 jours motoneige", url: "https://staylapland.com/product/snowmobile-in-the-arctic-nature/" },
  laplandSafaris2027: { label: "Lapland Safaris – programme Rovaniemi hiver 2027 (PDF)", url: "https://a.storyblok.com/f/279002/x/2d0ff6fecb/rovaniemi-winter-safaris-2027-french.pdf" },
  rukaActive: { label: "Ruka – programme hebdo hiver 2026-2027 (Active Hobbyist)", url: "https://www.ruka.fi/en/node/2997" },
  rukaOutdoor: { label: "Ruka – programme hebdo hiver 2026-2027 (Outdoor Explorer)", url: "https://www.ruka.fi/en/node/2996" },
  rukaBus: { label: "Ruka – bus Rovaniemi ↔ Kuusamo", url: "https://www.ruka.fi/en/node/202" },
  inariOvernight: { label: "Visit Inari – Overnight Snowmobile Safari", url: "https://visitinari.fi/overnight-snowmobile-safari/" },
  inariAurora: { label: "Visit Inari – Aurora Snowmobile Expedition", url: "https://visitinari.fi/aurora-snowmobile-expedition/" },
  inariArchipelago: { label: "Visit Inari – Arctic Archipelago (6 h)", url: "https://visitinari.fi/?p=268862" },
  busInari: { label: "Rome2rio – bus Rovaniemi → Inari", url: "https://www.rome2rio.com/s/Rovaniemi/Inari" },
  volsFevrier: { label: "Où et quand – prix des vols Paris → Rovaniemi en février", url: "https://www.ou-et-quand.net/vols/laponie/rovaniemi/mois/fevrier/" },
  liligo: { label: "Liligo – Paris → Rovaniemi (direct relevé 14 → 21 fév.)", url: "https://www.liligo.fr/vols/itineraires/paris/rovaniemi" },
  vacances: { label: "Vacances d'hiver 2027 par zone", url: "https://icalendrier.fr/vacances/hiver" },
  arcticExpeditions: { label: "Arctic Expeditions – toutes les expéditions", url: "https://www.arcticexpeditions.fi/" },
  campXplore: { label: "Camp Xplore – raid 6 jours Kuusamo", url: "https://www.rentalmotorbike.com/ar/tours/snowmobile-tour-finland-arctic-circle" },
  inariArcticOcean: { label: "Visit Inari – Arctic Ocean Safari", url: "https://visitinari.fi/arctic-ocean-safari/" },
};

export const PLANS = [
  {
    id: "plan1",
    number: 1,
    title: "Rovaniemi + raid 2 jours en cabane",
    tagline: "Le bon compromis",
    place: "Rovaniemi + cabane isolée",
    budget: "≈ 2 900 €",
    budgetNote: "par personne, vols compris, une motoneige chacun partout",
    intensity: 2,
    compare: {
      roaming: "2 jours / 1 nuit en cabane",
      riding: "4 sorties : 6 h, 3 h de nuit, puis 60–100 km + 80–120 km",
      aurora: "Lundi 15 en motoneige",
    },
    idea:
      "La suite du plan 2 que vous aviez tous coché. Base à Rovaniemi, une grosse journée motoneige qui finit chez le Père Noël, une sortie aurores, et au milieu le raid « Heart of Wilderness » : deux jours de motoneige et une nuit dans une cabane isolée avec sauna.",
    blocks: [
      {
        title: "Le raid « Heart of Wilderness » (Arctic Expeditions)",
        items: [
          "Jour 1 : Rovaniemi → cabane isolée, 60–100 km. Jour 2 : retour, 80–120 km. 6 à 10 h par jour pauses comprises.",
          "Inclus : équipement grand froid, nuit en cabane, pension complète, sauna, essence, assurance, guide, transferts.",
          "1 395 €/pers. dès 2 personnes (1 195 € à partir de 6). Départs garantis chaque semaine de janvier à mars : à 3, rejoindre un départ garanti.",
          "Chacun conduit sa propre motoneige tous les jours. Journée en plus possible : 800 €.",
        ],
      },
      {
        title: "Autour du raid (Lapland Safaris, Rovaniemi)",
        items: [
          "Father Christmas Safari, 6 h : motoneige jusqu'à une ferme de rennes, balade en traîneau, déjeuner, Santa Claus Village. 268 € + supplément solo.",
          "Aurores en motoneige, 3 h : 179 € + 50 € solo, départs lun./mer./dim. à 18 h en février.",
          "Supplément solo : 50 € affiché sur certaines sorties, 85 € selon les conditions générales pour 4 h et plus.",
          "Options : husky 2 h 30 / 10 km (221 €), pêche sur glace en motoneige 4 h (208 € + solo).",
        ],
      },
      {
        title: "Budget par personne",
        items: [
          "Vols Paris → Rovaniemi : 300 – 450 € (moyenne février 388 €, direct relevé à 267 € pour le 14 → 21)",
          "Raid Heart of Wilderness : 1 395 €",
          "Father Christmas Safari en solo : 318 – 353 €",
          "Aurores en motoneige en solo : 229 €",
          "6 nuits en appart/chalet à Rovaniemi, partagé à 3 : ≈ 360 € (estimation)",
          "Repas hors raid : ≈ 200 € (estimation)",
          "Total : ≈ 2 900 €, plus ≈ 220–290 € par option (husky, pêche)",
        ],
      },
    ],
    timeline: [
      { day: "Sam. 13", text: "Vol Paris → Rovaniemi, installation en appart ou chalet." },
      { day: "Dim. 14", text: "Father Christmas Safari : motoneige, ferme de rennes, Santa Claus Village." },
      { day: "Lun. 15", text: "Journée libre (husky en option). Le soir, aurores en motoneige (lune à 67 %)." },
      { day: "Mar. 16 – Mer. 17", text: "Raid Heart of Wilderness : nuit en cabane isolée avec sauna." },
      { day: "Jeu. 18", text: "Repos, sauna, restos en ville." },
      { day: "Ven. 19", text: "Option : pêche sur glace en motoneige (4 h)." },
      { day: "Sam. 20", text: "Libre : Arktikum, shopping, dernière nuit d'aurores." },
      { day: "Dim. 21", text: "Retour à Paris." },
    ],
    pros: ["Tout ce que vous aviez voté : Père Noël, aurores, sauna, raid", "Un seul opérateur pour le raid, monoplace écrite", "Vols directs et pas chers vers Rovaniemi"],
    cons: ["Itinérance limitée à 2 jours", "Rovaniemi = 66,5°N : aurores un peu moins fréquentes qu'au grand nord", "≈ 2 900 € : au-dessus du plan éco"],
    sources: ["heartOfWilderness", "laplandSafaris2027", "volsFevrier", "liligo"],
  },
  {
    id: "plan2",
    number: 2,
    title: "Rovaniemi éco + nuit en cabane à Kuoksa",
    tagline: "Le moins cher",
    place: "Rovaniemi + cabane au parc de Kuoksa",
    budget: "≈ 2 500 €",
    budgetNote: "par personne, vols compris ; supplément solo du raid à faire chiffrer",
    intensity: 2,
    compare: {
      roaming: "2 jours / 1 nuit en cabane",
      riding: "4 sorties : 6 h, 3 h de nuit, puis 2 jours (50–100 km le 1er)",
      aurora: "Lundi 15 en motoneige + nuit en cabane loin des lumières",
    },
    idea:
      "La suite du plan éco. Même déroulé que le plan 1, mais le raid est celui de StayLapland : guide privé, deux journées de motoneige dans le parc de Kuoksa et une nuit dans une cabane traditionnelle avec sauna au bois, loin de toute lumière pour les aurores. Environ 400 € de moins, à condition qu'ils confirment une motoneige chacun.",
    blocks: [
      {
        title: "Le raid Kuoksa (StayLapland)",
        items: [
          "Jour 1 : 50–100 km avec un guide privé jusqu'à une cabane traditionnelle, sauna au bois, dîner, guet des aurores. Jour 2 : retour en ville.",
          "Dès 990 €/pers. Le tarif de base est en « twin drive » (2 par motoneige) : le prix avec une motoneige chacun est à demander.",
          "Code EARLY27 : -10 % affiché pour l'hiver 2026-2027.",
          "Prise en charge à moins de 10 km du centre de Rovaniemi. Annulation gratuite jusqu'à 7 jours avant.",
        ],
      },
      {
        title: "Autour du raid",
        items: [
          "Father Christmas Safari (Père Noël + rennes, 6 h) et aurores en motoneige, comme le plan 1.",
          "Options : husky 10 km (221 €), pêche sur glace (208 € + solo).",
        ],
      },
      {
        title: "Budget par personne",
        items: [
          "Vols Paris → Rovaniemi : 300 – 450 €",
          "Raid Kuoksa : dès 990 € (+ supplément solo à chiffrer)",
          "Father Christmas Safari en solo : 318 – 353 €",
          "Aurores en motoneige en solo : 229 €",
          "6 nuits à Rovaniemi, partagé à 3 : ≈ 360 € (estimation)",
          "Repas hors raid : ≈ 200 € (estimation)",
          "Total : ≈ 2 500 €, avant supplément solo du raid",
        ],
      },
    ],
    timeline: [
      { day: "Sam. 13", text: "Vol Paris → Rovaniemi, installation." },
      { day: "Dim. 14", text: "Father Christmas Safari : motoneige, rennes, Santa Claus Village." },
      { day: "Lun. 15", text: "Journée libre (husky en option). Le soir, aurores en motoneige." },
      { day: "Mar. 16 – Mer. 17", text: "Raid Kuoksa : 2 jours de motoneige, nuit en cabane avec sauna." },
      { day: "Jeu. 18 – Sam. 20", text: "Repos, pêche sur glace en option, restos, dernière nuit d'aurores." },
      { day: "Dim. 21", text: "Retour à Paris." },
    ],
    pros: ["Le moins cher avec une nuit dehors", "Guide privé, rien que vous trois", "Annulation souple (7 jours avant)"],
    cons: ["Une motoneige chacun non garantie au tarif affiché", "Kilométrage du 2e jour non précisé", "Même latitude que le plan 1"],
    sources: ["staylapland", "laplandSafaris2027", "volsFevrier"],
  },
  {
    id: "plan3",
    number: 3,
    title: "Ruka : 4 jours de motoneige + Père Noël à Rovaniemi",
    tagline: "Le plus de motoneige",
    place: "Rovaniemi puis Ruka – Kuusamo",
    budget: "≈ 2 550 €",
    budgetNote: "par personne, vols compris, une motoneige chacun sur chaque sortie",
    intensity: 3,
    compare: {
      roaming: "Non : base à Ruka, une sortie différente chaque jour",
      riding: "4 journées dont 6 h / 100 km à la frontière russe, + 1 sortie de nuit",
      aurora: "Dimanche 14 en motoneige à Rovaniemi",
    },
    idea:
      "La suite du plan 3 « Ruka », sans le prix d'un séjour packagé. On arrive à Rovaniemi pour le Père Noël et les aurores, puis bus vers Ruka et quatre journées de motoneige au choix dans le programme de la station, jusqu'à la grande sortie de 6 h vers Kuntivaara et la frontière russe.",
    blocks: [
      {
        title: "Les sorties à Ruka (programme hebdo 2026-2027, prix en solo)",
        items: [
          "Arctic Speed, 5 h avec déjeuner : 287 €.",
          "Motoneige + husky, 3 h (20 km de motoneige + 2,5 km de traîneau) : 185 €.",
          "Kuntivaara et la frontière, 6 h, jusqu'à 100 km, déjeuner : 325 € (expérience demandée : à placer en dernier).",
          "Autres : aurores en motoneige 3 h (210 €), husky 5 km (120 €).",
        ],
      },
      {
        title: "Rovaniemi ↔ Ruka",
        items: [
          "Bus Rovaniemi → Kuusamo du lundi au vendredi : départ 16 h 25, arrivée 19 h 35. Retour Kuusamo 9 h 15 → Rovaniemi 12 h 40.",
          "SkiBus Kuusamo → Ruka les mardi, jeudi et vendredi ; sinon taxi.",
          "Prix du bus : ≈ 40 – 50 € par trajet (Rome2rio).",
        ],
      },
      {
        title: "Budget par personne",
        items: [
          "Vols Paris → Rovaniemi : 300 – 450 €",
          "Father Christmas Safari en solo : 318 – 353 € ; aurores en motoneige en solo : 229 €",
          "4 sorties à Ruka en solo : 287 + 185 + 325 € = 797 €",
          "Bus aller-retour + taxi : ≈ 120 € (estimation)",
          "7 nuits (3 à Rovaniemi, 4 à Ruka), partagé à 3 : ≈ 420 € (estimation)",
          "Repas : ≈ 280 € (estimation)",
          "Total : ≈ 2 550 €",
        ],
      },
    ],
    timeline: [
      { day: "Sam. 13", text: "Vol Paris → Rovaniemi." },
      { day: "Dim. 14", text: "Father Christmas Safari (10 h – 16 h), puis aurores en motoneige (18 h – 21 h, lune à 56 %)." },
      { day: "Lun. 15", text: "Bus Rovaniemi → Kuusamo (16 h 25), taxi jusqu'à Ruka." },
      { day: "Mar. 16", text: "Arctic Speed, 5 h de motoneige avec déjeuner." },
      { day: "Mer. 17", text: "Motoneige + husky." },
      { day: "Jeu. 18", text: "Grande sortie Kuntivaara : 6 h, jusqu'à 100 km vers la frontière russe." },
      { day: "Ven. 19", text: "Bus retour vers Rovaniemi (9 h 15 → 12 h 40), soirée en ville." },
      { day: "Sam. 20", text: "Libre : sauna, pêche sur glace ou husky en option." },
      { day: "Dim. 21", text: "Retour à Paris." },
    ],
    pros: ["Le plus de journées de motoneige au meilleur prix", "Tout à la carte, monoplace sur chaque sortie", "Paysages de collines et de forêts de Ruka, différents de Rovaniemi"],
    cons: ["Aucune nuit dehors : retour à la base chaque soir", "Deux longs trajets en bus", "66°N : aurores moins fréquentes qu'au grand nord"],
    sources: ["rukaActive", "rukaOutdoor", "rukaBus", "laplandSafaris2027", "volsFevrier"],
  },
  {
    id: "plan4",
    number: 4,
    recommended: true,
    title: "Grand Nord : Père Noël puis Inari",
    tagline: "Le meilleur pour les aurores",
    place: "Rovaniemi puis Inari (69°N)",
    budget: "≈ 2 800 €",
    budgetNote: "par personne, vols compris, une motoneige chacun partout",
    intensity: 2,
    compare: {
      roaming: "2 jours / 1 nuit en chalet dans le grand nord",
      riding: "3 sorties : 6 h, 2 jours de raid, 3 h de nuit (+ 6 h en option)",
      aurora: "Lundi 15 à Inari, ciel noir sans pollution lumineuse",
    },
    idea:
      "Le Père Noël à Rovaniemi, puis bus vers Inari, 330 km plus au nord, au bord d'un immense lac gelé. Là-haut, les nuits sont plus noires et les aurores plus fréquentes. Le raid de Visit Inari dure deux jours avec une nuit en chalet, monoplace imposée.",
    blocks: [
      {
        title: "Inari (Visit Inari)",
        items: [
          "Overnight Snowmobile Safari, 2 jours / 1 nuit : 1 129 €/pers. pour un groupe de 3, pension complète, chalet, sauna, une personne par motoneige. Expérience demandée : la journée Père Noël de 6 h sert de prise en main.",
          "Aurora Snowmobile Expedition, 3 h : 219 € en solo, lun./mer./ven. à 20 h 30.",
          "Option : Arctic Archipelago, 6 h sur le lac Inari et ses îles, déjeuner inclus : 430 €.",
          "Franchise : 900 € max par motoneige.",
        ],
      },
      {
        title: "Rovaniemi ↔ Inari",
        items: [
          "Bus Eskelisen, ≈ 4 h 20, deux fois par jour, 55 – 70 € le trajet (Rome2rio).",
          "Autre possibilité : rentrer en avion depuis Ivalo (via Helsinki), plus cher.",
        ],
      },
      {
        title: "Budget par personne",
        items: [
          "Vols Paris → Rovaniemi : 300 – 450 €",
          "Father Christmas Safari en solo : 318 – 353 €",
          "Raid Visit Inari 2 jours : 1 129 €",
          "Aurores en motoneige à Inari : 219 €",
          "Bus aller-retour : ≈ 130 €",
          "6 nuits (Rovaniemi + Inari), partagé à 3 : ≈ 360 € (estimation)",
          "Repas : ≈ 250 € (estimation)",
          "Total : ≈ 2 800 €, ou ≈ 3 230 € avec l'Arctic Archipelago",
        ],
      },
    ],
    timeline: [
      { day: "Sam. 13", text: "Vol Paris → Rovaniemi." },
      { day: "Dim. 14", text: "Father Christmas Safari : motoneige, rennes, Santa Claus Village." },
      { day: "Lun. 15", text: "Bus Rovaniemi → Inari. Le soir, aurores en motoneige (20 h 30)." },
      { day: "Mar. 16 – Mer. 17", text: "Raid Visit Inari : nuit en chalet dans la nature, sauna." },
      { day: "Jeu. 18", text: "Option Arctic Archipelago (6 h sur le lac) ou musée sami Siida." },
      { day: "Ven. 19", text: "Libre au bord du lac, dernière chasse aux aurores." },
      { day: "Sam. 20", text: "Bus Inari → Rovaniemi, soirée en ville." },
      { day: "Dim. 21", text: "Retour à Paris." },
    ],
    pros: ["Les meilleures chances d'aurores (69°N, aucune pollution lumineuse)", "Paysages plus sauvages : lac Inari, culture sami", "Monoplace imposée par l'opérateur"],
    cons: ["Deux trajets de 4 h en bus", "Une seule nuit dehors, comme les plans 1 et 2", "Peu de restos à Inari"],
    sources: ["inariOvernight", "inariAurora", "inariArchipelago", "busInari", "laplandSafaris2027", "volsFevrier"],
  },
];

// Carte interactive. `plans` : formules concernées. `approx: true` = emplacement indicatif
// (l'agence communique le lieu exact à la réservation).
export const MAP_POINTS = [
  { id: "cdg", name: "Paris", lat: 49.0097, lng: 2.5479, kind: "airport", plans: ["plan1", "plan2", "plan3", "plan4"], text: "Départ samedi 13 février, retour dimanche 21. Vols directs vers Rovaniemi depuis Beauvais ou Roissy, ou via Helsinki." },
  { id: "rvn", name: "Aéroport de Rovaniemi", lat: 66.5648, lng: 25.8304, kind: "airport", plans: ["plan1", "plan2", "plan3", "plan4"], text: "Arrivée et départ des quatre formules, à 10 min du centre." },
  { id: "rovaniemi", name: "Rovaniemi centre", lat: 66.5039, lng: 25.7294, kind: "stay", plans: ["plan1", "plan2", "plan3", "plan4"], text: "Base des plans 1 et 2, étape des plans 3 et 4. Départ des safaris Lapland Safaris." },
  { id: "santa", name: "Santa Claus Village", lat: 66.5436, lng: 25.8473, kind: "visit", plans: ["plan1", "plan2", "plan3", "plan4"], text: "Fin du Father Christmas Safari (dimanche 14), dans les quatre formules." },
  { id: "rennes", name: "Ferme de rennes", lat: 66.62, lng: 25.98, kind: "visit", approx: true, plans: ["plan1", "plan2", "plan3", "plan4"], text: "Father Christmas Safari : balade en traîneau à rennes et déjeuner." },
  { id: "aurores", name: "Forêts au nord de Rovaniemi", lat: 66.66, lng: 25.62, kind: "raid", approx: true, plans: ["plan1", "plan2", "plan3"], text: "Sortie aurores en motoneige (3 h, en soirée)." },
  { id: "hwCabin", name: "Cabane isolée (Heart of Wilderness)", lat: 66.93, lng: 26.3, kind: "raid", approx: true, plans: ["plan1"], text: "Nuit du raid après 60–100 km, sauna et pension complète." },
  { id: "hwFell", name: "Fells du retour", lat: 66.82, lng: 25.6, kind: "raid", approx: true, plans: ["plan1"], text: "Jour 2 du raid : 80–120 km de retour vers Rovaniemi." },
  { id: "kuoksa", name: "Cabane du parc de Kuoksa", lat: 66.6, lng: 26.15, kind: "stay", approx: true, plans: ["plan2"], text: "Nuit en cabane traditionnelle avec sauna au bois, loin des lumières." },
  { id: "kuoksaLoop", name: "Forêts et lacs de Kuoksa", lat: 66.7, lng: 26.4, kind: "raid", approx: true, plans: ["plan2"], text: "Les deux journées de motoneige du raid StayLapland." },
  { id: "kuusamo", name: "Kuusamo", lat: 65.9667, lng: 29.1833, kind: "visit", plans: ["plan3"], text: "Arrivée du bus de Rovaniemi (19 h 35), puis 25 km jusqu'à Ruka." },
  { id: "ruka", name: "Ruka", lat: 66.1661, lng: 29.1404, kind: "stay", plans: ["plan3"], text: "Base du plan 3 : 4 nuits, départ des sorties motoneige." },
  { id: "rukaHusky", name: "Motoneige + husky", lat: 66.23, lng: 29.32, kind: "visit", approx: true, plans: ["plan3"], text: "Mercredi 17 : 20 km de motoneige et 2,5 km en traîneau à chiens." },
  { id: "kuntivaara", name: "Kuntivaara et la frontière", lat: 66.08, lng: 29.6, kind: "raid", approx: true, plans: ["plan3"], text: "Jeudi 18 : la grande sortie, 6 h et jusqu'à 100 km." },
  { id: "inari", name: "Inari", lat: 68.9066, lng: 27.028, kind: "stay", plans: ["plan4"], text: "Base du plan 4 au bord du lac Inari, départ des safaris Visit Inari." },
  { id: "inariCabin", name: "Chalet du raid Visit Inari", lat: 69.15, lng: 26.75, kind: "raid", approx: true, plans: ["plan4"], text: "Nuit du raid de 2 jours, dîner et sauna." },
  { id: "inariLake", name: "Lac Inari et ses îles", lat: 68.98, lng: 27.45, kind: "raid", approx: true, plans: ["plan4"], text: "Aurores en motoneige et, en option, l'Arctic Archipelago (6 h)." },
];

// Tracés : `flight` en pointillés, `ride` (motoneige) en trait plein, `transfer` en tirets courts.
export const MAP_ROUTES = [
  { plan: "plan1", kind: "flight", points: ["cdg", "rvn"] },
  { plan: "plan1", kind: "transfer", points: ["rvn", "rovaniemi"] },
  { plan: "plan1", kind: "ride", points: ["rovaniemi", "rennes", "santa"] },
  { plan: "plan1", kind: "ride", points: ["rovaniemi", "aurores", "rovaniemi"] },
  { plan: "plan1", kind: "ride", points: ["rovaniemi", "hwCabin", "hwFell", "rovaniemi"] },
  { plan: "plan2", kind: "flight", points: ["cdg", "rvn"] },
  { plan: "plan2", kind: "transfer", points: ["rvn", "rovaniemi"] },
  { plan: "plan2", kind: "ride", points: ["rovaniemi", "rennes", "santa"] },
  { plan: "plan2", kind: "ride", points: ["rovaniemi", "aurores", "rovaniemi"] },
  { plan: "plan2", kind: "ride", points: ["rovaniemi", "kuoksaLoop", "kuoksa", "rovaniemi"] },
  { plan: "plan3", kind: "flight", points: ["cdg", "rvn"] },
  { plan: "plan3", kind: "ride", points: ["rovaniemi", "rennes", "santa"] },
  { plan: "plan3", kind: "ride", points: ["rovaniemi", "aurores", "rovaniemi"] },
  { plan: "plan3", kind: "transfer", points: ["rovaniemi", "kuusamo", "ruka"] },
  { plan: "plan3", kind: "ride", points: ["ruka", "rukaHusky", "ruka"] },
  { plan: "plan3", kind: "ride", points: ["ruka", "kuntivaara", "ruka"] },
  { plan: "plan4", kind: "flight", points: ["cdg", "rvn"] },
  { plan: "plan4", kind: "ride", points: ["rovaniemi", "rennes", "santa"] },
  { plan: "plan4", kind: "transfer", points: ["rovaniemi", "inari"] },
  { plan: "plan4", kind: "ride", points: ["inari", "inariCabin", "inari"] },
  { plan: "plan4", kind: "ride", points: ["inari", "inariLake", "inari"] },
];

export const PRACTICAL = [
  {
    title: "Ce que ces dates changent",
    items: [
      "Pleine lune le samedi 20 février : elle reste levée presque toute la nuit pendant le séjour. Les aurores fortes se voient quand même, les faibles moins. Les nuits du 13 au 16 sont les plus sombres : chaque formule y place sa sortie aurores.",
      "Jour à Rovaniemi : 8 h 24 → 16 h 38 le 13, 7 h 55 → 17 h 07 le 21. Environ 9 h de nuit noire.",
      "Froid de cœur d'hiver : −15 à −30 °C possibles. Neige et lacs gelés au top.",
      "Vacances zone C (Paris, Montpellier) du 6 au 22 février et zone A du 13 février au 1er mars : réserver vols et logements tôt.",
    ],
    sources: ["vacances"],
  },
  {
    title: "Vols Paris → Rovaniemi",
    items: [
      "Vols directs (Ryanair depuis Beauvais, easyJet et Air France depuis Roissy) ou via Helsinki avec Finnair.",
      "Février : 388 € en moyenne l'aller-retour, de 235 à 764 €. Un direct Beauvais a été relevé à 267 € pour le 14 → 21 février.",
      "Comme vous l'aviez voté : on prend le moins cher, peu importe la compagnie.",
    ],
    sources: ["volsFevrier", "liligo"],
  },
  {
    title: "Une motoneige par personne",
    items: [
      "Heart of Wilderness, Visit Inari et les sorties de Ruka affichent un tarif « 1 personne par motoneige ».",
      "Lapland Safaris : supplément solo de 50 à 85 € par sortie, à cocher à la réservation.",
      "StayLapland (plan 2) : tarif de base à 2 par motoneige, le solo est à demander par écrit.",
    ],
    sources: ["heartOfWilderness", "inariOvernight", "laplandSafaris2027", "staylapland"],
  },
  {
    title: "Écartés pour ces dates",
    items: [
      "Visit Inari, safari vers l'océan Arctique : pas avant le 1er mars, et 4 330 €/pers. à 3.",
      "Arctic Expeditions, raids de 3 à 5 jours : 3 380 à 5 490 €/pers., minimum 4 participants.",
      "Camp Xplore, raid itinérant de 6 jours à Kuusamo (départ le 13) : 2 700 € hors vols et sans Père Noël.",
      "Norvège (Alta, Mehamn) et Laponie suédoise : trop loin de Rovaniemi pour garder le Père Noël, et plus chers.",
    ],
    sources: ["inariArcticOcean", "arcticExpeditions", "campXplore"],
  },
];

export const WARNINGS = [
  "Permis B physique pour chaque pilote, zéro alcool au guidon.",
  "Équipement grand froid fourni partout (combinaison, bottes, gants, casque) : prévoir seulement de bonnes sous-couches.",
  "Franchise en cas de casse : 900 à 980 € par motoneige. Lapland Safaris la ramène à 150 € pour 20 €, StayLapland à 250 € pour 25 €. Vérifier aussi la carte bancaire.",
  "Faire écrire noir sur blanc : 3 participants, 3 motoneiges, chaque jour de conduite.",
  "Les prix sont ceux affichés début novembre 2026 : à revalider à la réservation.",
];

// Nouvelles questions (suffixe -fev27) : les votes d'octobre restent en base mais ne s'affichent plus.
export const QUESTIONS = [
  {
    id: "formule-fev27",
    title: "Quelle formule pour le 13 – 21 février ?",
    help: "Plusieurs choix possibles : coche toutes les formules qui te vont.",
    multiple: true,
    options: [
      { id: "plan1", label: "Plan 1 – Rovaniemi + raid 2 jours en cabane", detail: "≈ 2 900 €" },
      { id: "plan2", label: "Plan 2 – Rovaniemi éco + nuit à Kuoksa", detail: "≈ 2 500 € + solo à chiffrer" },
      { id: "plan3", label: "Plan 3 – Ruka, 4 jours de motoneige", detail: "≈ 2 550 €" },
      { id: "plan4", label: "Plan 4 – Grand Nord : Père Noël puis Inari (recommandé)", detail: "≈ 2 800 €" },
    ],
  },
  {
    id: "budget-fev27",
    title: "Budget max par personne, vols compris ?",
    help: "Les formules vont de ≈ 2 500 à ≈ 2 900 €.",
    multiple: false,
    options: [
      { id: "lt2500", label: "Moins de 2 500 €" },
      { id: "2500-2800", label: "2 500 – 2 800 €" },
      { id: "2800-3100", label: "2 800 – 3 100 €" },
      { id: "gt3100", label: "Plus de 3 100 €" },
    ],
  },
  {
    id: "options-fev27",
    title: "Quelles options en plus ?",
    help: "Père Noël, aurores et sauna sont déjà dans chaque formule. Plusieurs choix possibles.",
    multiple: true,
    options: [
      { id: "husky", label: "Chiens de traîneau", detail: "≈ 180 – 220 €" },
      { id: "peche", label: "Pêche sur glace", detail: "≈ 85 – 290 €" },
      { id: "aurores2", label: "Une 2e sortie aurores", detail: "≈ 210 – 230 €" },
      { id: "jourplus", label: "Une journée de motoneige en plus", detail: "≈ 290 – 800 €" },
      { id: "archipel", label: "Arctic Archipelago à Inari (plan 4)", detail: "430 €" },
      { id: "aucune", label: "Rien de plus, on garde le budget" },
    ],
  },
  {
    id: "hebergement-fev27",
    title: "Où dormir hors raid ?",
    help: "En octobre : le moins cher. Nicolas : en ville si ça vaut le coup, sinon chalet, et penser aux restos.",
    multiple: false,
    options: [
      { id: "ville", label: "Appart en ville, à pied des restos" },
      { id: "chalet", label: "Chalet avec sauna en dehors de la ville" },
      { id: "moinscher", label: "Peu importe, le moins cher" },
    ],
  },
  {
    id: "vols-fev27",
    title: "Côté vols ?",
    help: "Paris → Rovaniemi, aller-retour.",
    multiple: false,
    options: [
      { id: "beauvais", label: "Direct depuis Beauvais", detail: "le moins cher relevé" },
      { id: "roissy", label: "Direct depuis Roissy" },
      { id: "moinscher", label: "Le moins cher, peu importe" },
    ],
  },
];
