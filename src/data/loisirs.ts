import type { Bilingue } from "@/lib/langue"

export type Loisir = {
  nom: string
  /** Slug Simple Icons, utilisé si aucune `iconUrl` n'est fournie. */
  slug: string
  iconUrl?: string
  /** Logo noir : blanchi en thème sombre. */
  sombre?: boolean
  url: string
  /** Studio, genre ou rôle, en une ligne. */
  detail: Bilingue
  /** Pourquoi il est là : c'est ce texte qui évite la liste générique. */
  pourquoi: Bilingue
}

export type Parrainage = {
  nom: string
  code: string
  iconUrl: string
  url?: string
  detail: Bilingue
  pourquoi: Bilingue
  avantage: Bilingue
}

const ICONES = "/icons/loisirs"

/** Un animé cité : son affiche (AniList, réduite en webp) et sa fiche AniList. */
export type Anime = { nom: string; idAnilist: number; affiche: string }

const anime = (nom: string, idAnilist: number, fichier: string): Anime => ({
  nom,
  idAnilist,
  affiche: `/affiches/${fichier}.webp`,
})

/**
 * Chiffres et titres relevés sur AniList (profil Kaysuto) en novembre 2026,
 * arrondis vers le bas pour ne pas vieillir trop vite. Les titres cités sont
 * notés 10/10 ou en cours de visionnage ; ceux abandonnés ou mal notés n'y ont
 * pas leur place.
 */
export const ANIMES: {
  texte: Bilingue
  profil: string
  chiffres: { valeur: string; libelle: Bilingue }[]
  genres: { titre: Bilingue; texte: Bilingue; titres: Anime[] }[]
} = {
  texte: {
    fr: "Otaku, et je l'assume : l'essentiel de mon temps libre se partage entre les animés et le code. Plus des deux tiers de ce que je regarde, c'est de la fantasy, et la magie revient dans plus d'une série sur deux.",
    en: "I'm an otaku and proud of it: most of my free time is split between anime and code. Over two thirds of what I watch is fantasy, and magic shows up in more than one series out of two.",
  },
  profil: "https://anilist.co/user/Kaysuto/",
  chiffres: [
    { valeur: "440+", libelle: { fr: "animés", en: "anime" } },
    { valeur: "8 300+", libelle: { fr: "épisodes", en: "episodes" } },
    { valeur: "3 300 h", libelle: { fr: "de visionnage", en: "watched" } },
  ],
  genres: [
    {
      titre: { fr: "Isekai et fantasy", en: "Isekai and fantasy" },
      texte: {
        fr: "Plus de 160 isekai au compteur. Un monde de magie, de guildes et de niveaux, et un héros qui doit en comprendre les règles pour s'en sortir.",
        en: "Over 160 isekai so far. A world of magic, guilds and levels, and a hero who has to learn its rules to survive.",
      },
      titres: [
        anime("Mushoku Tensei", 108465, "mushoku-tensei"),
        anime("The Rising of the Shield Hero", 99263, "the-rising-of-the-shield-hero"),
        anime("KONOSUBA", 21202, "konosuba"),
        anime("The Eminence in Shadow", 130298, "the-eminence-in-shadow"),
        anime("So I'm a Spider, So What?", 103632, "so-i-m-a-spider-so-what"),
      ],
    },
    {
      titre: { fr: "Futuriste, avec de la magie", en: "Futuristic, with magic" },
      texte: {
        fr: "J'en regarde moins, mais c'est le genre que je note le mieux : des héros réincarnés aux commandes d'un vaisseau ou à la tête d'un empire galactique, et des mondes virtuels qui deviennent réels.",
        en: "I watch fewer of these, but it's the genre I rate highest: heroes reborn at the helm of a starship or at the head of a galactic empire, and virtual worlds that turn real.",
      },
      titres: [
        anime("Reborn as a Space Mercenary", 186541, "reborn-as-a-space-mercenary"),
        anime("I'm the Evil Lord of an Intergalactic Empire!", 183274, "evil-lord-intergalactic-empire"),
        anime("Sword Art Online", 11757, "sword-art-online"),
        anime("Shangri-La Frontier", 151970, "shangri-la-frontier"),
        anime("Overgeared", 212888, "overgeared"),
      ],
    },
  ],
}

