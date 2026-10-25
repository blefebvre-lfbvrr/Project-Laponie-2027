# Laponie 2027 – raid motoneige

Site statique (HTML/CSS/JS, sans build) qui présente les recherches pour le voyage du 10 au 18 avril 2027 et permet aux trois frères (et aux parents, pour avis) de voter sur chaque choix, avec un commentaire libre par question.

Les votes sont stockés **dans ce dépôt git**, dans `data/votes.json`. Pas de base de données externe.

## Comment marche le vote

1. Sur le site, chacun choisit son nom et vote. Les choix restent sur son appareil (brouillon) tant qu'ils ne sont pas envoyés.
2. **Envoyer mes votes** ouvre une issue GitHub pré-remplie (titre `[vote] <Nom>`, bloc json). Il faut un compte GitHub (gratuit) et cliquer sur *Create*.
3. La GitHub Action `.github/workflows/votes.yml` lance `scripts/apply-vote.mjs` : il valide le vote avec `js/data.js`, met à jour `data/votes.json`, commite, commente l'issue et la ferme.
4. Le site relit `data/votes.json` via l'API GitHub (toutes les 90 s, ou bouton *Rafraîchir*) : les votes apparaissent pour tout le monde environ une minute après.

Renvoyer ses votes remplace les précédents. L'historique complet est dans `git log data/votes.json`.

## Structure

| Fichier | Rôle |
| --- | --- |
| `index.html` | La page |
| `js/data.js` | **Tout le contenu** : dépôt, prénoms, plans, budgets, sources, questions de vote |
| `js/app.js` | Affichage et logique de vote |
| `css/styles.css` | Style (clair/sombre, mobile) |
| `data/votes.json` | Les votes (écrit par l'Action, ne pas modifier à la main sauf correction) |
| `scripts/apply-vote.mjs` | Validation et enregistrement d'un vote reçu par issue |
| `.github/workflows/votes.yml` | Action déclenchée par les issues `[vote]` |
| `package.json` | Indique à Node que les `.js` sont des modules ES (pour que le script lise `js/data.js`) |
| `.nojekyll` | Désactive Jekyll sur GitHub Pages |
| `docs/recherches-perplexity.md` | Recherche d'origine |

## Votants

Dans `js/data.js` : `VOTERS` (Etienne, Nicolas, Benjamin) et `PARENTS` (Papa, Maman). L'avis des parents s'affiche à part et ne compte pas dans le résultat ni dans l'unanimité. Ne change pas les `id` une fois que des votes existent.

**Recommandé** : renseigne le champ `github` de chacun avec son identifiant GitHub (ex. `github: ["etienne-dupont"]`). Sinon, n'importe quel compte GitHub peut ouvrir une issue `[vote]` au nom de quelqu'un d'autre.

## Réglages GitHub nécessaires

- **Issues activées** : Settings → General → Features → Issues.
- **Actions autorisées à écrire** : Settings → Actions → General → Workflow permissions → *Read and write permissions* (si le workflow échoue avec une erreur 403 au push).
- Le workflow tourne sur la branche par défaut du dépôt et y commite `data/votes.json` ; `REPO.branch` dans `js/data.js` doit être cette même branche.

## Publication (GitHub Pages)

Pages est configuré en **Deploy from a branch** sur `claude/vibrant-mayer-2re17f`, dossier `/ (root)` : chaque push republie le site. Adresse : <https://blefebvre-lfbvrr.github.io/Project-Laponie-2027/>.

## Tester en local

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

Tester le script de vote sur un faux événement :

```bash
echo '{"issue":{"number":1,"body":"```json\n{\"voter\":\"frere1\",\"votes\":{\"formule\":{\"choices\":[\"plan2\"],\"comment\":\"\"}}}\n```","user":{"login":"moi"}}}' > /tmp/event.json
GITHUB_EVENT_PATH=/tmp/event.json RUNNER_TEMP=/tmp node scripts/apply-vote.mjs
git checkout data/votes.json   # annuler
```

## Modifier les questions

Ajoute ou change une entrée de `QUESTIONS` dans `js/data.js` (`multiple: true` pour un choix multiple). Garde les `id` existants si des votes ont déjà été faits, sinon ils ne seront plus rattachés.
