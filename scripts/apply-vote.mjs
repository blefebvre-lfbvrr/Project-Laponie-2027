// Lit une issue « [vote] … » (événement GitHub), valide son bloc json avec js/data.js
// et met à jour data/votes.json. Lancé par .github/workflows/votes.yml.
//
// Sorties (GITHUB_OUTPUT) : status=ok|error, voter=<id validé>.
// Message à poster sur l'issue : $RUNNER_TEMP/vote-result.md.

import { appendFile, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { VOTERS, PARENTS, QUESTIONS } from "../js/data.js";

const VOTES_FILE = new URL("../data/votes.json", import.meta.url);
const RESULT_FILE = join(process.env.RUNNER_TEMP ?? ".", "vote-result.md");
const MAX_COMMENT = 1000;

const EVERYONE = [...VOTERS, ...PARENTS];

async function output(name, value) {
  if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, `${name}=${value}\n`);
}

async function finish(status, message, voter = "") {
  await writeFile(RESULT_FILE, `${message}\n`);
  await output("status", status);
  await output("voter", voter);
  console.log(`${status}: ${message}`);
}

// Retourne { voter, entries } ou lève une Error avec un message lisible par la famille.
export function parseVote(body, login) {
  const match = /```json\s*([\s\S]*?)```/.exec(body ?? "");
  if (!match) throw new Error("Je ne trouve pas le bloc ```json``` dans l'issue. Renvoie tes votes depuis le site.");

  let payload;
  try {
    payload = JSON.parse(match[1]);
  } catch {
    throw new Error("Le bloc json est illisible (il a peut-être été modifié). Renvoie tes votes depuis le site.");
  }

  const person = EVERYONE.find((p) => p.id === payload?.voter);
  if (!person) throw new Error(`Votant inconnu : « ${String(payload?.voter)} ».`);
  const allowed = (person.github ?? []).map((l) => l.toLowerCase());
  if (allowed.length && !allowed.includes(String(login).toLowerCase())) {
    throw new Error(`Le compte GitHub @${login} n'est pas autorisé à voter sous le nom ${person.name}.`);
  }

  if (typeof payload.votes !== "object" || payload.votes === null || Array.isArray(payload.votes)) {
    throw new Error("Aucun vote dans l'issue.");
  }

  const entries = [];
  for (const [questionId, vote] of Object.entries(payload.votes)) {
    const question = QUESTIONS.find((q) => q.id === questionId);
    if (!question) throw new Error(`Question inconnue : « ${questionId} ».`);
    const choices = vote?.choices ?? [];
    const comment = vote?.comment ?? "";
    if (!Array.isArray(choices) || choices.some((c) => !question.options.some((o) => o.id === c))) {
      throw new Error(`Choix invalide pour « ${question.title} ».`);
    }
    if (new Set(choices).size !== choices.length || (!question.multiple && choices.length > 1)) {
      throw new Error(`Trop de choix pour « ${question.title} ».`);
    }
    if (typeof comment !== "string" || comment.trim().length > MAX_COMMENT) {
      throw new Error(`Commentaire invalide ou trop long (${MAX_COMMENT} caractères max) pour « ${question.title} ».`);
    }
    entries.push({ question, choices, comment: comment.trim() });
  }
  return { voter: person, entries };
}

export function applyVote(votes, { voter, entries }, meta) {
  const next = { ...votes };
  for (const { question, choices, comment } of entries) {
    const key = `${question.id}__${voter.id}`;
    if (!choices.length && !comment) delete next[key];
    else next[key] = { question: question.id, voter: voter.id, choices, comment, ...meta };
  }
  return Object.fromEntries(Object.entries(next).sort(([a], [b]) => a.localeCompare(b)));
}

function summarize({ voter, entries }) {
  const lines = entries.map(({ question, choices, comment }) => {
    const labels = choices.map((id) => question.options.find((o) => o.id === id).label);
    const text = labels.length ? labels.join(", ") : "aucun choix";
    return `- **${question.title}** ${text}${comment ? " 💬" : ""}`;
  });
  return [`✅ Votes de **${voter.name}** enregistrés dans \`data/votes.json\`.`, "", ...lines].join("\n");
}

async function main() {
  const event = JSON.parse(await readFile(process.env.GITHUB_EVENT_PATH, "utf8"));
  const issue = event.issue;
  let parsed;
  try {
    parsed = parseVote(issue.body, issue.user.login);
  } catch (err) {
    await finish("error", `❌ Votes non enregistrés : ${err.message}`);
    return;
  }
  const votes = JSON.parse(await readFile(VOTES_FILE, "utf8"));
  const updated = applyVote(votes, parsed, {
    updatedAt: new Date().toISOString(),
    by: issue.user.login,
    issue: issue.number,
  });
  await writeFile(VOTES_FILE, `${JSON.stringify(updated, null, 2)}\n`);
  await finish("ok", summarize(parsed), parsed.voter.id);
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  await main();
}