export const JEUX: { texte: Bilingue; liste: Loisir[] } = {
  texte: {
    fr: "Surtout des jeux qui récompensent la régularité : un monde qu'on construit, un geste qu'on répète jusqu'à la précision, une base qu'on optimise.",
    en: "Mostly games that reward consistency: a world you build, a motion you repeat until it's precise, a base you optimize.",
  },
  liste: [
    {
      nom: "Minecraft",
      slug: "minecraft",
      iconUrl: `${ICONES}/minecraft.png`,
      url: "https://www.minecraft.net/fr-fr",
      detail: { fr: "Java Edition", en: "Java Edition" },
      pourquoi: {
        fr: "Le jeu auquel je joue depuis le plus longtemps, et celui pour lequel je code le plus : le serveur Clover Games et son launcher viennent de là.",
        en: "The game I've played the longest, and the one I code for the most: the Clover Games server and its launcher came from it.",
      },
    },
    {
      nom: "osu!lazer",
      slug: "osu",
      url: "https://osu.ppy.sh",
      detail: { fr: "Jeu de rythme open source", en: "Open source rhythm game" },
      pourquoi: {
        fr: "La réécriture open source d'osu!. Viser des cercles en rythme, c'est de la précision pure, et c'est un jeu dont je peux lire le code sur GitHub.",
        en: "The open source rewrite of osu!. Hitting circles on the beat is pure precision, and it's a game whose code I can read on GitHub.",
      },
    },
    {
      nom: "Arknights: Endfield",
      slug: "endfield",
      iconUrl: `${ICONES}/endfield.png`,
      sombre: true,
      url: "https://endfield.gryphline.com",
      detail: { fr: "RPG · Gryphline, 2026", en: "RPG · Gryphline, 2026" },
      pourquoi: {
        fr: "Des chaînes de production automatisées à monter sur Talos-II : optimiser un flux d'usine, c'est presque de l'infra en jeu.",
        en: "Automated production lines to build on Talos-II: tuning a factory flow is almost infrastructure work in a game.",
      },
    },
    {
      nom: "Neverness to Everness",
      slug: "nte",
      iconUrl: `${ICONES}/nte.png`,
      url: "https://nte.perfectworld.com",
      detail: { fr: "RPG en monde ouvert · Hotta Studio, 2026", en: "Open-world RPG · Hotta Studio, 2026" },
      pourquoi: {
        fr: "Une ville moderne en monde ouvert, où le surnaturel déborde sur le quotidien.",
        en: "An open-world modern city where the supernatural spills into everyday life.",
      },
    },
    {
      nom: "Hogwarts Legacy",
      slug: "hogwartslegacy",
      iconUrl: `${ICONES}/hogwarts-legacy.png`,
      url: "https://www.hogwartslegacy.com",
      detail: { fr: "RPG en monde ouvert · Avalanche Software", en: "Open-world RPG · Avalanche Software" },
      pourquoi: {
        fr: "Poudlard et ses environs à explorer librement, en apprenant la magie sort après sort.",
        en: "Hogwarts and its surroundings to explore freely, learning magic one spell at a time.",
      },
    },
  ],
}

export const CRYPTO: { texte: Bilingue; parrainage: Parrainage; anime: Anime & { texte: Bilingue }; avertissement: Bilingue } = {
  texte: {
    fr: "Ma conviction, c'est Ethereum, que je garde en bonne partie sur Base, la couche 2 de Coinbase, pour des frais bien plus bas. Ce que je garde sur la durée ne reste pas sur une plateforme : il est sur un portefeuille dont je tiens les clés.",
    en: "My conviction is Ethereum, which I keep largely on Base, Coinbase's layer 2, for much lower fees. What I hold for the long run doesn't sit on a platform: it's in a wallet whose keys I own.",
  },
  parrainage: {
    nom: "Tangem",
    code: "Y5C6GW",
    iconUrl: `${ICONES}/tangem.png`,
    url: "https://tangem.com/fr/",
    detail: { fr: "Portefeuille matériel en carte", en: "Card hardware wallet" },
    pourquoi: {
      fr: "Des cartes NFC qui gardent mes clés hors ligne, sans phrase de récupération à recopier, et qui gèrent Ethereum comme Base.",
      en: "NFC cards that keep my keys offline, with no recovery phrase to write down, and that handle both Ethereum and Base.",
    },
    avantage: {
      fr: "10 % de réduction avec mon code, à saisir au paiement.",
      en: "10% off with my code, entered at checkout.",
    },
  },
  anime: {
    ...anime("FX Fighter Kurumi-chan", 206401, "fx-fighter-kurumi-chan"),
    texte: {
      fr: "L'animé que je suis en ce moment sur le sujet : une étudiante se lance dans le trading forex, entre pertes latentes et stop-loss.",
      en: "The anime I'm following right now on the subject: a student gets into forex trading, between unrealized losses and stop-losses.",
    },
  },
  avertissement: {
    fr: "Publicité : c'est un code de parrainage, je reçois une récompense pour chaque portefeuille acheté avec. Rien ici n'est un conseil en investissement : les crypto-actifs sont très volatils et tu peux perdre tout ce que tu y places.",
    en: "Advertising: this is a referral code, and I get a reward for every wallet bought with it. Nothing here is investment advice: crypto-assets are highly volatile and you can lose everything you put in.",
  },
}
