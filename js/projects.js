/* ==========================================================================
   Données du site — modifie ici, tout le reste se met à jour tout seul
   (grille d'accueil, pages projet, footer).
   ========================================================================== */

window.SITE = {
  name: 'Yao',
  // ⚠️ À REMPLACER par ton adresse : c'est la destination du formulaire de contact (mailto:)
  email: 'contact@example.com',
  github: 'https://github.com/ManuYao',
  instagram: 'https://www.instagram.com/yao.webp/',
  instagramHandle: '@yao.webp',
};

/*
  cover  : image du bandeau de la page projet + sous-titre « découpé » (si pas de maskBg)
  hover  : image (sans texte) qui apparaît au survol de la carte
  dim    : luminosité de cette image au survol (0.4 = très sombre, pour les captures claires)
  mask   : [x, y] zone visible dans le sous-titre « découpé » (en %) — garde x entre 25 et 75,
           la dérive anime ±22 % autour de cette valeur sans sortir de l'image
  maskBg : (optionnel) dégradé à la place de l'image, quand la capture est trop sombre pour ressortir
  pos    : cadrage de l'image qui s'affiche au survol de la carte
  gallery: lignes d'images ; phones:true => défilement horizontal sur mobile
*/
window.PROJECTS = [
  {
    slug: 'flex-timer',
    n: '01',
    title: 'Flex Timer',
    tag: 'Chrono sportif.',
    kind: 'App Android · Bêta privée',
    year: '2026',
    status: 'Bêta privée',
    type: 'Application mobile',
    cover: 'assets/img/covers/flex-timer.webp',
    hover: 'assets/img/hover/flex-timer.webp',
    dim: 0.9,
    // les 5 couleurs des chronos : AMRAP · TABATA · EMOM · MIX · BASIC
    maskBg: 'linear-gradient(90deg,#ff4a3d,#ffa012,#2ed47a,#7a5cff,#f1f1f1,#ff4a3d)',
    mask: ['50%', '50%'],
    pos: '70% 50%',          // cadrage du bandeau de la page projet
    intro: 'Cinq chronos, cinq couleurs : le chrono change de couleur, ta séance aussi.',
    description: [
      'Flex Timer est une application de chronométrage sportif, faite par un sportif pour les sportifs. Cinq chronos — AMRAP, BASIC, EMOM, TABATA et MIX — couvrent la muscu, le street workout, la course, le HIIT ou la boxe. Un mode, une couleur, un rythme.',
      'Gratuite et sans pub, elle tourne en arrière-plan écran éteint et reste utilisable les mains mouillées grâce au « mode pluie ». L’application est en bêta privée sur Android.',
    ],
    features: [
      'MIX builder : enchaîne exercices et modes, partage la séance par lien ou publie-la dans un fil public (tests, notes, commentaires)',
      'Planning hebdomadaire des exercices (charges, séries, repos)',
      'Historique et statistiques : volume, régularité, temps sous tension',
      'Trophées par mode, du bronze à l’or',
      'Coach vocal qui annonce les phases, en version courte ou détaillée',
      'Mode pluie : appui long pour éviter les faux appuis',
    ],
    stack: ['React Native', 'Expo', 'expo-router', 'Reanimated', 'react-native-svg', 'Supabase', 'EAS Update'],
    links: [
      { label: 'Voir le site', url: 'https://flextimer.fit/' },
      { label: 'Code source', url: 'https://github.com/ManuYao/YFlex_Time', ghost: true },
    ],
    gallery: [
      {
        phones: true,
        items: [
          { src: 'assets/img/flex-timer/amrap.jpg', alt: 'Flex Timer — mode AMRAP', caption: 'AMRAP' },
          { src: 'assets/img/flex-timer/basic.jpg', alt: 'Flex Timer — mode BASIC', caption: 'BASIC' },
          { src: 'assets/img/flex-timer/emom.jpg', alt: 'Flex Timer — mode EMOM', caption: 'EMOM' },
          { src: 'assets/img/flex-timer/tabata.jpg', alt: 'Flex Timer — mode TABATA', caption: 'TABATA' },
          { src: 'assets/img/flex-timer/mix.jpg', alt: 'Flex Timer — mode MIX', caption: 'MIX' },
        ],
      },
    ],
  },
  {
    slug: 'noctune',
    n: '02',
    title: 'Noctune',
    tag: 'Écoute ensemble.',
    kind: 'PWA · Temps réel',
    year: '2026',
    status: 'En développement',
    type: 'Web app · PWA',
    cover: 'assets/img/covers/noctune.webp',
    hover: 'assets/img/hover/noctune.webp',
    dim: 0.8,
    // néons de la room : rose → violet → cyan
    maskBg: 'linear-gradient(90deg,#ff2d8a,#9b5cff,#35d4ff,#ff2d8a)',
    mask: ['50%', '50%'],
    pos: '50% 40%',
    intro: 'Rejoins une room, écoute le même morceau que tout le monde, vote, discute.',
    description: [
      'Noctune est une plateforme musicale communautaire en PWA. On entre dans une room publique, on écoute le même morceau au même moment, on vote pour la suite et on discute. Pas de compte obligatoire : un pseudo, un avatar, et c’est parti.',
      'Tout l’univers est illustré façon club de nuit — néons, DJ, avatars — et la synchronisation passe par un serveur temps réel. Le projet est en cours de développement ; les visuels de la galerie sont des maquettes.',
    ],
    features: [
      'Rooms d’écoute collective synchronisées en temps réel',
      'File DJ et votes sur les morceaux',
      'Chat dans chaque room',
      'Profil léger : pseudo + avatar, comptes optionnels',
      'Installable comme une app grâce à la PWA',
    ],
    stack: ['React 19', 'Vite', 'TypeScript', 'vite-plugin-pwa', 'Node.js', 'Socket.IO', 'PostgreSQL'],
    links: [
      { label: 'Voir le site', url: 'https://noctune-1.onrender.com' },
      { label: 'Code source', url: 'https://github.com/ManuYao/Noctune', ghost: true },
    ],
    gallery: [
      { items: [{ src: 'assets/img/noctune/banner-entree.webp', alt: 'Noctune — écran d’entrée', caption: 'Maquette — l’entrée' }] },
      {
        items: [
          { src: 'assets/img/noctune/banner-room.webp', alt: 'Noctune — une room', caption: 'Maquette — une room' },
          { src: 'assets/img/noctune/banner-rooms.webp', alt: 'Noctune — liste des rooms', caption: 'Maquette — les rooms' },
        ],
      },
    ],
  },
  {
    slug: 'yao-webp',
    n: '03',
    title: 'yao.webp',
    tag: 'Galerie infinie.',
    kind: 'Site photo · JavaScript vanilla',
    year: '2026',
    status: 'En ligne',
    type: 'Site portfolio photo',
    cover: 'assets/img/covers/yao-webp.webp',
    hover: 'assets/img/hover/yao-webp.webp',
    dim: 0.55,
    mask: ['58%', '88%'],
    pos: '50% 60%',
    intro: 'Une photo qui suit le curseur, puis une galerie sans fin à explorer, zoomer et réorganiser.',
    description: [
      'yao.webp est mon portfolio photo. Une landing immersive où une photo suit la souris, puis une galerie infinie : on glisse pour se déplacer, on zoome à la molette ou au pincement, et les photos se superposent sur plusieurs plans pour donner de la profondeur.',
      'Tout est écrit à la main, sans framework : HTML, CSS et JavaScript vanilla, avec des photos au format WebP. Des mises en page dédiées existent pour le mobile.',
    ],
    features: [
      'Intro : un flash et une séquence rapide de photos aux tons proches qui se fondent dans la landing (passable d’un clic)',
      'Galerie infinie : déplacement par glisser, zoom molette / pincement',
      'Effet de profondeur : les photos se chevauchent sur plusieurs plans',
      'Clic sur une photo pour la déplacer ou la redimensionner',
      'Versions mobiles dédiées de la landing et de la galerie',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript vanilla', 'WebP', 'Big Shoulders Display', 'Space Grotesk', 'GitHub Pages'],
    links: [
      { label: 'Voir le site', url: 'https://manuyao.github.io/yao.webp/' },
      { label: 'Code source', url: 'https://github.com/ManuYao/yao.webp', ghost: true },
      { label: 'Instagram', url: 'https://www.instagram.com/yao.webp/', ghost: true },
    ],
    gallery: [
      { items: [{ src: 'assets/img/yao-webp/landing-desktop.webp', alt: 'yao.webp — landing sur ordinateur', caption: 'Landing' }] },
      {
        items: [
          { src: 'assets/img/yao-webp/galerie-vue-densemble.webp', alt: 'yao.webp — vue d’ensemble de la galerie', caption: 'Galerie — vue d’ensemble' },
          { src: 'assets/img/yao-webp/galerie-zoom.webp', alt: 'yao.webp — galerie zoomée', caption: 'Galerie — zoom' },
        ],
      },
      {
        phones: true,
        max: '560px',
        items: [
          { src: 'assets/img/yao-webp/landing-mobile.webp', alt: 'yao.webp — landing sur mobile', caption: 'Landing mobile' },
          { src: 'assets/img/yao-webp/galerie-mobile.webp', alt: 'yao.webp — galerie sur mobile', caption: 'Galerie mobile' },
        ],
      },
    ],
  },
  {
    slug: 'taxi-vsl',
    n: '04',
    title: 'Taxi & VSL',
    tag: 'Réservation en ligne.',
    kind: 'Site + espace chauffeur · Next.js',
    year: '2026',
    status: 'Template en cours',
    type: 'Site vitrine & back-office',
    cover: 'assets/img/covers/taxi-vsl.webp',
    hover: 'assets/img/hover/taxi-vsl.webp',
    dim: 0.4,
    maskBg: 'linear-gradient(90deg,#27c485,#c9f5de,#27c485,#f4f1ec,#27c485)',
    mask: ['50%', '50%'],
    pos: '62% 55%',
    intro: 'Un site de taxi / VSL réutilisable : réservation avec estimation de prix et espace chauffeur.',
    description: [
      'Un site complet pour une entreprise de taxi, avec transport médical conventionné (VSL) et VTC, pensé comme un template réutilisable : nom, téléphone, communes, tarifs et mentions légales vivent dans un seul fichier de configuration.',
      'Côté client, une réservation en ligne affiche une estimation de prix calculée sur la distance et la durée réelles. Côté chauffeur, un espace dédié gère les courses, le planning, la caisse et les notifications.',
    ],
    features: [
      'Pages publiques : accueil, une page par commune, mentions légales, confidentialité',
      'Réservation en ligne avec prix estimé avant validation',
      'Espace chauffeur : courses, planning, caisse, notifications push',
      'Gestion d’équipe, disponibilités, promotions et paiements',
      'Anti-spam Cloudflare Turnstile, alertes Telegram, e-mails Resend',
    ],
    stack: ['Next.js', 'Supabase', 'OpenRouteService', 'Cloudflare Turnstile', 'Resend', 'Web Push'],
    links: [{ label: 'Code source', url: 'https://github.com/ManuYao/taxi-vsl-site-x', ghost: false }],
    gallery: [
      { items: [{ src: 'assets/img/covers/taxi-vsl.webp', alt: 'Maquette du site taxi — véhicule et estimation de prix', caption: 'Maquette — la page d’accueil' }] },
    ],
  },
  {
    slug: 'bedonline',
    n: '05',
    title: 'BedOnline',
    tag: 'Plugin Minecraft.',
    kind: 'Plugin Spigot · Java',
    year: '2020',               // date du premier commit du dépôt
    status: 'Dépôt privé',
    type: 'Plugin Minecraft',
    cover: 'assets/img/covers/bedonline.webp',
    hover: 'assets/img/covers/bedonline.webp',
    dim: 0.5,
    mask: ['50%', '50%'],
    pos: '50% 50%',
    intro: 'Un petit plugin pour les serveurs de survie en ligne : quand un joueur va dormir, un message l’annonce.',
    description: [
      'BedOnline est un plugin pour serveurs Minecraft de survie en ligne. Quand un joueur se met dans un lit, un message en doré « pseudo veut dormir » est envoyé, à condition qu’au moins deux joueurs soient connectés.',
      'Écrit en Java avec l’API Spigot (Bukkit 1.13), c’est un projet volontairement léger : une classe principale qui enregistre un écouteur sur l’événement d’entrée dans un lit, et des messages de démarrage et d’arrêt dans la console du serveur. Le dépôt est privé.',
    ],
    features: [
      'Écoute l’événement PlayerBedEnterEvent de l’API Spigot',
      'Message en doré « pseudo veut dormir » dans le chat',
      'Ne se déclenche qu’à partir de deux joueurs connectés',
      'Messages de démarrage et d’arrêt dans la console du serveur',
    ],
    stack: ['Java', 'Spigot', 'Bukkit API 1.13', 'IntelliJ IDEA'],
    links: [],                  // dépôt privé : pas de lien public vers le code
    gallery: [],
  },
  {
    slug: 'smrp',
    n: '06',
    title: 'SmRP',
    tag: 'PNJ de troc.',
    kind: 'Plugin Spigot · Java',
    year: '2020',               // premier commit : février 2020, dernier : septembre 2020
    status: 'Prototype',
    type: 'Plugin Minecraft · semi-RP',
    cover: 'assets/img/covers/smrp.webp',
    hover: 'assets/img/covers/smrp.webp',
    dim: 0.45,
    mask: ['50%', '60%'],
    pos: '50% 62%',
    intro: 'Un PNJ de troc pour serveur de survie : échanger une ressource contre une autre, sans passer par la mine.',
    description: [
      'SmRP est un plugin Minecraft de survie semi-RP, imaginé pour le serveur local que je partageais avec des amis. L’idée : un PNJ qu’il faut mériter, avec des ressources précises pour le faire apparaître, et qui s’ouvre comme une boutique. On y échange une ressource contre une autre, à des taux fixes, pour avoir ses outils plus vite au lieu d’aller miner.',
      'C’est un projet de 2020, resté à l’état de prototype : l’invocation du PNJ et le squelette du menu sont codés, mais les échanges eux-mêmes n’ont pas été implémentés.',
    ],
    features: [
      'Commande /smrp : fait apparaître le PNJ (un villageois sans IA, nom visible, cloche sur la tête) contre 30 blocs de diamant',
      'Clic droit sur le PNJ : ouvre un menu personnalisé de 36 cases, avec son et fumée',
      'Clic droit avec une horloge : affiche un « niveau de vie » de 1 à 5 selon l’heure de la journée',
      'Tuer le PNJ fait tomber 15 blocs de diamant',
      'Titres, sons et messages colorés en français pour guider le joueur',
    ],
    stack: ['Java', 'Spigot 1.15', 'Bukkit API', 'IntelliJ IDEA'],
    links: [{ label: 'Code source', url: 'https://github.com/ManuYao/SmRP' }],
    gallery: [],
  },
];
