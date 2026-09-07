Tu es un expert senior en frontend, UI/UX, motion design, performance web et intégration pixel-perfect.

Tu travailles sur une page existante du projet **ExprimeTaFoi** qui a déjà été retravaillée par un autre agent IA.

## CONTEXTE

La demande initiale était la suivante :

* Créer une nouvelle page from scratch inspirée très fortement de la structure et de l'expérience de la page Apple MacBook Neo.
* Utiliser uniquement du contenu lié à **ExprimeTaFoi** : vidéos de démonstration, captures de l'application, badges App Store / Google Play, QR code, liens légaux, textes liés à l'application.
* Produire une expérience visuelle spectaculaire avec :

    * GSAP
    * ScrollTrigger
    * sections épinglées
    * animations scrub liées au scroll
    * parallax
    * zooms
    * mouvements du téléphone / mockups
    * reveals cinématiques
    * transitions premium
* Garder une excellente fluidité, y compris sur mobile.
* Privilégier les animations performantes basées sur `transform`, `opacity`, GPU/compositing lorsque pertinent.

Une première version existe déjà.

Cependant, **elle est encore trop éloignée de la qualité, du rythme, de la mise en scène et de la finition de la page Apple de référence** :

https://www.apple.com/fr/macbook-neo/

## OBJECTIF

Je veux maintenant que tu reprennes cette page en profondeur.

Ton objectif n'est PAS de faire quelques petites améliorations.

Ton objectif est de transformer l'existant en une expérience extrêmement premium, immersive et spectaculaire, avec un niveau de finition qui se rapproche autant que raisonnablement possible d'une landing page Apple.

Je veux que lorsque quelqu'un arrive sur la page, sa réaction soit :

> "Waouh. On dirait une vraie page de lancement Apple."

Tu as **carte blanche sur le design, la structure, les animations et la mise en scène**, tant que :

1. le contenu reste cohérent avec ExprimeTaFoi ;
2. l'expérience reste utilisable ;
3. les performances restent bonnes ;
4. le résultat reste responsive ;
5. tu respectes l'architecture et les conventions techniques du projet.

---

# PHASE 1 — AUDIT AVANT DE MODIFIER

Commence impérativement par analyser l'existant.

Inspecte :

* la structure du projet ;
* le framework utilisé ;
* les composants existants ;
* les styles globaux ;
* les assets ;
* les images ;
* les vidéos ;
* les mockups ;
* les fonts disponibles ;
* le code GSAP existant ;
* les ScrollTriggers existants ;
* les breakpoints ;
* le comportement mobile ;
* les éventuels composants réutilisables.

Identifie :

* ce qui est déjà excellent et doit être conservé ;
* ce qui paraît générique ;
* ce qui manque de finition ;
* ce qui casse l'illusion d'une page premium ;
* les animations trop simples ;
* les transitions trop abruptes ;
* les problèmes de proportions ;
* les problèmes de hiérarchie visuelle ;
* les sections trop classiques ;
* les problèmes de rythme vertical ;
* les problèmes de performance éventuels.

Ne repars pas de zéro inutilement si certaines parties sont bonnes.

En revanche, n'hésite PAS à reconstruire entièrement une section si la solution actuelle limite la qualité finale.

---

# PHASE 2 — ÉTUDIER LA PAGE APPLE DE RÉFÉRENCE

Analyse attentivement :

https://www.apple.com/fr/macbook-neo/

Je ne veux pas une inspiration vague.

Je veux que tu étudies précisément les principes de conception utilisés :

* largeur réelle des contenus ;
* espaces blancs ;
* densité des différentes sections ;
* tailles typographiques ;
* progression des titres ;
* alternance texte / visuel ;
* utilisation des grands aplats ;
* sections pleine hauteur ;
* storytelling vertical ;
* moments de respiration ;
* sticky sections ;
* changements de contexte au scroll ;
* animations déclenchées par le scroll ;
* scrub ;
* scale ;
* perspective ;
* apparition/disparition ;
* déplacements subtils ;
* superposition des éléments ;
* changement de fond ;
* utilisation de gros visuels centraux ;
* manière dont Apple guide l'œil ;
* rythme entre les séquences fortes et les séquences calmes.

