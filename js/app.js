import { TRIP, VOTERS, SOURCES, PLANS, PRACTICAL, WARNINGS, QUESTIONS } from "./data.js";
import { firebaseConfig } from "./firebase-config.js";

const FIREBASE_VERSION = "10.12.2";
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

const voterName = (id) => VOTERS.find((v) => v.id === id)?.name ?? id;
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
        el(
          "div",
          { class: "proscons" },
          el("ul", { class: "pros", "aria-label": "Points forts" }, plan.pros.map((t) => el("li", {}, t))),
          el("ul", { class: "cons", "aria-label": "Points faibles" }, plan.cons.map((t) => el("li", {}, t))),
        ),
        sourceLinks(plan.sources),
        el("a", { class: "button ghost", href: "#q-formule" }, "Voter pour la formule →"),
      ),
    );
  }
}

function renderComparison() {
  const rows = [
    ["Lieu", (p) => p.place],
    ["Itinérance", (p) => ["Non, retour en ville chaque soir", "2 jours / 1 nuit en lodge", "5 jours de boucles depuis Ruka"][p.number - 1]],
    ["Motoneige", (p) => ["3–4 journées, 95–299 €/jour", "60–100 km + 80–120 km", "30–80 km/jour, une machine chacun"][p.number - 1]],
    ["Budget / pers.", (p) => p.budget],
  ];
  const table = el(
    "table",
    {},
    el("thead", {}, el("tr", {}, el("th", { scope: "col" }, ""), PLANS.map((p) => el("th", { scope: "col" }, `Plan ${p.number}`)))),
    el(
      "tbody",
      {},
      rows.map(([label, get]) => el("tr", {}, el("th", { scope: "row" }, label), PLANS.map((p) => el("td", {}, get(p))))),
    ),
  );
  document.getElementById("compare-table").append(table);
}

function renderPractical() {
  const root = document.getElementById("practical-list");
  for (const card of PRACTICAL) {
    root.append(
      el("article", { class: "card" }, el("h3", {}, card.title), el("ul", {}, card.items.map((t) => el("li", {}, t))), sourceLinks(card.sources)),
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
  voter: VOTERS.some((v) => v.id === storageGet(VOTER_KEY)) ? storageGet(VOTER_KEY) : null,
  votes: new Map(), // clé question__votant → { question, voter, choices, comment }
  ui: new Map(), // question id → éléments à mettre à jour
};

function votesFor(questionId) {
  return VOTERS.map((v) => state.votes.get(voteKey(questionId, v.id))).filter(Boolean);
}

function renderVoterPicker() {
  const root = document.getElementById("voter-picker");
  root.replaceChildren(
    el("span", { class: "picker-label" }, "Je suis :"),
    ...VOTERS.map((v) =>
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
      ),
    ),
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

  const options = q.options.map((opt) => {
    const parts = {
      button: el(
        "button",
        { type: "button", class: "option", role: q.multiple ? "checkbox" : "radio", onclick: () => toggleOption(q, opt.id) },
        el("span", { class: "option-check", "aria-hidden": "true" }),
        el("span", { class: "option-text" }, el("span", { class: "option-label" }, opt.label), opt.detail && el("span", { class: "option-detail" }, opt.detail)),
      ),
      bar: el("span", { class: "bar-fill" }),
      tally: el("span", { class: "tally" }),
      who: el("span", { class: "who" }),
    };
    ui.options.set(opt.id, parts);
    return el(
      "li",
      { class: "option-row" },
      parts.button,
      el("div", { class: "result" }, el("span", { class: "bar" }, parts.bar), parts.tally, parts.who),
    );
  });

  state.ui.set(q.id, ui);
  return el(
    "article",
    { class: "question", id: `q-${q.id}` },
    el("header", {}, el("h3", {}, q.title), el("div", { class: "badges" }, ui.count, ui.consensus)),
    q.help && el("p", { class: "help" }, q.help),
    el("ul", { class: "options", role: q.multiple ? "group" : "radiogroup", "aria-label": q.title }, options),
    ui.hint,
    el("div", { class: "comment-box" }, ui.comment, ui.commentButton),
    ui.comments,
  );
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
  }

  ui.hint.textContent = state.voter
    ? q.multiple
      ? "Clique pour cocher / décocher. C'est enregistré tout de suite."
      : "Clique pour choisir (re-clique pour annuler). C'est enregistré tout de suite."
    : "Choisis d'abord qui tu es, en haut de la section.";

  ui.comment.disabled = ui.commentButton.disabled = !state.voter;
  const typing = document.activeElement === ui.comment || ui.comment.dataset.dirty === "1";
  if (voterChanged || !typing) {
    ui.comment.value = mine?.comment ?? "";
    delete ui.comment.dataset.dirty;
  }

  ui.comments.replaceChildren(
    ...votes
      .filter((v) => v.comment.trim())
      .map((v) => el("li", {}, el("strong", {}, voterName(v.voter)), " ", v.comment)),
  );
}

function refreshRecap() {
  const root = document.getElementById("recap");
  const done = VOTERS.map((v) => ({
    voter: v,
    count: QUESTIONS.filter((q) => state.votes.get(voteKey(q.id, v.id))?.choices.length).length,
  }));
  root.replaceChildren(
    el(
      "ul",
      { class: "progress" },
      done.map(({ voter, count }) =>
        el("li", {}, el("strong", {}, voter.name), ` ${count}/${QUESTIONS.length} questions`),
      ),
    ),
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
          .filter((d) => VOTERS.some((v) => v.id === d.voter))
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
initVotes();
