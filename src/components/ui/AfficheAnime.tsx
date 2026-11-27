import type { PointerEvent } from "react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion"
import type { Anime } from "@/data/loisirs"

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]

/** Inclinaison maximale de l'affiche sous le pointeur, en degrés. */
const INCLINAISON = 12

/**
 * Entrée d'une affiche : elle se dévoile de bas en haut pendant que l'image,
 * un peu zoomée, se pose. Sous « réduire les animations », un simple fondu.
 */
const entree = (reduit: boolean | null): Variants =>
  reduit
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, y: 24, clipPath: "inset(100% 0% 0% 0%)" },
        visible: { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.7, ease: EASE_OUT } },
      }

const pose = (reduit: boolean | null): Variants =>
  reduit ? {} : { hidden: { scale: 1.15 }, visible: { scale: 1, transition: { duration: 1.2, ease: EASE_OUT } } }

const cascade: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}

/**
 * Affiche cliquable. À la souris, elle s'incline vers le pointeur sur un
 * ressort et un reflet suit le curseur ; au doigt, elle reste à plat et son
 * titre est affiché d'office, puisqu'aucun survol ne viendrait le révéler.
 */
function AfficheAnime({ anime, onClic }: { anime: Anime; onClic: (anime: Anime) => void }) {
  const reduit = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const ressort = { stiffness: 100, damping: 10 }
  const rotateY = useSpring(useTransform(px, [0, 1], [-INCLINAISON, INCLINAISON]), ressort)
  const rotateX = useSpring(useTransform(py, [0, 1], [INCLINAISON, -INCLINAISON]), ressort)
  const refletX = useTransform(px, (v) => `${v * 100}%`)
  const refletY = useTransform(py, (v) => `${v * 100}%`)
  const reflet = useMotionTemplate`radial-gradient(circle at ${refletX} ${refletY}, rgb(255 255 255 / 0.28), transparent 55%)`

  const suivre = (e: PointerEvent<HTMLButtonElement>) => {
    if (reduit || e.pointerType !== "mouse") return
    const cadre = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - cadre.left) / cadre.width)
    py.set((e.clientY - cadre.top) / cadre.height)
  }
  const relacher = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.li variants={entree(reduit)} className="w-28 shrink-0 snap-start [perspective:800px] sm:w-auto">
      <motion.button
        type="button"
        onClick={() => onClic(anime)}
        onPointerMove={suivre}
        onPointerLeave={relacher}
        style={{ rotateX, rotateY }}
        whileHover={reduit ? undefined : { y: -6 }}
        whileTap={{ scale: 0.97 }}
        className="group relative block aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted shadow-md ring-1 ring-foreground/10 transition-shadow duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <motion.img
          variants={pose(reduit)}
          src={anime.affiche}
          alt={anime.nom}
          width={320}
          height={453}
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
        {/* Reflet qui suit la souris ; invisible au doigt. */}
        <motion.span
          aria-hidden="true"
          style={{ background: reflet }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/50 to-transparent px-2 pb-2 pt-8 text-left text-xs font-medium leading-tight text-white transition-[opacity,translate] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
        >
          {anime.nom}
        </span>
      </motion.button>
    </motion.li>
  )
}

/**
 * Rangée d'affiches en cascade. Elle se déclenche quand elle entre elle-même à
 * l'écran, pas avec la section. Mobile : une bande qui défile au doigt ; dès
 * `sm`, les cinq affiches tiennent sur une ligne.
 */
export function RangeeAffiches({ titres, label, onClic }: { titres: Anime[]; label: string; onClic: (anime: Anime) => void }) {
  return (
    <motion.ul
      aria-label={label}
      variants={cascade}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="-mx-5 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-5 sm:overflow-visible sm:px-0 sm:pb-0"
    >
      {titres.map((anime) => (
        <AfficheAnime key={anime.idAnilist} anime={anime} onClic={onClic} />
      ))}
    </motion.ul>
  )
}
