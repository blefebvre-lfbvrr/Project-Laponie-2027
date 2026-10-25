import { TRIP, VOTERS, PARENTS, SOURCES, PLANS, MAP_POINTS, MAP_ROUTES, PRACTICAL, WARNINGS, QUESTIONS } from "./data.js?v=20261025-1";
import { firebaseConfig } from "./firebase-config.js?v=20261025-1";

const FIREBASE_VERSION = "10.12.2";
const LEAFLET_URL = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4";
const VOTER_KEY = "laponie2027-voter";
const DEMO_KEY = "laponie2027-votes-demo";

// ---------- Petits utilitaires DOM ----------

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value == null || value === false) continue;
    if (key === "class") node.className = value;
    else if (key.startsWith("on")) node.addEventListener(key.slice(2), value);
    else node.setAttribute(key, value === true ? "" : value);
  }
  for (const child of children.flat()) {
    if (child == null || child === false) continue;
    node.append(child instanceof Node ? child : String(child));
  }
  return node;
}

function storageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function storageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Navigation privée ou stockage bloqué : on continue sans mémoriser.
  }
}

const EVERYONE = [...VOTERS, ...PARENTS];
const isParent = (id) => PARENTS.some((p) => p.id === id);
// Sur grand écran les détails sont ouverts d'office ; sur téléphone on les replie.
const WIDE = window.matchMedia("(min-width: 721px)").matches;

const voterName = (id) => EVERYONE.find((v) => v.id === id)?.name ?? id;
const voteKey = (questionId, voterId) => `${questionId}__${voterId}`;

let toastTimer;
function toast(message, kind = "info") {
  const node = document.getElementById("toast");
  node.textContent = message;
  node.dataset.kind = kind;
  node.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (node.hidden = true), 3500);
}

// ---------- Stockage des votes ----------

async function createFirebaseStore() {
  const base = `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}`;
  const [{ initializeApp }, fs, auth] = await Promise.all([
    import(`${base}/firebase-app.js`),
    import(`${base}/firebase-firestore.js`),
    import(`${base}/firebase-auth.js`),
  ]);
  const app = initializeApp(firebaseConfig);
  await auth.signInAnonymously(auth.getAuth(app));
  const votes = fs.collection(fs.getFirestore(app), "votes");
  return {
    mode: "firebase",
    subscribe(onVotes, onError) {
      return fs.onSnapshot(votes, (snap) => onVotes(snap.docs.map((d) => d.data())), onError);
    },
    save(vote) {
      return fs.setDoc(fs.doc(votes, voteKey(vote.question, vote.voter)), {
        ...vote,
        updatedAt: fs.serverTimestamp(),
      });
    },
  };
}

function createDemoStore() {
  const read = () => {
    try {
      return JSON.parse(storageGet(DEMO_KEY)) || {};
    } catch {
      return {};
    }
  };
  let all = read();
  const listeners = new Set();
  const emit = () => listeners.forEach((fn) => fn(Object.values(all)));
  window.addEventListener("storage", (e) => {
    if (e.key === DEMO_KEY) {
      all = read();
      emit();
    }
  });
  return {
    mode: "demo",
    subscribe(onVotes) {
      listeners.add(onVotes);
      onVotes(Object.values(all));
      return () => listeners.delete(onVotes);
    },
    async save(vote) {
      all = { ...all, [voteKey(vote.question, vote.voter)]: { ...vote, updatedAt: Date.now() } };
      storageSet(DEMO_KEY, JSON.stringify(all));
      emit();
    },
  };
}

// ---------- Contenu statique ----------

function sourceLinks(ids) {
  return el(
    "p",
    { class: "sources-inline" },
    "Sources : ",
    ids.flatMap((id, i) => [
      i ? " · " : "",
      el("a", { href: SOURCES[id].url, target: "_blank", rel: "noopener" }, SOURCES[id].label),
    ]),
  );
}

function renderHero() {
  document.getElementById("trip-title").textContent = TRIP.title;
  document.getElementById("trip-dates").textContent = `${TRIP.dates} · départ ${TRIP.from}`;
  document.getElementById("trip-summary").textContent = TRIP.summary;
  document.getElementById("trip-voters").textContent = VOTERS.map((v) => v.name).join(" · ");
  document.getElementById("trip-parents").textContent = PARENTS.map((p) => p.name).join(" et ");
}