Cherche à comprendre **pourquoi la page paraît premium**, pas seulement à recopier ses couleurs ou ses marges.

Ne copie évidemment pas les textes, images, marques ou assets Apple.

Nous voulons reprendre **la grammaire visuelle et interactive**, puis la réinterpréter pour ExprimeTaFoi.

---

# PHASE 3 — RECONCEVOIR LE STORYTELLING

Ne te sens pas obligé de conserver l'ordre actuel des sections.

Réorganise la page si nécessaire pour créer une vraie narration.

Je veux une progression de ce type :

### 1. Hero spectaculaire

Une arrivée très forte.

Possibilités :

* téléphone/app au centre ;
* grande typographie ;
* visuel qui apparaît progressivement ;
* profondeur ;
* glow très subtil ;
* zoom contrôlé ;
* mouvement lié au scroll ;
* transition naturelle vers la section suivante.

Le hero ne doit PAS ressembler à un hero SaaS classique.

Pas de simple :

Titre + paragraphe + bouton + image.

Il faut une véritable composition éditoriale.

---

### 2. Séquence immersive / sticky

Créer une séquence où le téléphone ou l'interface devient le protagoniste.

Par exemple :

* téléphone sticky ;
* contenu qui évolue autour de lui ;
* zoom sur l'écran ;
* interfaces qui changent ;
* légendes qui apparaissent ;
* background qui évolue ;
* plusieurs étapes dans une seule séquence de scroll.

Je préfère UNE excellente séquence longue et maîtrisée plutôt que cinq petites animations gadgets.

---

### 3. Découverte des fonctionnalités

Présenter les fonctionnalités avec beaucoup plus de sophistication qu'une simple grille de cartes.

Explorer par exemple :

* grands panneaux pleine largeur ;
* sections asymétriques ;
* grandes typographies ;
* mockups partiellement hors cadre ;
* changement d'échelle ;
* contenu qui entre dans la scène ;
* scrolling narratif.

---

### 4. Section vidéo / démonstration

Mettre réellement en valeur les vidéos existantes.

Possibilités :

* vidéo massive occupant presque tout le viewport ;
* reveal par masque ;
* border-radius qui évolue au scroll ;
* passage d'un bloc contenu à un plein écran ;
* légende minimale ;
* contrôle discret.

---

### 5. Expérience communautaire / sociale

ExprimeTaFoi étant une application autour de la foi et de l'interaction, montrer davantage l'aspect humain.

Créer une section avec beaucoup d'impact visuel.

Elle peut utiliser :

* messages ;
* interactions ;
* témoignages si le contenu existe ;
* cartes de publications ;
* avatars ;
* écrans de l'app ;
* compositions flottantes.

Mais éviter le look "dashboard SaaS".

---

### 6. Installation

Créer une véritable séquence de conversion :

* App Store ;
* Google Play ;
* QR code ;
* téléphone ;
* texte minimal ;
* CTA fort.

Cette section doit paraître premium et non comme un simple footer promotionnel.

---

### 7. Footer

Minimal, élégant, très propre.

Inclure les liens légaux nécessaires.

---

# DIRECTION ARTISTIQUE

Je te donne carte blanche.

Cependant, je veux clairement :

* une esthétique premium ;
* beaucoup d'espace ;
* une excellente typographie ;
* des compositions très nettes ;
* des gradients subtils si nécessaires ;
* des ombres extrêmement contrôlées ;
* un usage intelligent du noir/blanc ;
* une forte mise en avant du contenu ;
* très peu de décoration gratuite.

Évite absolument le look :

