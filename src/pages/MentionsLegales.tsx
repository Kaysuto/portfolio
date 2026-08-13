import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ShieldCheck, Scale, Globe, Lock } from "lucide-react"
import { Link } from "react-router-dom"
import { useSeo } from "@/hooks/useSeo"

export default function MentionsLegales() {
  useSeo({
    title: "Kimiya - Mentions légales",
    description: "Mentions légales et politique de confidentialité du portfolio de Kimiya.",
    path: "/legal-notice",
  });
  return (
    <div className="min-h-screen relative flex flex-col">
      <div className="flex-1 pt-32 pb-20 px-6 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/">
            <Button variant="ghost" className="mb-8 text-muted-foreground hover:text-accent-texte">
              <ArrowLeft />
              Retour à l'accueil
            </Button>
          </Link>

          <div className="space-y-8">
            <header className="border-b border-border/50 pb-8">
              <h1 className="text-4xl md:text-5xl font-semibold mb-4">
                Mentions <span className="text-accent-texte">Légales</span>
              </h1>
              <p className="text-sm text-muted-foreground">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </header>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Éditeur */}
              <section className="space-y-4">
                <div className="flex items-center gap-3 text-accent-texte">
                  <Scale className="size-5" />
                  <h2 className="font-mono text-xs font-medium uppercase tracking-[0.25em]">Éditeur</h2>
                </div>
                <div className="bg-card rounded-lg ring-1 ring-foreground/10 p-6 space-y-5">
                  <div>
                    <p className="text-base font-medium">Kimiya</p>
                    <p className="text-sm text-muted-foreground">Entrepreneur individuel</p>
                  </div>
                  <div className="space-y-1 pt-4 border-t border-border/50">
                    <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-texte/70">Identifiants</p>
                    <p className="text-base">SIRET : <span className="text-foreground">91450990600022</span></p>
                    <p className="text-base">TVA : <span className="text-foreground">FR63914509906</span></p>
                    <p className="text-base">APE : <span className="text-foreground">6201Z (Programmation informatique)</span></p>
                  </div>
                  <div className="space-y-1 pt-4 border-t border-border/50">
                    <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-texte/70">Contact</p>
                    <p className="text-base">
                      Email : <a href="mailto:contact@kaysuto.fr" className="text-accent-texte hover:underline">contact@kaysuto.fr</a>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Directeur de publication : <span className="text-foreground">Kimiya</span>
                    </p>
                  </div>
                </div>
              </section>

              {/* Hébergement */}
              <section className="space-y-4">
                <div className="flex items-center gap-3 text-accent-texte">
                  <Globe className="size-5" />
                  <h2 className="font-mono text-xs font-medium uppercase tracking-[0.25em]">Hébergement</h2>
                </div>
                <div className="bg-card rounded-lg ring-1 ring-foreground/10 p-6 space-y-6">
                  <div>
                    <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-texte/70 mb-2">Plateforme</p>
                    <p className="text-base font-medium">Vercel Inc.</p>
                    <p className="text-sm text-muted-foreground">340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
                    <p className="text-sm text-muted-foreground mt-1">DPO Europe : c/o EDPO, Avenue Huart Hamoir 71, 1030 Bruxelles, Belgique</p>
                  </div>
                  <div className="pt-4 border-t border-border/50">
                    <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-texte/70 mb-2">Base de données &amp; Backend</p>
                    <p className="text-base font-medium">Supabase Inc.</p>
                    <p className="text-sm text-muted-foreground">65 Chulia Street #38-02/03, OCBC Centre, Singapore 049513</p>
                    <p className="text-sm text-muted-foreground mt-1">Données stockées dans la région EU (Frankfurt, AWS eu-central-1)</p>
                  </div>
                </div>
              </section>
            </div>


{/* Données personnelles & RGPD */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-accent-texte">
                <Lock className="size-5" />
                <h2 className="font-mono text-xs font-medium uppercase tracking-[0.25em]">Données personnelles &amp; Cookies</h2>
              </div>
              <div className="bg-card rounded-lg ring-1 ring-foreground/10 p-6 space-y-6">
                <div className="border-l-2 border-accent pl-4">
                  <p className="text-sm/relaxed text-muted-foreground">
                    Ce site respecte votre vie privée. Aucune donnée personnelle n'est collectée à des fins commerciales ou publicitaires.
                  </p>
                </div>

                <div className="pt-6 border-t border-border/50 space-y-4">
                  <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-texte">Données collectées</h3>
                  <ul className="space-y-2 text-sm/relaxed text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="text-accent-texte mt-0.5">•</span>
                      <span><span className="text-foreground font-medium">Données de navigation</span> — adresse IP et pages consultées, collectées automatiquement par l'hébergeur (Vercel) à des fins techniques et de sécurité. Durée de conservation : 30 jours.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-border/50 space-y-4">
                  <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-texte">Cookies</h3>
                  <p className="text-sm/relaxed text-muted-foreground">
                    Ce site utilise un unique cookie technique, strictement nécessaire à son fonctionnement :
                  </p>
                  <ul className="space-y-2 text-sm/relaxed text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="text-accent-texte mt-0.5">•</span>
                      <span><span className="text-foreground font-medium">Préférence de thème</span> (clair / sombre) — stockée dans votre navigateur (cookie + localStorage), sans transmission à un serveur tiers. Ce cookie est exempté de consentement au titre de l'article 82 de la loi Informatique et Libertés.</span>
                    </li>
                  </ul>
                  <p className="text-sm/relaxed text-muted-foreground">
                    Les statistiques de visite sont mesurées via <span className="text-foreground font-medium">Umami Analytics</span>, un outil respectueux de la vie privée : aucun cookie n'est déposé, aucune donnée personnelle n'est collectée, et les données sont agrégées de façon anonyme.
                    Vous pouvez consulter les statistiques publiques du site à tout moment.
                  </p>
                  <p className="text-sm/relaxed text-muted-foreground">
                    Aucun cookie publicitaire ou traceur tiers n'est déposé sur votre appareil.
                  </p>
                </div>

                <div className="pt-6 border-t border-border/50 space-y-4">
                  <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-texte">Vos droits (RGPD)</h3>
                  <p className="text-sm/relaxed text-muted-foreground">
                    Conformément au Règlement (UE) 2016/679 (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès,
                    de rectification, d'effacement, de limitation et d'opposition concernant vos données personnelles.
                    Pour exercer ces droits, contactez&nbsp;:&nbsp;
                    <a href="mailto:contact@kaysuto.fr" className="text-accent-texte hover:underline font-medium">contact@kaysuto.fr</a>.
                  </p>
                  <p className="text-sm/relaxed text-muted-foreground">
                    En cas de litige, vous pouvez saisir la <a href="https://www.cnil.fr" target="_blank" rel="noreferrer" className="text-accent-texte hover:underline font-medium">CNIL</a> (Commission Nationale de l'Informatique et des Libertés).
                  </p>
                </div>
              </div>
            </section>

            {/* Propriété Intellectuelle */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-accent-texte">
                <ShieldCheck className="size-5" />
                <h2 className="font-mono text-xs font-medium uppercase tracking-[0.25em]">Propriété Intellectuelle</h2>
              </div>
              <div className="bg-card rounded-lg ring-1 ring-foreground/10 p-6 space-y-6">
                {/* Copyright Principal */}
                <div className="border-l-2 border-accent pl-4 space-y-3">
                  <p className="text-base font-medium text-foreground">
                    © 2015-{new Date().getFullYear()} Kimiya. Tous droits réservés.
                  </p>
                  <p className="text-base/relaxed text-muted-foreground font-medium">
                    L'ensemble de ce portfolio, incluant mais sans s'y limiter : le code source, le design,
                    l'interface utilisateur, les textes, les images, les créations pixel art, les animations
                    et tous autres contenus sont la propriété exclusive de <span className="text-foreground font-medium">Kimiya</span>.
                  </p>
                </div>

                {/* Protection Légale */}
                <div className="pt-6 border-t border-border/50 space-y-4">
                  <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-texte">Protection Légale</h3>
                  <p className="text-base/relaxed text-muted-foreground font-medium">
                    Ce site web et l'ensemble de ses contenus relèvent de la législation française et internationale
                    sur le droit d'auteur et la propriété intellectuelle. Ils sont protégés par le Code de la
                    propriété intellectuelle français et les conventions internationales applicables.
                  </p>
                </div>

                {/* Restrictions d'Utilisation */}
                <div className="pt-6 border-t border-border/50 space-y-4">
                  <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-texte">Restrictions d'Utilisation</h3>
                  <ul className="space-y-2 text-sm/relaxed text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="text-accent-texte mt-0.5">•</span>
                      <span>Toute reproduction, représentation, modification, publication, adaptation de tout ou partie
                      des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans
                      autorisation écrite préalable.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent-texte mt-0.5">•</span>
                      <span>Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient
                      sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions
                      des articles L.335-2 et suivants du Code de Propriété Intellectuelle.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent-texte mt-0.5">•</span>
                      <span>Le code source est fourni à titre de démonstration et de référence uniquement pour
                      l'évaluation des compétences professionnelles de l'auteur.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent-texte mt-0.5">•</span>
                      <span>Les projets présentés dans ce portfolio restent la propriété de leurs auteurs respectifs.</span>
                    </li>
                  </ul>
                </div>

                {/* Exceptions */}
                <div className="pt-6 border-t border-border/50 space-y-4">
                  <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-texte">Exceptions</h3>
                  <p className="text-base/relaxed text-muted-foreground font-medium">
                    Les bibliothèques, frameworks et composants open-source utilisés dans ce portfolio conservent
                    leurs licences respectives. Vous pouvez consulter le fichier LICENSE à la racine du projet
                    pour plus de détails.
                  </p>
                </div>

                {/* Contact */}
                <div className="pt-6 border-t border-border/50">
                  <p className="text-base/relaxed text-muted-foreground font-medium">
                    Pour toute demande d'autorisation, collaboration ou question concernant l'utilisation de ce
                    portfolio, veuillez me contacter via la section <span className="text-accent-texte font-medium">Contact</span> du site.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