function renderPlans() {
  const root = document.getElementById("plans-list");
  for (const plan of PLANS) {
    root.append(
      el(
        "article",
        { class: "plan", id: plan.id },
        el(
          "header",
          { class: "plan-head" },
          el("span", { class: "plan-number" }, `Plan ${plan.number}`),
          el("span", { class: "plan-tag" }, plan.tagline),
          el("h3", {}, plan.title),
          el("p", { class: "plan-place" }, plan.place),
          el(
            "div",
            { class: "plan-meta" },
            el("p", { class: "plan-budget" }, el("strong", {}, plan.budget), el("span", {}, plan.budgetNote)),
            el(
              "p",
              { class: "plan-intensity", "aria-label": `Intensité ${plan.intensity} sur 3` },
              "Intensité ",
              [1, 2, 3].map((n) => el("span", { class: n <= plan.intensity ? "dot on" : "dot" })),
            ),
          ),
        ),
        el("p", { class: "plan-idea" }, plan.idea),
        el(
          "div",
          { class: "proscons" },
          el("ul", { class: "pros", "aria-label": "Points forts" }, plan.pros.map((t) => el("li", {}, t))),
          el("ul", { class: "cons", "aria-label": "Points faibles" }, plan.cons.map((t) => el("li", {}, t))),
        ),
        el(
          "details",
          { class: "plan-more", open: WIDE },
          el("summary", {}, "Détail, budget et sources"),
          plan.blocks.map((block) =>
            el("section", { class: "plan-block" }, el("h4", {}, block.title), el("ul", {}, block.items.map((t) => el("li", {}, t)))),
          ),
          plan.timeline &&
            el(
              "section",
              { class: "plan-block" },
              el("h4", {}, "Déroulé type"),
              el(
                "ol",
                { class: "timeline" },
                plan.timeline.map((step) => el("li", {}, el("strong", {}, step.day), " ", step.text)),
              ),
            ),
          sourceLinks(plan.sources),
        ),
        el("a", { class: "button ghost", href: "#q-formule" }, "Voter pour la formule →"),
      ),
    );
  }

  // Carrousel sur téléphone : points indiquant la formule affichée.
  const dots = document.getElementById("plans-dots");
  const dotButtons = PLANS.map((plan, i) =>
    el("button", {
      type: "button",
      class: "carousel-dot",
      "aria-label": `Plan ${plan.number}`,
      onclick: () => root.scrollTo({ left: root.children[i].offsetLeft - root.offsetLeft, behavior: "smooth" }),
    }),
  );
  dots.replaceChildren(...dotButtons);
  const syncDots = () => {
    const i = Math.round(root.scrollLeft / (root.children[0].offsetWidth || 1));
    dotButtons.forEach((d, j) => d.setAttribute("aria-current", String(i === j)));
  };
  root.addEventListener("scroll", syncDots, { passive: true });
  syncDots();
}

function renderComparison() {
  const rows = [
    ["Lieu", (p) => p.place],
    ["Itinérance", (p) => p.compare.roaming],
    ["Motoneige", (p) => p.compare.riding],
    ["Budget / pers.", (p) => p.budget],
  ];
  const table = el(
    "table",
    {},
    el("thead", {}, el("tr", {}, el("th", { scope: "col" }, ""), PLANS.map((p) => el("th", { scope: "col" }, `Plan ${p.number}`)))),
    el(
      "tbody",
      {},
      rows.map(([label, get]) =>
        el("tr", {}, el("th", { scope: "row" }, label), PLANS.map((p) => el("td", { "data-label": `Plan ${p.number}` }, get(p)))),
      ),
    ),
  );
  document.getElementById("compare-table").append(table);
}

// ---------- Carte ----------

function loadLeaflet() {
  if (window.L) return Promise.resolve(window.L);
  return new Promise((resolve, reject) => {
    document.head.append(el("link", { rel: "stylesheet", href: `${LEAFLET_URL}/leaflet.css` }));
    document.head.append(el("script", { src: `${LEAFLET_URL}/leaflet.js`, onload: () => resolve(window.L), onerror: reject }));
  });
}

const POINTS_BY_ID = Object.fromEntries(MAP_POINTS.map((p) => [p.id, p]));
const planLabel = (id) => `Plan ${PLANS.find((p) => p.id === id).number}`;

