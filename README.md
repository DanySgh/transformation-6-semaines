# Transformation 6 Semaines

🔗 **App en ligne : [danysgh.github.io/transformation-6-semaines](https://danysgh.github.io/transformation-6-semaines/)**

Mini application web (PWA) pour suivre un programme de transformation physique sur 6 semaines : checklist sportive et nutritionnelle quotidienne, suivi de poids, photos hebdomadaires, notes et score de régularité.

100% HTML / CSS / JavaScript, sans dépendance, sans base de données, sans compte. Toutes les données sont stockées en local sur ton téléphone (`localStorage`).

## Lancer en local

Aucune installation nécessaire. Deux options :

1. **Le plus simple** : double-clique sur `index.html` pour l'ouvrir directement dans ton navigateur.
2. **Avec un petit serveur local** (recommandé pour tester le mode hors-ligne / service worker) :
   ```bash
   cd transformation-6-semaines
   python3 -m http.server 8080
   ```
   Puis ouvre `http://localhost:8080` dans ton navigateur.

## Héberger gratuitement sur GitHub Pages

1. Crée un dépôt GitHub et pousse ce dossier dedans :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   gh repo create transformation-6-semaines --public --source=. --remote=origin --push
   ```
2. Active GitHub Pages : Settings → Pages → Source = branche `main`, dossier `/ (root)`.
3. Ton app sera disponible à l'adresse `https://<ton-pseudo-github>.github.io/transformation-6-semaines/`.

Ce dépôt est déjà configuré ainsi : déploiement en ligne sur `https://danysgh.github.io/transformation-6-semaines/`.

(Le même dossier fonctionne aussi tel quel sur Netlify ou Vercel : il suffit de glisser-déposer le dossier ou de connecter le dépôt, sans configuration de build.)

## Installer sur iPhone

1. Ouvre l'URL de l'app dans **Safari** (obligatoire, pas Chrome).
2. Touche le bouton **Partager** (icône carré avec flèche).
3. Choisis **Ajouter à l'écran d'accueil**.
4. Ouvre ensuite l'app depuis l'icône sur l'écran d'accueil : elle s'ouvre en plein écran, comme une vraie app.

## Connecter les pas / minutes d'exercice de l'Apple Watch

Un site web n'a pas accès à HealthKit (Apple ne l'autorise que pour les apps natives). La solution gratuite et sans serveur : un **Raccourci** (app Shortcuts) qui lit l'app Santé puis ouvre l'app avec les valeurs en paramètres d'URL — l'app les enregistre automatiquement sur le bon jour.

1. Ouvre l'app **Raccourcis** sur ton iPhone → onglet **Raccourcis** → **+** pour créer un nouveau raccourci.
2. Ajoute l'action **Obtenir des échantillons de santé** → type *Nombre de pas* → plage *Aujourd'hui*.
3. Ajoute **Calculer une statistique** → *Somme* sur le résultat précédent (donne le total de pas du jour).
4. Répète les étapes 2-3 pour le type *Minutes d'exercice*.
5. Ajoute l'action **Texte**, et compose :
   `https://danysgh.github.io/transformation-6-semaines/?pas=VARIABLE_PAS&exercice=VARIABLE_EXERCICE`
   (insère les résultats des étapes 3 comme variables à la place de `VARIABLE_PAS` / `VARIABLE_EXERCICE`).
6. Ajoute l'action **Ouvrir les URL** avec ce texte.
7. Nomme le raccourci (ex: "Maj Suivi 6 Semaines") et enregistre.

Ensuite, deux façons de l'utiliser :
- **Manuellement** : tape le raccourci depuis l'écran d'accueil ou le widget Raccourcis quand tu veux mettre à jour pas/exercice du jour.
- **Automatiquement** : onglet **Automatisation** → **+** → **Heure de la journée** (ex: 21h00 tous les jours) → action **Exécuter le raccourci** → choisis le raccourci → désactive **Demander avant d'exécuter** pour qu'il tourne sans confirmation.

L'app détecte les paramètres `?pas=...&exercice=...` à l'ouverture, les enregistre sur le jour correspondant (ajoute `&date=AAAA-MM-JJ` dans le raccourci si tu veux viser un autre jour), affiche une confirmation, puis nettoie l'URL.

Si tu ne veux pas configurer ce raccourci, les deux champs **Pas du jour** et **Cardio / marche** restent saisissables à la main dans l'onglet *Sport* de la page du jour.

## Sauvegarder / exporter mes données

Toutes les données (checklist, poids, photos, notes) sont sauvegardées automatiquement dans `localStorage`, sur cet appareil uniquement.

- Depuis la page d'accueil, ouvre **Réglages & données**.
- **Exporter mes données (JSON)** télécharge un fichier `t6s-data-AAAA-MM-JJ.json` contenant toute ta progression — à conserver comme sauvegarde, ou pour la transférer sur un autre appareil.
- **Importer un fichier JSON** restaure une sauvegarde précédente (remplace les données actuelles).
- **Réinitialiser** efface toutes les données après double confirmation.

## Structure du projet

```
index.html      structure des pages (Accueil, Aujourd'hui, Semaines, Poids, Photos)
style.css       thème sombre / vert, mobile-first
app.js          programme sportif + nutrition, logique, sauvegarde, scores
manifest.json   métadonnées PWA
sw.js           cache hors-ligne minimal
icon-192.png / icon-512.png   icônes de l'app
```

Aucune étape de build : modifie directement ces fichiers et recharge la page.