* template Tailwind générique ;
* landing page startup 2024 ;
* accumulation de cartes avec border-radius ;
* "glassmorphism partout" ;
* gradients violets génériques ;
* icônes dans des petits carrés ;
* 3 cards alignées puis 3 autres cards ;
* animations identiques sur chaque section.

Je préfère une direction **éditoriale, minimaliste, cinématique et premium**.

---

# MOTION DESIGN

La qualité du motion design est une priorité majeure.

Utilise GSAP / ScrollTrigger intelligemment.

Je veux notamment envisager :

* `pin`
* `scrub`
* timelines GSAP
* `scale`
* `translate3d`
* `opacity`
* clipping / masks
* rotation légère si pertinente
* perspective
* mouvements différenciés entre foreground/background
* transition entre états
* interpolation douce
* séquences synchronisées au scroll

Les animations doivent raconter quelque chose.

Ne mets PAS un `fade-in-up` générique partout.

Chaque grande section doit avoir son identité.

---

# IMPORTANT — SCROLL

Le scroll doit être pensé comme un scénario.

Je veux que tu analyses la page comme une succession de scènes.

Exemple :

SCÈNE 1
Introduction.

SCÈNE 2
Le téléphone devient dominant.

SCÈNE 3
Zoom dans l'expérience.

SCÈNE 4
Transition vers une fonctionnalité.

SCÈNE 5
Changement d'ambiance.

SCÈNE 6
Démonstration.

SCÈNE 7
Conversion.

Les transitions entre ces scènes sont aussi importantes que les scènes elles-mêmes.

---

# RESPONSIVE

Ne fais surtout pas simplement :

Desktop magnifique → `@media` → tout empilé verticalement.

Le mobile doit lui aussi avoir une vraie direction artistique.

Adapte si nécessaire :

* amplitude des animations ;
* longueur des pins ;
* dimension des visuels ;
* trajectoires ;
* scrub ;
* titres ;
* ordre des éléments ;
* densité.

Sur les appareils plus faibles, réduis intelligemment certains effets plutôt que de dégrader toute l'expérience.

---

# PERFORMANCE

Je veux une page spectaculaire MAIS fluide.

Vise une sensation proche de 60 fps sur un smartphone récent.

Privilégie :

* `transform`
* `opacity`
* compositing GPU
* `will-change` uniquement lorsque pertinent
* lazy loading
* dimensions d'images adaptées
* preload uniquement des ressources essentielles
* code splitting si pertinent
* vidéos optimisées
* animations conditionnelles suivant le viewport
* nettoyage correct des ScrollTriggers
* `matchMedia()` GSAP si nécessaire

Évite les animations fréquentes de propriétés provoquant des layouts coûteux.

Ne transforme pas non plus tout en layer GPU sans raison.

---

# ACCESSIBILITÉ

Respecte :

`prefers-reduced-motion`

Si activé :

* désactive ou simplifie les séquences scrub ;
* évite les gros parallax ;
* conserve une navigation claire ;
* assure que tout le contenu reste accessible.

---

# QUALITÉ TECHNIQUE

Le code doit rester :

* lisible ;
* maintenable ;
* structuré ;
* factorisé lorsqu'utile ;
* cohérent avec le projet.

Ne crée pas une abstraction complexe uniquement pour une animation utilisée une fois.

Sépare proprement :

* structure ;
* styles ;
* logique d'animation.

Les animations complexes doivent avoir des noms ou fonctions compréhensibles.

---

# UTILISATION DES ASSETS

Avant d'inventer du contenu, cherche dans le projet tout ce qui existe déjà :

* screenshots ;
* mockups ;
* logos ;
* vidéos ;
* images ;
* icônes ;
* QR code ;
* badges store.

Réutilise autant que possible les vrais contenus ExprimeTaFoi.

S'il manque un élément graphique que tu peux construire en HTML/CSS de manière élégante, fais-le.

Ne mets pas de faux lorem ipsum.

---

# TU PEUX AJOUTER DES CHOSES

Tu as explicitement l'autorisation :