const map = {
  filter: "all",
  leaflet: null,
  markers: new Map(), // point id → marqueur Leaflet
  layer: null,
};

const visiblePoints = () => MAP_POINTS.filter((p) => map.filter === "all" || p.plans.includes(map.filter));

function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function pointPopup(p) {
  return el(
    "div",
    { class: "map-popup" },
    el("strong", {}, p.name),
    p.approx && el("span", { class: "approx" }, " approx."),
    el("p", {}, p.text),
    el("p", { class: "map-popup-plans" }, p.plans.map(planLabel).join(" · ")),
  );
}

function focusPoint(id) {
  const marker = map.markers.get(id);
  if (!marker || !map.leaflet) return;
  document.getElementById("map").scrollIntoView({ block: "center" });
  map.leaflet.flyTo(marker.getLatLng(), Math.max(map.leaflet.getZoom(), 9), { duration: 0.6 });
  marker.openPopup();
}

function renderMapPoints() {
  document.getElementById("map-points").replaceChildren(
    ...visiblePoints().map((p) =>
      el(
        "li",
        {},
        el(
          "button",
          { type: "button", class: "map-point", onclick: () => focusPoint(p.id), disabled: !map.leaflet },
          el("span", { class: `swatch ${p.kind}`, "aria-hidden": "true" }),
          el("span", {}, el("strong", {}, p.name), p.approx && el("span", { class: "approx" }, " approx."), el("span", { class: "map-point-text" }, p.text)),
        ),
      ),
    ),
  );
}

function drawMap(fromParis = false) {
  const L = window.L;
  if (!map.leaflet) return;
  map.layer.clearLayers();
  map.markers.clear();
  const color = { airport: cssVar("--map-airport"), stay: cssVar("--map-stay"), visit: cssVar("--map-visit"), raid: cssVar("--map-raid") };
  const planColor = Object.fromEntries(PLANS.map((p) => [p.id, cssVar(`--${p.id}`)]));

  for (const route of MAP_ROUTES) {
    if (map.filter !== "all" && route.plan !== map.filter) continue;
    const latlngs = route.points.map((id) => [POINTS_BY_ID[id].lat, POINTS_BY_ID[id].lng]);
    const style =
      route.kind === "ride"
        ? { color: planColor[route.plan], weight: 4, opacity: 0.85 }
        : route.kind === "flight"
          ? { color: cssVar("--muted"), weight: 2, dashArray: "2 8", opacity: 0.8 }
          : { color: cssVar("--muted"), weight: 2, dashArray: "6 6", opacity: 0.8 };
    L.polyline(latlngs, style).addTo(map.layer);
  }

  for (const p of visiblePoints()) {
    if (p.approx) {
      L.circle([p.lat, p.lng], { radius: 6000, color: color[p.kind], weight: 1, dashArray: "4 4", fillOpacity: 0.08 }).addTo(map.layer);
    }
    const marker = L.circleMarker([p.lat, p.lng], {
      radius: p.kind === "airport" ? 7 : 9,
      color: "#ffffff",
      weight: 2,
      fillColor: color[p.kind],
      fillOpacity: 1,
    })
      .bindTooltip(p.name)
      .bindPopup(pointPopup(p))
      .addTo(map.layer);
    map.markers.set(p.id, marker);
  }

  const framed = visiblePoints().filter((p) => fromParis || !["cdg", "hel"].includes(p.id));
  map.leaflet.fitBounds(
    framed.map((p) => [p.lat, p.lng]),
    { padding: [30, 30], maxZoom: 10 },
  );
}

function renderMapFilters() {
  const options = [{ id: "all", label: "Tout" }, ...PLANS.map((p) => ({ id: p.id, label: `Plan ${p.number}` }))];
  document.getElementById("map-filters").replaceChildren(
    ...options.map((o) =>
      el(
        "button",
        {
          type: "button",
          class: "chip",
          "aria-pressed": String(map.filter === o.id),
          onclick: () => {
            map.filter = o.id;
            renderMapFilters();
            renderMapPoints();
            drawMap();
          },
        },
        o.label,
      ),
    ),
    el("button", { type: "button", class: "link-button", onclick: () => drawMap(true), disabled: !map.leaflet }, "Voir depuis Paris"),
  );
}

