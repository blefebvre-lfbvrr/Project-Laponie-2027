import { REPO, TRIP, VOTERS, PARENTS, SOURCES, PLANS, PRACTICAL, WARNINGS, QUESTIONS } from "./data.js";

const VOTER_KEY = "laponie2027-voter";
const draftKey = (voterId) => `laponie2027-draft-${voterId}`;
const REFRESH_MS = 90_000; // l'API GitHub sans compte autorise 60 requêtes/heure
const MAX_URL = 7500; // au-delà, GitHub refuse l'URL de création d'issue

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
const voterName = (id) => EVERYONE.find((v) => v.id === id)?.name ?? id;
const voteKey = (questionId, voterId) => `${questionId}__${voterId}`;

let toastTimer;
function toast(message, kind = "info") {
  const node = document.getElementById("toast");
  node.textContent = message;
  node.dataset.kind = kind;
  node.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (node.hidden = true), 4500);
}

// ---------- Votes publiés : data/votes.json dans le dépôt ----------

async function fetchPublishedVotes() {
  const { owner, repo, branch } = REPO;
  const api = `https://api.github.com/repos/${owner}/${repo}/contents/data/votes.json?ref=${encodeURIComponent(branch)}`;
  try {
    const res = await fetch(api, { headers: { Accept: "application/vnd.github.raw+json" }, cache: "no-store" });
    if (res.ok) return await res.json();
  } catch {
    // Hors ligne ou limite de l'API atteinte : on se rabat sur la copie servie avec le site.
  }
  const res = await fetch(`data/votes.json?t=${Date.now()}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`data/votes.json : HTTP ${res.status}`);
  return res.json();
}

// Brouillon : votes du votant courant pas encore envoyés, gardés sur cet appareil.
function readDraft(voterId) {
  try {
    return JSON.parse(storageGet(draftKey(voterId))) || {};
  } catch {
    return {};
  }
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
  voter: EVERYONE.some((v) => v.id === storageGet(VOTER_KEY)) ? storageGet(VOTER_KEY) : null,
  published: new Map(), // clé question__votant → { question, voter, choices, comment } (data/votes.json)
  draft: {}, // question id → { choices, comment } du votant courant, pas encore envoyé
  loadedAt: null,
  ui: new Map(), // question id → éléments à mettre à jour
};
state.draft = state.voter ? readDraft(state.voter) : {};

function getVote(questionId, voterId) {
  const draft = voterId === state.voter ? state.draft[questionId] : null;
  if (draft) return { question: questionId, voter: voterId, ...draft };
  return state.published.get(voteKey(questionId, voterId));
}

// Votes des frères : les seuls qui comptent dans les résultats.
function votesFor(questionId) {
  return VOTERS.map((v) => getVote(questionId, v.id)).filter(Boolean);
}

function parentVotesFor(questionId) {
  return PARENTS.map((p) => getVote(questionId, p.id)).filter(Boolean);
}

const sameVote = (a, b) =>
  (a?.comment ?? "") === (b?.comment ?? "") &&
  [...(a?.choices ?? [])].sort().join("|") === [...(b?.choices ?? [])].sort().join("|");

// Retire du brouillon ce qui est déjà publié tel quel (ou ce qui ne change rien).
function pruneDraft() {
  if (!state.voter) return;
  for (const questionId of Object.keys(state.draft)) {
    if (sameVote(state.draft[questionId], state.published.get(voteKey(questionId, state.voter)))) {
      delete state.draft[questionId];
    }
  }
  storageSet(draftKey(state.voter), JSON.stringify(state.draft));
}

function setDraft(questionId, patch) {
  const current = getVote(questionId, state.voter) ?? { choices: [], comment: "" };
  state.draft[questionId] = { choices: current.choices, comment: current.comment, ...patch };
  pruneDraft();
  refreshAll();
}

function renderVoterPicker() {
  const root = document.getElementById("voter-picker");
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
          state.draft = readDraft(v.id);
          pruneDraft();
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
  ui.pending = el("span", { class: "badge pending", hidden: true }, "Non envoyé");
  ui.consensus = el("span", { class: "badge consensus", hidden: true }, "Unanimité ✓");
  ui.hint = el("p", { class: "hint" });
  ui.comment = el("textarea", {
    rows: 2,
    maxlength: 1000,
    placeholder: "Un avis, une question, une préférence…",
    "aria-label": `Commentaire sur « ${q.title} »`,
    oninput: () => (ui.comment.dataset.dirty = "1"),
  });
  ui.commentButton = el("button", { type: "button", class: "button small", onclick: () => saveComment(q) }, "Ajouter");
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
      parents: el("span", { class: "who" }),
    };
    ui.options.set(opt.id, parts);
    return el(
      "li",
      { class: "option-row" },
      parts.button,
      el("div", { class: "result" }, el("span", { class: "bar" }, parts.bar), parts.tally, parts.who, parts.parents),
    );
  });

  state.ui.set(q.id, ui);
  return el(
    "article",
    { class: "question", id: `q-${q.id}` },
    el("header", {}, el("h3", {}, q.title), el("div", { class: "badges" }, ui.pending, ui.count, ui.consensus)),
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
  const mine = state.voter ? getVote(q.id, state.voter) : null;
  const voted = votes.filter((v) => v.choices.length > 0);

  ui.count.textContent = `${voted.length}/${VOTERS.length} ont voté`;
  ui.pending.hidden = !state.draft[q.id];
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
    parts.parents.replaceChildren(
      ...parents.map((id) => el("span", { class: "who-chip parent", title: `Avis de ${voterName(id)} (ne compte pas)` }, voterName(id))),
    );
  }

  ui.hint.textContent = state.voter
    ? q.multiple
      ? "Clique pour cocher / décocher."
      : "Clique pour choisir (re-clique pour annuler)."
    : "Choisis d'abord qui tu es, en haut de la section.";
  if (state.voter) ui.hint.textContent += " Gardé sur cet appareil jusqu'à l'envoi.";
  if (state.voter && isParent(state.voter)) ui.hint.textContent += " Ton avis s'affiche à part et ne compte pas dans le résultat.";

  ui.comment.disabled = ui.commentButton.disabled = !state.voter;
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
      const count = QUESTIONS.filter((q) => getVote(q.id, v.id)?.choices.length).length;
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

function refreshSendBox() {
  const pending = Object.keys(state.draft).length;
  const button = document.getElementById("send-votes");
  const note = document.getElementById("send-note");
  button.disabled = !state.voter || pending === 0;
  button.textContent = pending ? `Envoyer mes votes (${pending})` : "Envoyer mes votes";
  note.textContent = !state.voter
    ? ""
    : pending
      ? `${pending} modification${pending > 1 ? "s" : ""} pas encore envoyée${pending > 1 ? "s" : ""} : les autres ne la voient pas encore.`
      : "Tout est envoyé ✓";
}

function refreshAll(voterChanged = false) {
  for (const q of QUESTIONS) refreshQuestion(q, voterChanged);
  refreshRecap();
  refreshSendBox();
}

function toggleOption(q, optionId) {
  if (!state.voter) return;
  const current = getVote(q.id, state.voter)?.choices ?? [];
  const has = current.includes(optionId);
  const choices = q.multiple
    ? has
      ? current.filter((id) => id !== optionId)
      : [...current, optionId]
    : has
      ? []
      : [optionId];
  setDraft(q.id, { choices });
}

function saveComment(q) {
  if (!state.voter) return;
  const ui = state.ui.get(q.id);
  const comment = ui.comment.value.trim().slice(0, 1000);
  delete ui.comment.dataset.dirty;
  setDraft(q.id, { comment });
  toast("Commentaire ajouté. Pense à envoyer tes votes.");
}

// Ouvre une issue GitHub pré-remplie ; la GitHub Action « Enregistrer les votes » l'écrit dans data/votes.json.
function sendVotes() {
  if (!state.voter) return;
  const name = voterName(state.voter);
  const votes = {};
  const summary = [];
  for (const q of QUESTIONS) {
    const vote = getVote(q.id, state.voter);
    if (!vote) continue;
    votes[q.id] = { choices: vote.choices, comment: vote.comment.trim() };
    const labels = vote.choices.map((id) => q.options.find((o) => o.id === id)?.label ?? id);
    summary.push(`- **${q.title}** ${labels.length ? labels.join(", ") : "(aucun choix)"}`);
  }
  const json = ["```json", JSON.stringify({ voter: state.voter, votes }, null, 2), "```"].join("\n");
  const intro = "<!-- Ne modifie pas le bloc json : clique simplement sur « Create » / « Submit new issue ». -->";
  const title = `[vote] ${name}`;
  const { owner, repo } = REPO;
  const issueUrl = (body) =>
    `https://github.com/${owner}/${repo}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;

  let url = issueUrl([`Votes de ${name} pour Laponie 2027.`, "", ...summary, "", intro, json].join("\n"));
  if (url.length > MAX_URL) url = issueUrl([intro, json].join("\n"));
  if (url.length > MAX_URL) {
    // Trop long pour une URL (longs commentaires) : on copie le texte, à coller dans l'issue.
    navigator.clipboard?.writeText([intro, json].join("\n")).catch(() => {});
    url = issueUrl("");
    toast("Texte copié : colle-le dans la description de l'issue avant de valider.");
  } else {
    toast("Valide l'issue sur GitHub : tes votes apparaîtront ici environ une minute après.");
  }
  window.open(url, "_blank", "noopener");
}

function setStatus(text, kind) {
  const node = document.getElementById("sync-status");
  node.textContent = text;
  node.dataset.kind = kind;
}

async function loadVotes() {
  try {
    const data = await fetchPublishedVotes();
    state.published = new Map(
      Object.values(data)
        .filter((d) => EVERYONE.some((v) => v.id === d.voter) && QUESTIONS.some((q) => q.id === d.question))
        .map((d) => [voteKey(d.question, d.voter), { ...d, choices: d.choices ?? [], comment: d.comment ?? "" }]),
    );
    state.loadedAt = new Date();
    pruneDraft();
    const time = state.loadedAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    setStatus(`Votes du dépôt chargés à ${time}`, "ok");
    refreshAll();
  } catch (err) {
    console.error(err);
    setStatus("Impossible de charger les votes pour l'instant. Réessaie plus tard.", "error");
  }
}

function initVotes() {
  document.getElementById("questions-list").append(...QUESTIONS.map(buildQuestion));
  document.getElementById("send-votes").addEventListener("click", sendVotes);
  document.getElementById("refresh-votes").addEventListener("click", loadVotes);
  renderVoterPicker();
  refreshAll(true);
  setStatus("Chargement des votes…", "pending");
  loadVotes();
  setInterval(() => {
    if (document.visibilityState === "visible") loadVotes();
  }, REFRESH_MS);
}

renderHero();
renderPlans();
renderComparison();
renderPractical();
initVotes();
