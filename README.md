# Laponie 2027 – raid motoneige

Site statique (HTML/CSS/JS, sans build) qui présente les recherches pour le voyage du 10 au 18 avril 2027 et permet aux trois frères (et aux parents, pour avis) de voter sur chaque choix, avec un commentaire libre par question. Les votes sont stockés dans Firebase Firestore et s'affichent en direct chez tout le monde.

Le site est branché sur le projet Firebase `projet-laponie-2027`. Si `apiKey` est vidée dans `js/firebase-config.js`, il repasse en **mode démo** (votes gardés dans le navigateur de chacun).

## Structure

| Fichier | Rôle |
| --- | --- |
| `index.html` | La page |
| `js/data.js` | **Tout le contenu** : prénoms, plans, budgets, points de la carte (`MAP_POINTS`, `MAP_ROUTES`), sources, questions de vote |
| `js/app.js` | Affichage et logique de vote |
| `js/firebase-config.js` | Config Firebase (projet `projet-laponie-2027`) |
| `css/styles.css` | Style (clair/sombre, mobile) |
| `firestore.rules` | Règles de sécurité Firestore |
| `.nojekyll` | Désactive Jekyll sur GitHub Pages |
| `docs/recherches-perplexity.md` | Recherche d'origine |

## 1. Votants

Dans `js/data.js` : `VOTERS` (Etienne, Nicolas, Benjamin) et `PARENTS` (Papa, Maman). L'avis des parents s'affiche à part et ne compte pas dans le résultat ni dans l'unanimité. Les noms affichés peuvent changer ; pas les `id` (`frere1`…`frere3`, `papa`, `maman`), repris dans `firestore.rules`.

## 2. Brancher Firebase (gratuit, ~10 min)

1. Va sur <https://console.firebase.google.com>, **Ajouter un projet** (Google Analytics inutile).
2. **Build → Authentication → Commencer → Sign-in method → Anonyme → Activer.**
3. **Build → Firestore Database → Créer une base de données**, emplacement `eur3 (europe-west)`, mode production.
4. Onglet **Règles** de Firestore : colle le contenu de `firestore.rules`, puis **Publier**.
5. **Paramètres du projet (roue dentée) → Vos applications → icône Web `</>`**, donne un nom, pas besoin d'hébergement Firebase. Copie l'objet `firebaseConfig` affiché dans `js/firebase-config.js`.
6. **Authentication → Paramètres → Domaines autorisés** : ajoute `blefebvre-lfbvrr.github.io`.

La config Firebase est publique par nature (elle finit dans le navigateur) ; ce sont les règles qui protègent la base.

## 3. Publier sur GitHub Pages

Pages est configuré en **Deploy from a branch** sur `claude/vibrant-mayer-2re17f`, dossier `/ (root)` : chaque push republie le site (onglet **Actions**, « pages build and deployment »). Le fichier `.nojekyll` sert les fichiers tels quels.

Adresse : <https://blefebvre-lfbvrr.github.io/Project-Laponie-2027/>. Envoie-la à tes frères et aux parents.

## Tester en local

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

## Modifier les questions

Ajoute ou change une entrée de `QUESTIONS` dans `js/data.js` (`multiple: true` pour un choix multiple). Garde les `id` existants si des votes ont déjà été faits, sinon ils ne seront plus rattachés.

Après toute modification de `js/` ou `css/`, change la valeur `?v=…` (même valeur aux 4 endroits, dans `index.html` et en haut de `js/app.js`) : sinon les navigateurs peuvent garder l'ancienne version en cache jusqu'à 10 minutes.