* d'ajouter des sections ;
* d'en supprimer ;
* d'en fusionner ;
* de changer complètement leur ordre ;
* de créer de nouveaux layouts ;
* de créer de nouveaux composants ;
* de modifier les transitions ;
* de modifier les tailles ;
* de revoir toute la hiérarchie ;
* de créer de nouvelles animations ;
* d'améliorer la navbar ;
* d'améliorer le footer ;
* d'améliorer les CTA ;
* d'ajouter des petits détails interactifs.

Si une idée améliore nettement l'expérience, fais-la.

Ne sois pas conservateur.

---

# PROCESSUS D'EXÉCUTION

Ne te contente pas d'expliquer ce que tu pourrais faire.

**MODIFIE DIRECTEMENT LE CODE.**

Procède ainsi :

1. inspecter tout le code actuel ;
2. comprendre ce qui a été fait ;
3. analyser la page Apple de référence ;
4. définir mentalement le nouveau storytelling ;
5. identifier les composants à conserver ;
6. reconstruire les sections faibles ;
7. améliorer le motion design ;
8. optimiser le responsive ;
9. optimiser les performances ;
10. vérifier les éventuelles erreurs console ;
11. vérifier que les animations ne produisent pas de layout shift ;
12. vérifier que les ScrollTriggers sont correctement détruits/recréés ;
13. vérifier le comportement après resize ;
14. tester plusieurs largeurs d'écran ;
15. corriger les détails jusqu'à obtenir un résultat cohérent.

---

# IMPORTANT : NE T'ARRÊTE PAS TROP TÔT

Une première passe correcte n'est pas suffisante.

Après avoir terminé une première implémentation :

reprends la page avec un regard critique.

Pose-toi systématiquement ces questions :

* Est-ce réellement spectaculaire ?
* Est-ce que ça pourrait apparaître sur apple.com sans paraître amateur ?
* Est-ce que certaines sections ressemblent encore à un template ?
* Est-ce que les espaces sont suffisamment maîtrisés ?
* Est-ce que la typo a suffisamment d'impact ?
* Est-ce qu'il y a un vrai rythme visuel ?
* Est-ce que les transitions sont naturelles ?
* Est-ce que certaines animations semblent gadgets ?
* Est-ce que les visuels sont assez grands ?
* Est-ce que le storytelling est évident sans lire tous les textes ?
* Est-ce que le téléphone/app est suffisamment mis en scène ?
* Est-ce que le mobile reste impressionnant ?
* Est-ce que quelque chose peut encore être simplifié ?

Puis effectue une **deuxième passe de polish**.

Corrige les petits détails :

* alignements ;
* gaps ;
* padding ;
* line-height ;
* font-size ;
* timing ;
* easing ;
* début et fin des ScrollTriggers ;
* overscroll ;
* transitions de background ;
* cohérence des border-radius ;
* largeur des textes ;
* position des mockups ;
* vitesse des animations.

---

# PRIORITÉS

En cas de compromis, utilise cet ordre :

1. qualité visuelle ;
2. storytelling ;
3. fluidité des animations ;
4. responsive ;
5. performance ;
6. propreté du code ;
7. vitesse d'implémentation.

Le but n'est PAS de finir vite.

Le but est d'obtenir la meilleure page possible.

---

# CRITÈRE FINAL

Je veux une transformation importante et visible par rapport à la version actuelle.

Ne fais pas seulement 10 % d'amélioration.

Cherche plutôt une amélioration de **50 à 100 % du ressenti global**.

Je veux :

* de la surprise ;
* de la profondeur ;
* du rythme ;
* des moments "wow" ;
* des animations très propres ;
* des détails subtils ;
* une sensation extrêmement premium.

Utilise tout ton savoir-faire de frontend engineer + motion designer + UI designer.

Tu as carte blanche.

**Va aussi loin que techniquement raisonnable pour faire de cette page la vitrine premium d'ExprimeTaFoi.**
