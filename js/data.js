// Contenu du site. Tout le texte est ici : modifie-le librement sans toucher à app.js.
// Les `id` (votants, questions, options) servent de clés dans Firebase : ne les change pas
// une fois que des votes existent (les noms affichés, eux, peuvent changer à tout moment).

export const TRIP = {
  title: "Raid motoneige en Laponie",
  dates: "10 – 18 avril 2027",
  from: "Paris",
  summary:
    "Trois frères, trois permis B, une motoneige chacun. Fin de saison hivernale : la neige est encore là autour de Rovaniemi et Ruka (la plupart des opérateurs tournent jusqu'à mi/fin avril), les hôtels sont au plus bas de l'année. Voici les trois formules étudiées : lisez, puis votez en bas de page.",
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
      { id: "gt2500", label: "Plus de 2 500 €" },
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
