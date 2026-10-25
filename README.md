# Laponie 2027 – raid motoneige

Site statique (HTML/CSS/JS, sans build) qui présente les recherches pour le voyage du 10 au 18 avril 2027 et permet aux trois frères (et aux parents, pour avis) de voter sur chaque choix, avec un commentaire libre par question. Les votes sont stockés dans Firebase Firestore et s'affichent en direct chez tout le monde.

Tant que Firebase n'est pas configuré, le site fonctionne en **mode démo** : les votes restent dans le navigateur de chacun.

## Structure

| Fichier | Rôle |
| --- | --- |
| `index.html` | La page |
| `js/data.js` | **Tout le contenu** : prénoms, plans, budgets, sources, questions de vote |
| `js/app.js` | Affichage et logique de vote |
| `js/firebase-config.js` | Config Firebase (à remplir) |
| `css/styles.css` | Style (clair/sombre, mobile) |
| `firestore.rules` | Règles de sécurité Firestore |
| `.nojekyll` | Désactive Jekyll sur GitHub Pages |
| `docs/recherches-perplexity.md` | Recherche d'origine |

## 1. Mettre vos prénoms

Dans `js/data.js`, change les `name` de `VOTERS` (`"Frère 1"` → ton prénom, etc.). Ne touche pas aux `id` (`frere1`, `frere2`, `frere3`) : ils sont repris dans `firestore.rules`.

Les parents (`PARENTS` : `papa`, `maman`) votent et commentent aussi, mais leur avis s'affiche à part et ne compte pas dans le résultat ni dans l'unanimité.

Si tu as déjà publié les règles dans Firebase avant l'ajout des parents, **recolle la nouvelle version de `firestore.rules`** dans l'onglet Règles, sinon leurs votes seront refusés.

## 2. Brancher Firebase (gratuit, ~10 min)

1. Va sur <https://console.firebase.google.com>, **Ajouter un projet** (Google Analytics inutile).
2. **Build → Authentication → Commencer → Sign-in method → Anonyme → Activer.**
3. **Build → Firestore Database → Créer une base de données**, emplacement `eur3 (europe-west)`, mode production.
4. Onglet **Règles** de Firestore : colle le contenu de `firestore.rules`, puis **Publier**.
5. **Paramètres du projet (roue dentée) → Vos applications → icône Web `</>`**, donne un nom, pas besoin d'hébergement Firebase. Copie l'objet `firebaseConfig` affiché dans `js/firebase-config.js`.
6. **Authentication → Paramètres → Domaines autorisés** : ajoute `<ton-pseudo>.github.io`.

La config Firebase est publique par nature (elle finit dans le navigateur) ; ce sont les règles qui protègent la base.

## 3. Publier sur GitHub Pages

Pages est configuré en **Deploy from a branch** sur `claude/vibrant-mayer-2re17f`, dossier `/ (root)` : chaque push republie le site (onglet **Actions**, « pages build and deployment »). Le fichier `.nojekyll` sert les fichiers tels quels.

Adresse : <https://blefebvre-lfbvrr.github.io/Project-Laponie-2027/>. Envoie-la à tes frères.

## Tester en local

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

## Modifier les questions

Ajoute ou change une entrée de `QUESTIONS` dans `js/data.js` (`multiple: true` pour un choix multiple). Garde les `id` existants si des votes ont déjà été faits, sinon ils ne seront plus rattachés.
