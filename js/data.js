// Contenu du site. Tout le texte est ici : modifie-le librement sans toucher à app.js.
// Les `id` (votants, questions, options) servent de clés dans Firebase : ne les change pas
// une fois que des votes existent (les noms affichés, eux, peuvent changer à tout moment).

export const TRIP = {
  title: "Raid motoneige en Laponie",
  dates: "10 – 18 avril 2027",
  from: "Paris",
  summary:
    "Trois frères, trois permis B, une motoneige chacun. Fin de saison hivernale : la neige est encore là autour de Rovaniemi et Ruka (la plupart des opérateurs tournent jusqu'à mi/fin avril), les hôtels sont au plus bas de l'année. Voici les quatre formules étudiées : lisez, puis votez en bas de page.",
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

export const SOURCES = {
  manawa: { label: "Manawa – motoneige Rovaniemi", url: "https://www.manawa.com/fr/destinations/3157-rovaniemi/1504-motoneige" },
  manawaJournee: { label: "Manawa – safari journée 6 h", url: "https://www.manawa.com/fr-FR/activite/finlande/rovaniemi/motoneige/safari-en-motoneige-a-rovaniemi/8312" },
  laplandWelcome: { label: "Lapland Welcome – safaris", url: "https://www.laplandwelcome.fi/activity/snowmobile-safaris/" },
  rovaniemiTours: { label: "Rovaniemi Tours – motoneige", url: "https://www.rovaniemitours.com/fr/snowmobile-tours/" },
  heartOfWilderness: { label: "Arctic Expeditions – Heart of Wilderness", url: "https://www.arcticexpeditions.fi/heart-of-wilderness/" },
  arcticExpeditions: { label: "Arctic Expeditions – expéditions", url: "https://www.arcticexpeditions.fi/" },
  adventuro: { label: "Adventuro – programme Heart of Wilderness", url: "https://adventuro.com/courses/heart-of-wilderness-snowmobile-adventure-in-rovaniemi" },
  tourDeLapland: { label: "Wild Nordic – Tour de Lapland", url: "https://wildnordic.fi/arctic-expeditions/tour-de-lapland/" },
  planetRide: { label: "Planet Ride – Ruka 5 jours", url: "https://www.planet-ride.com/en_US/p/lapland-finland-snowmobile-guided-ruka" },
  europeActive: { label: "Europe Active – escapade Ruka", url: "https://europe-active.com/sejours/sejour-finlande-motoneige-court-laponie/" },
  kuusamoSafaris: { label: "Kuusamo Safaris – motoneige + husky", url: "https://kuusamosafaris.fi/en/snowmobile-and-huskysafari/" },
  rukaWeekly: { label: "Ruka – programme hebdo hiver", url: "https://www.ruka.fi/en/events/winter-weekly-programme" },
  airFrance: { label: "Air France – Paris → Rovaniemi", url: "https://wwws.airfrance.fr/fr-fr/vols-de-paris-a-rovaniemi" },
  lufthansa: { label: "Lufthansa – Paris → Rovaniemi", url: "https://www.lufthansa.com/lhg/fi/en/o-d/cy-cy/paris-rovaniemi" },
  swiss: { label: "Swiss – Paris → Rovaniemi", url: "https://www.swiss.com/lhg/fr/fr/o-d/cy-cy/paris-rovaniemi" },
  trivago: { label: "Trivago – hôtels Rovaniemi", url: "https://www.trivago.ie/en-IE/odr/hotels-rovaniemi-finland?search=200-62332" },
  skyscanner: { label: "Skyscanner – hôtels Rovaniemi", url: "https://www.skyscanner.ie/hotels/finland/rovaniemi-hotels/ci-27546230" },
  ounasvaara: { label: "Lapland Hotels Ounasvaara Chalets", url: "https://www.kayak.es/Rovaniemi-Hoteles-Lapland-Hotel-Ounasvaara-Chalets.258981.ksp" },
  beyondArctic: { label: "Beyond Arctic – tarif solo Levi", url: "https://beyondarctic.com/tour/2-h-snowmobile-experience-in-levi/" },
  laplandSafaris: { label: "Lapland Safaris – supplément solo", url: "https://www.laplandsafaris.com/en/destinations/rovaniemi/activities/ROWF082" },
};

export const PLANS = [
  {
    id: "plan1",
    number: 1,
    title: "Base à Rovaniemi + gros safaris journée",
    tagline: "Le plus modulable",
    place: "Rovaniemi",
    budget: "1 300 – 1 700 €",
    budgetNote: "par personne, en duo sur motoneige ; compter +30 à 50 % sur les activités en solo",
    intensity: 1,
    compare: { roaming: "Non, retour en ville chaque soir", riding: "3–4 journées, 95–299 €/jour" },
    idea:
      "On s'installe 6–7 nuits à Rovaniemi et on enchaîne 3 à 4 grosses journées motoneige (dont au moins une journée complète « into the wilderness ») + une ou deux journées husky, rennes, village du Père Noël. Confortable, mais pas d'itinérance : retour en ville chaque soir.",
    blocks: [
      {
        title: "Motoneige",
        items: [
          "Journée complète motoneige + pêche sur glace (5–6 h), repas inclus : dès ~256 €/adulte.",
          "Journée complète 6 h (2–3 h de conduite effective) + barbecue au feu de camp : ~299 €/adulte.",
          "Demi-journées 2–3 h (motoneige seule ou combinée renne/husky) : 95–215 €.",
          "Inclus en général : transfert depuis Rovaniemi, équipement grand froid, guide, essence, brief sécurité.",
          "Une motoneige par personne : supplément « solo » d'environ 50–60 € par sortie.",
        ],
      },
      {
        title: "Budget par personne",
        items: [
          "Vols : 250 – 400 €",
          "Hébergement 6–7 nuits (~130 €/nuit partagé à 3) : 260 – 300 €",
          "3 grosses sorties motoneige : 700 – 1 000 €",
        ],
      },
    ],
    pros: ["Le moins cher", "Max d'activités variées", "Facile à réserver à la carte"],
    cons: ["Pas de vraie itinérance", "Sorties en groupe, 2–3 h de conduite par jour"],
    sources: ["laplandWelcome", "manawaJournee", "rovaniemiTours", "manawa", "laplandSafaris"],
  },
  {
    id: "plan2",
    number: 2,
    title: "Raid 2 jours en itinérance + Rovaniemi",
    tagline: "Le bon compromis",
    place: "Rovaniemi + lodge en pleine nature",
    budget: "1 800 – 2 300 €",
    budgetNote: "par personne, une motoneige chacun sur le raid",
    intensity: 2,
    compare: { roaming: "2 jours / 1 nuit en lodge", riding: "60–100 km + 80–120 km" },
    idea:
      "Rovaniemi comme base, avec au milieu un vrai mini-raid de 2 jours / 1 nuit : nuit dans un lodge isolé avec sauna, pension complète, puis jours libres ou safaris plus courts.",
    blocks: [
      {
        title: "Le raid « Heart of Wilderness »",
        items: [
          "Jour 1 : 60–100 km. Visite d'une ferme de rennes (élevage, rencontre des animaux), repas au feu de camp, arrivée au lodge isolé, sauna traditionnel.",
          "Jour 2 : 80–120 km. Free-ride dans la poudreuse, montée sur un petit fell, retour vers Rovaniemi.",
          "Inclus : transferts, essence, équipement grand froid, guide pro, assurance, repas.",
          "Prix : dès ~1 395 €/pers. à 2, ~1 195 €/pers. à partir de 6 (tarif saison janv.–mars : à confirmer pour avril).",
        ],
      },
      {
        title: "Budget par personne",
        items: [
          "Vols : 250 – 400 €",
          "4–5 nuits à Rovaniemi (partagé à 3) : 180 – 220 €",
          "Raid 2 jours : 1 200 – 1 400 €",
          "1–2 sorties en plus (husky, renne, motoneige) : 200 – 400 €",
        ],
      },
    ],
    timeline: [
      { day: "Sam. 10 avril", text: "Vol Paris → Rovaniemi, installation hôtel/chalet." },
      { day: "11 – 12 avril", text: "Raid 2 jours « Heart of Wilderness »." },
      { day: "13 – 16 avril", text: "Journées libres : husky, rennes, autre safari motoneige." },
      { day: "17 avril", text: "Journée cool : Arktikum, shopping, repos." },
      { day: "Dim. 18 avril", text: "Retour à Paris." },
    ],
    pros: ["Vraie sensation d'expédition", "Ferme de rennes + lodge + sauna inclus", "Reste des jours pour le touristique"],
    cons: ["Itinérance limitée à 2 jours", "Tarif avril à confirmer"],
    sources: ["heartOfWilderness", "adventuro", "arcticExpeditions", "tourDeLapland"],
  },
  {
    id: "plan3",
    number: 3,
    title: "Vrai raid 5 jours autour de Ruka / Kuusamo",
    tagline: "Le plus engagé",
    place: "Ruka – Kuusamo",
    budget: "2 400 – 2 700 €",
    budgetNote: "par personne, une motoneige chacun incluse",
    intensity: 3,
    compare: { roaming: "5 jours de boucles depuis Ruka", riding: "30–80 km/jour, une machine chacun" },
    idea:
      "Raid de 5 jours / 4 nuits très orienté motoneige, une machine par personne, sorties guidées tous les jours, hôtel à Ruka. Le plus « Far North », le plus cher et le plus physique.",
    blocks: [
      {
        title: "Séjours repérés",
        items: [
          "Planet Ride « Explore Ruka by snowmobile » : 5 jours, boucles de 30 km, 25 km de nuit, 80 km le dernier jour ; jour libre (raquettes, chiens de traîneau en option). Dès 1 900 €/pers., essence et dîners inclus.",
          "Europe Active « Escapade motoneige autour de Ruka » : 5 j / 4 nuits, guide local, dès ~2 090 €/pers. ; transferts aéroport, hébergement, petits-déjeuners, 3 pique-niques.",
          "Autour : safaris motoneige + husky ou motoneige + ferme de rennes, husky rides 5 km (programme hebdo de Ruka).",
        ],
      },
      {
        title: "Budget par personne",
        items: [
          "Vols Paris → Helsinki → Kuusamo : 300 – 500 € (estimation)",
          "Séjour 5 jours tout compris hors vols : 1 900 – 2 090 €",
          "Nuit en plus avant/après (Helsinki ou Kuusamo) : 80 – 150 €",
        ],
      },
    ],
    pros: ["Le plus de kilomètres", "Une motoneige chacun d'office", "Transferts aéroport inclus"],
    cons: ["Le plus cher", "Vols vers Kuusamo moins fréquents", "Moins de temps pour le touristique"],
    sources: ["planetRide", "europeActive", "kuusamoSafaris", "rukaWeekly"],
  },
  {
    id: "plan4",
    number: 4,
    title: "Grand raid 4 jours depuis Rovaniemi",
    tagline: "Le plan 2 en version longue",
    place: "Rovaniemi + 3 nuits en pleine nature",
    budget: "4 900 – 5 200 €",
    budgetNote: "par personne, une motoneige chacun, départ public (2–12 pers.)",
    intensity: 3,
    compare: { roaming: "4 jours / 3 nuits en lodges et cabanes", riding: "400–500 km au total (~100–125 km/jour)" },
    idea:
      "Vendu sous la même bannière Arctic Expeditions que le raid du plan 2, au départ de Rovaniemi aussi, mais sur 4 jours : on garde la ferme de rennes, le lodge isolé et le fell, et on s'enfonce deux jours de plus dans le wilderness avant de revenir à Rovaniemi. Le vrai raid en itinérance, avec du temps avant/après pour le touristique.",
    blocks: [
      {
        title: "L'expédition « Tour de Lapland »",
        items: [
          "4 jours de motoneige, ~400–500 km au total, niveau « exigeant » : bonne condition physique demandée.",
          "Départ de Rovaniemi (ou Levi), saison janvier → avril : à confirmer pour la semaine du 12 avril.",
          "Nuits en lodges / cabanes de wilderness, groupe de 7 max + guide, une motoneige par personne.",
          "Tenue grand froid et bottes fournies. Franchise en cas de casse : 900 € par motoneige.",
          "Prix : dès 4 400 €/pers. en départ public (2–12 pers.) ; en privé 5 200 €/pers. à 2–4.",
          "Itinéraire exact non publié : demander à l'agence de passer par la ferme de rennes et le lodge du raid 2 jours.",
        ],
      },
      {
        title: "Budget par personne",
        items: [
          "Vols : 250 – 400 €",
          "5 nuits à Rovaniemi hors raid (partagé à 3) : 220 – 270 €",
          "Expédition 4 jours : 4 400 € (public) à 5 200 € (privé)",
          "1 sortie husky ou rennes en plus : 100 – 200 €",
        ],
      },
    ],
    timeline: [
      { day: "Sam. 10 avril", text: "Vol Paris → Rovaniemi, installation." },
      { day: "11 avril", text: "Journée tranquille : Santa Claus Village, briefing de l'expédition." },
      { day: "12 – 15 avril", text: "Raid 4 jours : ferme de rennes, lodge isolé, deux jours en profondeur dans le wilderness, fell et retour." },
      { day: "16 avril", text: "Récup : sauna, husky ou rennes." },
      { day: "17 avril", text: "Arktikum, shopping, dernier dîner." },
      { day: "Dim. 18 avril", text: "Retour à Paris." },
    ],
    pros: ["Vraie itinérance de 4 jours", "Mêmes points de passage que le plan 2, en plus long", "Tout reste au départ de Rovaniemi"],
    cons: ["Le plus cher, de loin", "Physique (400–500 km)", "Itinéraire et dispo d'avril à confirmer"],
    sources: ["tourDeLapland", "arcticExpeditions", "heartOfWilderness"],
  },
];

// Carte interactive. `plans` : formules concernées. `approx: true` = emplacement indicatif
// (l'agence communique le lieu exact à la réservation).
export const MAP_POINTS = [
  { id: "cdg", name: "Paris – Charles-de-Gaulle", lat: 49.0097, lng: 2.5479, kind: "airport", plans: ["plan1", "plan2", "plan3", "plan4"], text: "Départ le samedi 10 avril, retour le dimanche 18." },
  { id: "hel", name: "Helsinki – Vantaa", lat: 60.3172, lng: 24.9633, kind: "airport", plans: ["plan1", "plan2", "plan3", "plan4"], text: "Escale habituelle vers Rovaniemi ou Kuusamo." },
  { id: "rvn", name: "Aéroport de Rovaniemi", lat: 66.5648, lng: 25.8304, kind: "airport", plans: ["plan1", "plan2", "plan4"], text: "Arrivée pour les plans 1 et 2, à 10 min du centre." },
  { id: "rovaniemi", name: "Rovaniemi centre", lat: 66.5039, lng: 25.7294, kind: "stay", plans: ["plan1", "plan2", "plan4"], text: "Base du séjour : hôtels 120–270 €/nuit en avril, départ des safaris motoneige." },
  { id: "ounasvaara", name: "Chalets Ounasvaara", lat: 66.4986, lng: 25.7861, kind: "stay", plans: ["plan1", "plan2", "plan4"], text: "Chalets avec sauna et cuisine, ~100–170 €/nuit en basse saison." },
  { id: "santa", name: "Santa Claus Village", lat: 66.5436, lng: 25.8473, kind: "visit", plans: ["plan1", "plan2", "plan4"], text: "Village du Père Noël, sur le cercle polaire arctique." },
  { id: "arktikum", name: "Arktikum", lat: 66.5089, lng: 25.7266, kind: "visit", plans: ["plan1", "plan2", "plan4"], text: "Musée sur l'Arctique et la Laponie : idéal pour la journée cool du 17 avril." },
  { id: "safaris", name: "Forêts au nord de Rovaniemi", lat: 66.68, lng: 25.75, kind: "raid", approx: true, plans: ["plan1"], text: "Zone typique des safaris journée (5–6 h, 2–3 h de conduite) au départ de Rovaniemi." },
  { id: "rennes", name: "Ferme de rennes", lat: 66.72, lng: 26.05, kind: "visit", approx: true, plans: ["plan2", "plan4"], text: "Jour 1 du raid Heart of Wilderness : visite de la ferme et repas au feu de camp." },
  { id: "lodge", name: "Lodge isolé (nuit du raid)", lat: 66.93, lng: 26.3, kind: "raid", approx: true, plans: ["plan2", "plan4"], text: "Nuit en pleine nature avec sauna traditionnel, après 60–100 km de motoneige." },
  { id: "fell", name: "Fell (petite montagne)", lat: 66.82, lng: 25.6, kind: "raid", approx: true, plans: ["plan2", "plan4"], text: "Jour 2 : free-ride dans la poudreuse et montée sur un fell, 80–120 km au total." },
  { id: "cabane2", name: "Cabane de wilderness (nuit 2)", lat: 67.28, lng: 26.75, kind: "raid", approx: true, plans: ["plan4"], text: "Plan 4, jour 2 : on continue vers le nord, forêts et marais gelés, nuit en cabane." },
  { id: "cabane3", name: "Cabane de wilderness (nuit 3)", lat: 67.2, lng: 25.55, kind: "raid", approx: true, plans: ["plan4"], text: "Plan 4, jour 3 : traversée vers l'ouest par les lacs et les fells, dernière nuit en pleine nature." },
  { id: "kao", name: "Aéroport de Kuusamo", lat: 65.9876, lng: 29.2394, kind: "airport", plans: ["plan3"], text: "Arrivée du plan 3, transfert vers Ruka inclus dans les séjours." },
  { id: "ruka", name: "Ruka", lat: 66.1661, lng: 29.1404, kind: "stay", plans: ["plan3"], text: "Station nordique, hôtel du raid 5 jours. Départ des boucles motoneige (30 km, 25 km de nuit, 80 km le dernier jour)." },
  { id: "rukaHusky", name: "Fermes husky et rennes de Ruka", lat: 66.23, lng: 29.32, kind: "visit", approx: true, plans: ["plan3"], text: "Safaris motoneige + husky ou ferme de rennes, husky rides 5 km." },
  { id: "rukaLoop", name: "Boucle 80 km (dernier jour)", lat: 66.38, lng: 29.0, kind: "raid", approx: true, plans: ["plan3"], text: "Grande boucle du dernier jour dans les forêts et lacs gelés autour de Ruka." },
];

// Tracés : `flight` en pointillés, `ride` (motoneige) en trait plein, `transfer` en tirets courts.
export const MAP_ROUTES = [
  { plan: "plan1", kind: "flight", points: ["cdg", "hel", "rvn"] },
  { plan: "plan1", kind: "transfer", points: ["rvn", "rovaniemi"] },
  { plan: "plan1", kind: "ride", points: ["rovaniemi", "safaris", "rovaniemi"] },
  { plan: "plan2", kind: "flight", points: ["cdg", "hel", "rvn"] },
  { plan: "plan2", kind: "transfer", points: ["rvn", "rovaniemi"] },
  { plan: "plan2", kind: "ride", points: ["rovaniemi", "rennes", "lodge"] },
  { plan: "plan2", kind: "ride", points: ["lodge", "fell", "rovaniemi"] },
  { plan: "plan4", kind: "flight", points: ["cdg", "hel", "rvn"] },
  { plan: "plan4", kind: "transfer", points: ["rvn", "rovaniemi"] },
  { plan: "plan4", kind: "ride", points: ["rovaniemi", "rennes", "lodge", "cabane2", "cabane3", "fell", "rovaniemi"] },
  { plan: "plan3", kind: "flight", points: ["cdg", "hel", "kao"] },
  { plan: "plan3", kind: "transfer", points: ["kao", "ruka"] },
  { plan: "plan3", kind: "ride", points: ["ruka", "rukaHusky", "rukaLoop", "ruka"] },
];

export const PRACTICAL = [
  {
    title: "Vols Paris → Rovaniemi",
    items: [
      "Air France : AR repérés entre 250 et 451 € en éco (hiver 2027).",
      "Swiss dès ~169 €, Lufthansa dès ~251 € AR (hors bagages).",
      "Prévoir 250–450 € AR, souvent via Helsinki. Réserver tôt, partir en milieu de semaine.",
    ],
    sources: ["airFrance", "swiss", "lufthansa"],
  },
  {
    title: "Hébergement",
    items: [
      "Avril = un des mois les moins chers à Rovaniemi : 120–270 €/nuit (3–4★), moyenne ~127 € en avril 2027.",
      "Chalets Ounasvaara (sauna + cuisine) : ~100–170 €/nuit en basse saison.",
      "Pendant les raids organisés, l'hébergement est inclus (chambre à partager).",
    ],
    sources: ["trivago", "skyscanner", "ounasvaara"],
  },
  {
    title: "Une motoneige par personne",
    items: [
      "Safaris classiques : tarif de base pour 2 par machine, supplément solo ~50–60 € par sortie.",
      "Exemple Levi : 168 € en solo contre 119 € en duo pour 2 h 30 (≈ +40 %).",
      "Les raids (plans 2 et 3) sont déjà pensés pour une machine par adulte.",
    ],
    sources: ["laplandSafaris", "beyondArctic"],
  },
];

export const WARNINGS = [
  "Permis B obligatoire pour conduire (OK pour vous trois).",
  "Équipement grand froid fourni (combinaison, bottes, gants, casque, cagoule) : rien à acheter de spécial.",
  "Franchise en cas de casse : 900 – 1 500 € par motoneige (ex. Tour de Lapland 900 €, Europe Active caution 1 000 €). Vérifier ce que couvre la carte bancaire.",
  "Neige plus variable en avril : les agences peuvent adapter ou annuler. Confirmer les dates exactes du 10–18 avril à la réservation.",
];

export const QUESTIONS = [
  {
    id: "formule",
    title: "Quelle formule de raid ?",
    help: "La grosse décision. Un seul choix.",
    multiple: false,
    options: [
      { id: "plan1", label: "Plan 1 – Base Rovaniemi + safaris", detail: "~1 300 – 1 700 €" },
      { id: "plan2", label: "Plan 2 – Raid 2 jours + Rovaniemi", detail: "~1 800 – 2 300 €" },
      { id: "plan3", label: "Plan 3 – Raid 5 jours Ruka", detail: "~2 400 – 2 700 €" },
      { id: "plan4", label: "Plan 4 – Grand raid 4 jours Rovaniemi", detail: "~4 900 – 5 200 €" },
    ],
  },
  {
    id: "budget",
    title: "Budget max par personne (tout compris) ?",
    help: "Vols + hébergement + activités.",
    multiple: false,
    options: [
      { id: "lt1500", label: "Moins de 1 500 €" },
      { id: "1500-2000", label: "1 500 – 2 000 €" },
      { id: "2000-2500", label: "2 000 – 2 500 €" },
      { id: "gt2500", label: "2 500 – 4 000 €" },
      { id: "gt4000", label: "Plus de 4 000 €" },
    ],
  },
  {
    id: "activites",
    title: "Quelles activités en plus du raid ?",
    help: "Plusieurs choix possibles : coche tout ce qui te tente.",
    multiple: true,
    options: [
      { id: "husky", label: "Chiens de traîneau (husky)" },
      { id: "rennes", label: "Ferme de rennes" },
      { id: "santa", label: "Santa Claus Village" },
      { id: "aurores", label: "Chasse aux aurores boréales" },
      { id: "peche", label: "Pêche sur glace" },
      { id: "arktikum", label: "Musée Arktikum" },
      { id: "sauna", label: "Sauna + bain glacé" },
      { id: "raquettes", label: "Raquettes" },
    ],
  },
  {
    id: "hebergement",
    title: "Hébergement hors raid ?",
    help: "Pour les nuits avant/après le raid.",
    multiple: false,
    options: [
      { id: "hotel", label: "Hôtel au centre de Rovaniemi", detail: "~120 – 270 €/nuit" },
      { id: "chalet", label: "Chalet avec sauna (Ounasvaara)", detail: "~100 – 170 €/nuit" },
      { id: "indifferent", label: "Peu importe, le moins cher" },
    ],
  },
  {
    id: "vols",
    title: "Côté vols ?",
    help: "Paris → Rovaniemi (ou Kuusamo pour le plan 3).",
    multiple: false,
    options: [
      { id: "airfrance", label: "Air France", detail: "~250 – 450 € AR" },
      { id: "lhswiss", label: "Lufthansa / Swiss avec escale", detail: "dès ~170 – 250 € AR" },
      { id: "moinscher", label: "Le moins cher, peu importe la compagnie" },
    ],
  },
  {
    id: "rythme",
    title: "Durée du voyage ?",
    multiple: false,
    options: [
      { id: "complet", label: "Les 9 jours, 10 → 18 avril" },
      { id: "court", label: "Raccourcir (5 – 6 jours)" },
    ],
  },
];