async function initMap() {
  renderMapFilters();
  renderMapPoints();
  let L;
  try {
    L = await loadLeaflet();
  } catch (err) {
    console.error(err);
    document.getElementById("map").replaceChildren(el("p", { class: "map-error" }, "La carte n'a pas pu se charger. La liste des points reste disponible ci-dessous."));
    return;
  }
  map.leaflet = L.map("map", { scrollWheelZoom: false });
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map.leaflet);
  map.layer = L.layerGroup().addTo(map.leaflet);
  renderMapFilters();
  renderMapPoints();
  drawMap();
}

function renderPractical() {
  const root = document.getElementById("practical-list");
  for (const card of PRACTICAL) {
    root.append(
      el(
        "details",
        { class: "card fold", open: WIDE },
        el("summary", {}, el("h3", {}, card.title)),
        el("ul", {}, card.items.map((t) => el("li", {}, t))),
        sourceLinks(card.sources),
      ),
    );
  }
  document.getElementById("warnings-list").append(...WARNINGS.map((t) => el("li", {}, t)));
  document
    .getElementById("sources-list")
    .append(
      ...Object.values(SOURCES).map((s) => el("li", {}, el("a", { href: s.url, target: "_blank", rel: "noopener" }, s.label))),
    );
}

// ---------- Votes ----------

const state = {
  store: null,
  voter: EVERYONE.some((v) => v.id === storageGet(VOTER_KEY)) ? storageGet(VOTER_KEY) : null,
  votes: new Map(), // clé question__votant → { question, voter, choices, comment }
  ui: new Map(), // question id → éléments à mettre à jour
};

// Votes des frères : les seuls qui comptent dans les résultats.
function votesFor(questionId) {
  return VOTERS.map((v) => state.votes.get(voteKey(questionId, v.id))).filter(Boolean);
}

function parentVotesFor(questionId) {
  return PARENTS.map((p) => state.votes.get(voteKey(questionId, p.id))).filter(Boolean);
}

function renderVoterPicker() {
  const root = document.getElementById("voter-picker");
  document.body.dataset.voter = state.voter ?? "";
  const chip = (v) =>
    el(
      "button",
      {
        type: "button",
        class: "chip",
        "aria-pressed": String(state.voter === v.id),
        onclick: () => {
          state.voter = v.id;
          storageSet(VOTER_KEY, v.id);
          renderVoterPicker();
          refreshAll(true);
        },
      },
      v.name,
    );
  root.replaceChildren(
    el("span", { class: "picker-label" }, "Je suis :"),
    ...VOTERS.map(chip),
    el("span", { class: "picker-sep" }, "Parents :"),
    ...PARENTS.map(chip),
  );
}

function buildQuestion(q) {
  const ui = { options: new Map() };
  ui.count = el("span", { class: "badge" });
  ui.consensus = el("span", { class: "badge consensus", hidden: true }, "Unanimité ✓");
  ui.hint = el("p", { class: "hint" });
  ui.comment = el("textarea", {
    rows: 2,
    maxlength: 1000,
    placeholder: "Un avis, une question, une préférence…",
    "aria-label": `Commentaire sur « ${q.title} »`,
    oninput: () => (ui.comment.dataset.dirty = "1"),
  });
  ui.commentButton = el("button", { type: "button", class: "button small", onclick: () => saveComment(q) }, "Enregistrer");
  ui.comments = el("ul", { class: "comments" });
  ui.commentToggle = el(
    "button",
    {
      type: "button",
      class: "link-button comment-toggle",
      onclick: () => {
        ui.article.classList.add("comment-open");
        ui.comment.focus();
      },
    },
    "💬 Ajouter un commentaire",
  );

  const options = q.options.map((opt) => {
    const parts = {
      button: el(
        "button",
        { type: "button", class: "option", role: q.multiple ? "checkbox" : "radio", onclick: () => toggleOption(q, opt.id) },
        el("span", { class: "option-check", "aria-hidden": "true" }),
        el("span", { class: "option-text" }, el("span", { class: "option-label" }, opt.label), opt.detail && el("span", { class: "option-detail" }, opt.detail)),
      ),
      row: null,
      bar: el("span", { class: "bar-fill" }),
      tally: el("span", { class: "tally" }),
      who: el("span", { class: "who" }),
      parents: el("span", { class: "who" }),
    };
    ui.options.set(opt.id, parts);
    return (parts.row = el(
      "li",
      { class: "option-row" },
      parts.button,
      el("div", { class: "result" }, el("span", { class: "bar" }, parts.bar), parts.tally, parts.who, parts.parents),
    ));
  });

  state.ui.set(q.id, ui);
  return (ui.article = el(
    "article",
    { class: "question", id: `q-${q.id}` },
    el("header", {}, el("h3", {}, q.title), el("div", { class: "badges" }, ui.count, ui.consensus)),
    q.help && el("p", { class: "help" }, q.help),
    el("ul", { class: "options", role: q.multiple ? "group" : "radiogroup", "aria-label": q.title }, options),
    ui.hint,
    ui.commentToggle,
    el("div", { class: "comment-box" }, ui.comment, ui.commentButton),
    ui.comments,
  ));
}

