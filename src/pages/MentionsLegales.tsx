import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ShieldCheck, Scale, Globe, Lock } from "lucide-react"
import { Link } from "react-router-dom"
import { useSeo } from "@/hooks/useSeo"

export default function MentionsLegales() {
  useSeo({
    title: "Kimiya - Mentions légales",
    description: "Mentions légales et politique de confidentialité du portfolio de Kimiya Kaysuto.",
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
            <Button variant="ghost" className="mb-8 gap-2 hover:bg-accent/10 text-muted-foreground hover:text-accent transition-colors">
              <ArrowLeft size={18} />
              Retour à l'accueil
            </Button>
          </Link>

          <div className="space-y-12">
            <header className="border-b border-border/50 pb-8">
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
                Mentions <span className="text-accent">Légales</span>
              </h1>
              <p className="text-muted-foreground font-medium">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </header>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Éditeur */}
              <section className="space-y-4">
                <div className="flex items-center gap-3 text-accent">
                  <Scale size={24} />
                  <h2 className="text-xl font-bold uppercase tracking-widest">Éditeur</h2>
                </div>
                <div className="bg-card/40 backdrop-blur-md border border-border/50 rounded-2xl p-8 space-y-4">
                  <div>
                    <p className="font-black text-lg">Kaysuto Kimiya</p>
                    <p className="text-muted-foreground font-medium">Entrepreneur individuel</p>
                  </div>
                  <div className="space-y-1 pt-4 border-t border-border/50">
                    <p className="text-xs font-black uppercase tracking-widest text-accent/70">Identifiants</p>
                    <p className="text-sm font-bold">SIRET : <span className="text-foreground">91450990600022</span></p>
                    <p className="text-sm font-bold">TVA : <span className="text-foreground">FR63914509906</span></p>
                    <p className="text-sm font-bold">APE : <span className="text-foreground">6201Z (Programmation informatique)</span></p>
                  </div>
                  <div className="space-y-1 pt-4 border-t border-border/50">
                    <p className="text-xs font-black uppercase tracking-widest text-accent/70">Contact</p>
                    <p className="text-sm font-bold">
                      Email : <a href="mailto:contact@kaysuto.fr" className="text-accent hover:underline">contact@kaysuto.fr</a>
                    </p>
                    <p className="text-sm font-bold text-muted-foreground">
                      Directeur de publication : <span className="text-foreground">Kaysuto Kimiya</span>
                    </p>
                  </div>
                </div>
              </section>

              {/* Hébergement */}
              <section className="space-y-4">
                <div className="flex items-center gap-3 text-accent">
                  <Globe size={24} />
                  <h2 className="text-xl font-bold uppercase tracking-widest">Hébergement</h2>
                </div>
                <div className="bg-card/40 backdrop-blur-md border border-border/50 rounded-2xl p-8 space-y-6">
                  <div>
                    <p className="font-black text-sm uppercase tracking-wider text-accent/70 mb-2">Plateforme</p>
                    <p className="font-bold">Vercel Inc.</p>
                    <p className="text-sm text-muted-foreground">340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
                    <p className="text-sm text-muted-foreground mt-1">DPO Europe : c/o EDPO, Avenue Huart Hamoir 71, 1030 Bruxelles, Belgique</p>
                  </div>
                  <div className="pt-4 border-t border-border/50">
                    <p className="font-black text-sm uppercase tracking-wider text-accent/70 mb-2">Base de données &amp; Backend</p>
                    <p className="font-bold">Supabase Inc.</p>
                    <p className="text-sm text-muted-foreground">65 Chulia Street #38-02/03, OCBC Centre, Singapore 049513</p>
                    <p className="text-sm text-muted-foreground mt-1">Données stockées dans la région EU (Frankfurt, AWS eu-central-1)</p>
                  </div>
                </div>
              </section>
            </div>


{/* Données personnelles & RGPD */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-accent">
                <Lock size={24} />
                <h2 className="text-xl font-bold uppercase tracking-widest">Données personnelles &amp; Cookies</h2>
              </div>
              <div className="bg-card/40 backdrop-blur-md border border-border/50 rounded-2xl p-8 space-y-6">
                <div className="border-l-4 border-accent pl-6">
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    Ce site respecte votre vie privée. Aucune donnée personnelle n'est collectée à des fins commerciales ou publicitaires.
                  </p>
                </div>

                <div className="pt-6 border-t border-border/50 space-y-4">
                  <h3 className="text-accent font-black text-sm uppercase tracking-widest">Données collectées</h3>
                  <ul className="space-y-3 text-muted-foreground font-medium">
                    <li className="flex gap-3">
                      <span className="text-accent font-bold mt-0.5">•</span>
                      <span><span className="text-foreground font-bold">Données de navigation</span> — adresse IP et pages consultées, collectées automatiquement par l'hébergeur (Vercel) à des fins techniques et de sécurité. Durée de conservation : 30 jours.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-border/50 space-y-4">
                  <h3 className="text-accent font-black text-sm uppercase tracking-widest">Cookies</h3>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    Ce site utilise un unique cookie technique, strictement nécessaire à son fonctionnement :
                  </p>
                  <ul className="space-y-3 text-muted-foreground font-medium">
                    <li className="flex gap-3">
                      <span className="text-accent font-bold mt-0.5">•</span>
                      <span><span className="text-foreground font-bold">Préférence de thème</span> (clair / sombre) — stockée dans votre navigateur (cookie + localStorage), sans transmission à un serveur tiers. Ce cookie est exempté de consentement au titre de l'article 82 de la loi Informatique et Libertés.</span>
                    </li>
                  </ul>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    Les statistiques de visite sont mesurées via <span className="text-foreground font-bold">Umami Analytics</span>, un outil respectueux de la vie privée : aucun cookie n'est déposé, aucune donnée personnelle n'est collectée, et les données sont agrégées de façon anonyme.
                    Vous pouvez consulter les statistiques publiques du site à tout moment.
                  </p>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    Aucun cookie publicitaire ou traceur tiers n'est déposé sur votre appareil.
                  </p>
                </div>

                <div className="pt-6 border-t border-border/50 space-y-4">
                  <h3 className="text-accent font-black text-sm uppercase tracking-widest">Vos droits (RGPD)</h3>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    Conformément au Règlement (UE) 2016/679 (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès,
                    de rectification, d'effacement, de limitation et d'opposition concernant vos données personnelles.
                    Pour exercer ces droits, contactez&nbsp;:&nbsp;
                    <a href="mailto:contact@kaysuto.fr" className="text-accent hover:underline font-bold">contact@kaysuto.fr</a>.
                  </p>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    En cas de litige, vous pouvez saisir la <a href="https://www.cnil.fr" target="_blank" rel="noreferrer" className="text-accent hover:underline font-bold">CNIL</a> (Commission Nationale de l'Informatique et des Libertés).
                  </p>
                </div>
              </div>
            </section>

            {/* Propriété Intellectuelle */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-accent">
                <ShieldCheck size={24} />
                <h2 className="text-xl font-bold uppercase tracking-widest">Propriété Intellectuelle</h2>
              </div>
              <div className="bg-card/40 backdrop-blur-md border border-border/50 rounded-2xl p-8 space-y-6">
                {/* Copyright Principal */}
                <div className="border-l-4 border-accent pl-6 space-y-3">
                  <p className="text-foreground font-black text-lg">
                    © 2015-{new Date().getFullYear()} Kaysuto Kimiya. Tous droits réservés.
                  </p>
                  <p className="text-muted-foreground leading-relaxed font-medium">
                    L'ensemble de ce portfolio, incluant mais sans s'y limiter : le code source, le design,
                    l'interface utilisateur, les textes, les images, les créations pixel art, les animations
                    et tous autres contenus sont la propriété exclusive de <span className="text-foreground font-bold">Kaysuto Kimiya</span>.
                  </p>
                </div>

                {/* Protection Légale */}
                <div className="pt-6 border-t border-border/50 space-y-4">
                  <h3 className="text-accent font-black text-sm uppercase tracking-widest">Protection Légale</h3>
                  <p className="text-muted-foreground leading-relaxed font-medium">
                    Ce site web et l'ensemble de ses contenus relèvent de la législation française et internationale
                    sur le droit d'auteur et la propriété intellectuelle. Ils sont protégés par le Code de la
                    propriété intellectuelle français et les conventions internationales applicables.
                  </p>
                </div>

                {/* Restrictions d'Utilisation */}
                <div className="pt-6 border-t border-border/50 space-y-4">
                  <h3 className="text-accent font-black text-sm uppercase tracking-widest">Restrictions d'Utilisation</h3>
                  <ul className="space-y-3 text-muted-foreground font-medium">
                    <li className="flex gap-3">
                      <span className="text-accent font-bold mt-0.5">•</span>
                      <span>Toute reproduction, représentation, modification, publication, adaptation de tout ou partie
                      des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans
                      autorisation écrite préalable.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent font-bold mt-0.5">•</span>
                      <span>Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient
                      sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions
                      des articles L.335-2 et suivants du Code de Propriété Intellectuelle.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent font-bold mt-0.5">•</span>
                      <span>Le code source est fourni à titre de démonstration et de référence uniquement pour
                      l'évaluation des compétences professionnelles de l'auteur.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent font-bold mt-0.5">•</span>
                      <span>Les projets présentés dans ce portfolio restent la propriété de leurs auteurs respectifs.</span>
                    </li>
                  </ul>
                </div>

                {/* Exceptions */}
                <div className="pt-6 border-t border-border/50 space-y-4">
                  <h3 className="text-accent font-black text-sm uppercase tracking-widest">Exceptions</h3>
                  <p className="text-muted-foreground leading-relaxed font-medium">
                    Les bibliothèques, frameworks et composants open-source utilisés dans ce portfolio conservent
                    leurs licences respectives. Vous pouvez consulter le fichier LICENSE à la racine du projet
                    pour plus de détails.
                  </p>
                </div>

                {/* Contact */}
                <div className="pt-6 border-t border-border/50">
                  <p className="text-muted-foreground leading-relaxed font-medium">
                    Pour toute demande d'autorisation, collaboration ou question concernant l'utilisation de ce
                    portfolio, veuillez me contacter via la section <span className="text-accent font-bold">Contact</span> du site.
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