function refreshQuestion(q, voterChanged) {
  const ui = state.ui.get(q.id);
  const votes = votesFor(q.id);
  const mine = state.voter ? state.votes.get(voteKey(q.id, state.voter)) : null;
  const voted = votes.filter((v) => v.choices.length > 0);

  ui.count.textContent = `${voted.length}/${VOTERS.length} ont voté`;
  const first = voted[0]?.choices.slice().sort().join("|");
  ui.consensus.hidden = !(
    voted.length === VOTERS.length && voted.every((v) => v.choices.slice().sort().join("|") === first)
  );

  for (const opt of q.options) {
    const parts = ui.options.get(opt.id);
    const voters = voted.filter((v) => v.choices.includes(opt.id)).map((v) => v.voter);
    const selected = Boolean(mine?.choices.includes(opt.id));
    parts.button.setAttribute("aria-checked", String(selected));
    parts.button.disabled = !state.voter;
    parts.bar.style.width = `${(voters.length / VOTERS.length) * 100}%`;
    parts.tally.textContent = String(voters.length);
    parts.who.replaceChildren(...voters.map((id) => el("span", { class: "who-chip", title: voterName(id) }, voterName(id))));
    const parents = parentVotesFor(q.id).filter((v) => v.choices.includes(opt.id)).map((v) => v.voter);
    parts.row.classList.toggle("empty", voters.length === 0 && parents.length === 0);
    parts.parents.replaceChildren(
      ...parents.map((id) => el("span", { class: "who-chip parent", title: `Avis de ${voterName(id)} (ne compte pas)` }, voterName(id))),
    );
  }

  ui.hint.textContent = state.voter
    ? q.multiple
      ? "Clique pour cocher / décocher. C'est enregistré tout de suite."
      : "Clique pour choisir (re-clique pour annuler). C'est enregistré tout de suite."
    : "Choisis d'abord qui tu es, en haut de la section.";
  if (state.voter && isParent(state.voter)) ui.hint.textContent += " Ton avis s'affiche à part et ne compte pas dans le résultat.";

  ui.comment.disabled = ui.commentButton.disabled = !state.voter;
  ui.commentToggle.hidden = !state.voter;
  if (voterChanged) ui.article.classList.toggle("comment-open", Boolean(mine?.comment));
  const typing = document.activeElement === ui.comment || ui.comment.dataset.dirty === "1";
  if (voterChanged || !typing) {
    ui.comment.value = mine?.comment ?? "";
    delete ui.comment.dataset.dirty;
  }

  ui.comments.replaceChildren(
    ...[...votes, ...parentVotesFor(q.id)]
      .filter((v) => v.comment.trim())
      .map((v) => el("li", { class: isParent(v.voter) ? "parent" : null }, el("strong", {}, voterName(v.voter)), " ", v.comment)),
  );
}

function refreshRecap() {
  const root = document.getElementById("recap");
  const progress = (people) =>
    people.map((v) => {
      const count = QUESTIONS.filter((q) => state.votes.get(voteKey(q.id, v.id))?.choices.length).length;
      return el("li", {}, el("strong", {}, v.name), ` ${count}/${QUESTIONS.length} questions`);
    });
  root.replaceChildren(
    el("ul", { class: "progress" }, progress(VOTERS)),
    el("ul", { class: "progress parents" }, el("li", {}, "Avis des parents :"), progress(PARENTS)),
    el(
      "ol",
      { class: "leaders" },
      QUESTIONS.map((q) => {
        const tallies = q.options
          .map((opt) => ({ opt, n: votesFor(q.id).filter((v) => v.choices.includes(opt.id)).length }))
          .filter((t) => t.n > 0)
          .sort((a, b) => b.n - a.n);
        const top = tallies.filter((t) => t.n === tallies[0]?.n);
        return el(
          "li",
          {},
          el("a", { href: `#q-${q.id}` }, q.title),
          el("span", { class: "leader" }, top.length ? top.map((t) => `${t.opt.label} (${t.n})`).join(" / ") : "pas encore de vote"),
        );
      }),
    ),
  );
}

function refreshAll(voterChanged = false) {
  for (const q of QUESTIONS) refreshQuestion(q, voterChanged);
  refreshRecap();
}

async function save(questionId, patch) {
  const current = state.votes.get(voteKey(questionId, state.voter)) ?? { choices: [], comment: "" };
  const vote = { question: questionId, voter: state.voter, choices: current.choices, comment: current.comment, ...patch };
  const previous = state.votes.get(voteKey(questionId, state.voter));
  state.votes.set(voteKey(questionId, state.voter), vote); // affichage immédiat
  refreshAll();
  try {
    await state.store.save(vote);
    return true;
  } catch (err) {
    console.error(err);
    if (previous) state.votes.set(voteKey(questionId, state.voter), previous);
    else state.votes.delete(voteKey(questionId, state.voter));
    refreshAll();
    toast("Le vote n'a pas pu être enregistré. Vérifie ta connexion.", "error");
    return false;
  }
}

function toggleOption(q, optionId) {
  if (!state.voter || !state.store) return;
  const current = state.votes.get(voteKey(q.id, state.voter))?.choices ?? [];
  const has = current.includes(optionId);
  const choices = q.multiple
    ? has
      ? current.filter((id) => id !== optionId)
      : [...current, optionId]
    : has
      ? []
      : [optionId];
  save(q.id, { choices });
}

async function saveComment(q) {
  if (!state.voter || !state.store) return;
  const ui = state.ui.get(q.id);
  const comment = ui.comment.value.trim().slice(0, 1000);
  delete ui.comment.dataset.dirty;
  if (await save(q.id, { comment })) toast("Commentaire enregistré.");
}

function setStatus(text, kind) {
  const node = document.getElementById("sync-status");
  node.textContent = text;
  node.dataset.kind = kind;
}

async function initVotes() {
  document.getElementById("questions-list").append(...QUESTIONS.map(buildQuestion));
  renderVoterPicker();
  refreshAll(true);

  if (firebaseConfig.apiKey) {
    setStatus("Connexion à la base de votes…", "pending");
    try {
      state.store = await createFirebaseStore();
    } catch (err) {
      console.error(err);
      setStatus("Impossible de joindre Firebase : les votes ne sont pas disponibles pour l'instant.", "error");
      return;
    }
  } else {
    state.store = createDemoStore();
    document.getElementById("demo-banner").hidden = false;
  }

  state.store.subscribe(
    (docs) => {
      state.votes = new Map(
        docs
          .filter((d) => EVERYONE.some((v) => v.id === d.voter))
          .map((d) => [voteKey(d.question, d.voter), { ...d, choices: d.choices ?? [], comment: d.comment ?? "" }]),
      );
      if (state.store.mode === "firebase") setStatus("Votes synchronisés en direct", "ok");
      refreshAll();
    },
    (err) => {
      console.error(err);
      setStatus("Connexion aux votes perdue. Recharge la page.", "error");
    },
  );
  if (state.store.mode === "demo") setStatus("Mode démo : votes gardés dans ce navigateur uniquement", "demo");
}

renderHero();
renderPlans();
renderComparison();
renderPractical();
initMap();
initVotes();

// Onglet actif de la barre du bas (téléphone).
const tabs = [...document.querySelectorAll(".tabbar a")];
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      tabs.forEach((t) => t.setAttribute("aria-current", String(t.getAttribute("href") === `#${entry.target.id}`)));
    }
  },
  { rootMargin: "-45% 0px -50% 0px" },
);
tabs.forEach((t) => {
  const section = document.querySelector(t.getAttribute("href"));
  if (section) observer.observe(section);
});
