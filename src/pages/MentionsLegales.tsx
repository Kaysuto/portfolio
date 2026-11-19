import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ShieldCheck, Scale, Globe, Lock } from "lucide-react"
import { Link } from "react-router-dom"
import { useSeo } from "@/hooks/useSeo"
import { useLangue } from "@/lib/langue"

export default function MentionsLegales() {
  const { langue, t } = useLangue()
  useSeo({
    title: t("Kimiya - Mentions légales", "Kimiya - Legal notice"),
    description: t(
      "Mentions légales et politique de confidentialité du portfolio de Kimiya.",
      "Legal notice and privacy policy for Kimiya's portfolio."
    ),
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
              {t("Retour à l'accueil", "Back to home")}
            </Button>
          </Link>

          <div className="space-y-8">
            <header className="border-b border-border/50 pb-10">
              <h1 className="mb-6 text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-7xl">
                {t(
                  <>Mentions <span className="text-accent-texte">Légales</span></>,
                  <>Legal <span className="text-accent-texte">Notice</span></>
                )}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t("Dernière mise à jour : ", "Last updated: ")}
                {new Date().toLocaleDateString(t('fr-FR', 'en-GB'), { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              {langue === "en" && (
                <p className="mt-4 text-sm text-muted-foreground">
                  This is a translation provided for convenience; the French version is the reference text.
                </p>
              )}
            </header>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Éditeur */}
              <section className="space-y-4">
                <div className="flex items-center gap-3 text-accent-texte">
                  <Scale className="size-5" />
                  <h2 className="font-mono text-xs font-medium uppercase tracking-[0.25em]">{t("Éditeur", "Publisher")}</h2>
                </div>
                <div className="bg-card rounded-lg ring-1 ring-foreground/10 p-6 space-y-5">
                  <div>
                    <p className="text-base font-medium">Kimiya</p>
                    <p className="text-sm text-muted-foreground">{t("Entrepreneur individuel (micro-entreprise)", "Sole trader (French micro-entreprise)")}</p>
                  </div>
                  <div className="space-y-1 pt-4 border-t border-border/50">
                    <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-texte/70">{t("Identifiants", "Company identifiers")}</p>
                    <p className="text-base">{t("SIRET : ", "SIRET: ")}<span className="text-foreground">91450990600022</span></p>
                    <p className="text-base">{t("TVA : ", "VAT: ")}<span className="text-foreground">FR63914509906</span></p>
                    <p className="text-base">{t("APE : ", "APE code: ")}<span className="text-foreground">{t("6201Z (Programmation informatique)", "6201Z (Computer programming)")}</span></p>
                  </div>
                  <div className="space-y-1 pt-4 border-t border-border/50">
                    <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-texte/70">Contact</p>
                    <p className="text-base">
                      {t("Email : ", "Email: ")}<a href="mailto:contact@kaysuto.fr" className="text-accent-texte hover:underline">contact@kaysuto.fr</a>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t("Directeur de publication : ", "Publication director: ")}<span className="text-foreground">Kimiya</span>
                    </p>
                  </div>
                </div>
              </section>

              {/* Hébergement */}
              <section className="space-y-4">
                <div className="flex items-center gap-3 text-accent-texte">
                  <Globe className="size-5" />
                  <h2 className="font-mono text-xs font-medium uppercase tracking-[0.25em]">{t("Hébergement", "Hosting")}</h2>
                </div>
                <div className="bg-card rounded-lg ring-1 ring-foreground/10 p-6 space-y-6">
                  <div>
                    <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-texte/70 mb-2">{t("Serveur", "Server")}</p>
                    <p className="text-base font-medium">{t("Auto-hébergé", "Self-hosted")}</p>
                    <p className="text-sm text-muted-foreground">{t("Serveur personnel situé en France, administré avec Coolify", "Personal server located in France, administered with Coolify")}</p>
                  </div>
                  <div className="pt-4 border-t border-border/50">
                    <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-texte/70 mb-2">{t("Proxy & protection", "Proxy & protection")}</p>
                    <p className="text-base font-medium">Cloudflare, Inc.</p>
                    <p className="text-sm text-muted-foreground">101 Townsend St, San Francisco, CA 94107, USA</p>
                  </div>
                  <div className="pt-4 border-t border-border/50">
                    <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-texte/70 mb-2">{t("Base de données & Backend", "Database & backend")}</p>
                    <p className="text-base font-medium">Supabase Inc.</p>
                    <p className="text-sm text-muted-foreground">65 Chulia Street #38-02/03, OCBC Centre, Singapore 049513</p>
                    <p className="text-sm text-muted-foreground mt-1">{t("Données stockées dans la région EU (Frankfurt, AWS eu-central-1)", "Data stored in the EU region (Frankfurt, AWS eu-central-1)")}</p>
                  </div>
                </div>
              </section>
            </div>


{/* Données personnelles & RGPD */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-accent-texte">
                <Lock className="size-5" />
                <h2 className="font-mono text-xs font-medium uppercase tracking-[0.25em]">{t("Données personnelles & Cookies", "Personal data & cookies")}</h2>
              </div>
              <div className="bg-card rounded-lg ring-1 ring-foreground/10 p-6 space-y-6">
                <div className="border-l-2 border-accent pl-4">
                  <p className="text-sm/relaxed text-muted-foreground">
                    {t(
                      "Ce site respecte votre vie privée. Aucune donnée personnelle n'est collectée à des fins commerciales ou publicitaires.",
                      "This site respects your privacy. No personal data is collected for commercial or advertising purposes."
                    )}
                  </p>
                </div>

                <div className="pt-6 border-t border-border/50 space-y-4">
                  <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-texte">{t("Données collectées", "Data collected")}</h3>
                  <ul className="space-y-2 text-sm/relaxed text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="text-accent-texte mt-0.5">•</span>
                      {t(
                        <span><span className="text-foreground font-medium">Données de navigation</span> — adresse IP et pages consultées, collectées automatiquement par le serveur et par Cloudflare à des fins techniques et de sécurité. Durée de conservation : 30 jours.</span>,
                        <span><span className="text-foreground font-medium">Browsing data</span> — IP address and pages visited, collected automatically by the server and by Cloudflare for technical and security purposes. Retention period: 30 days.</span>
                      )}
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent-texte mt-0.5">•</span>
                      {t(
                        <span><span className="text-foreground font-medium">Avis sur le portfolio</span> — si vous notez le site, seule la note (de 1 à 5) et sa date sont enregistrées chez Supabase (région UE), sans nom, adresse e-mail ni adresse IP associés. Le site n'en publie que la moyenne et le nombre.</span>,
                        <span><span className="text-foreground font-medium">Portfolio ratings</span> — if you rate the site, only the rating (1 to 5) and its date are stored with Supabase (EU region), with no name, email address or IP address attached. The site only publishes the average and the count.</span>
                      )}
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-border/50 space-y-4">
                  <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-texte">Cookies</h3>
                  <p className="text-sm/relaxed text-muted-foreground">
                    {t(
                      "Ce site utilise un unique cookie technique et quelques préférences enregistrées dans votre navigateur, strictement nécessaires à son fonctionnement :",
                      "This site uses a single technical cookie and a few preferences saved in your browser, strictly necessary for it to work:"
                    )}
                  </p>
                  <ul className="space-y-2 text-sm/relaxed text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="text-accent-texte mt-0.5">•</span>
                      {t(
                        <span><span className="text-foreground font-medium">Préférence de thème</span> (clair / sombre) — stockée dans votre navigateur (cookie + localStorage), sans transmission à un serveur tiers. Ce cookie est exempté de consentement au titre de l'article 82 de la loi Informatique et Libertés.</span>,
                        <span><span className="text-foreground font-medium">Theme preference</span> (light / dark) — stored in your browser (cookie + localStorage) and never sent to a third-party server. This cookie is exempt from consent under Article 82 of the French Data Protection Act (loi Informatique et Libertés).</span>
                      )}
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent-texte mt-0.5">•</span>
                      {t(
                        <span><span className="text-foreground font-medium">Langue et lecteur audio</span> — la langue choisie (français / anglais), la dernière piste écoutée et le volume, ainsi que la note déjà donnée au portfolio, stockés uniquement dans votre navigateur (localStorage), sans transmission à un serveur. Également exemptés de consentement.</span>,
                        <span><span className="text-foreground font-medium">Language and audio player</span> — your chosen language (French / English), the last track played and the volume, plus any rating you already gave the portfolio, stored only in your browser (localStorage) and never sent to a server. Also exempt from consent.</span>
                      )}
                    </li>
                  </ul>
                  <p className="text-sm/relaxed text-muted-foreground">
                    {t(
                      <>
                        Les statistiques de visite sont mesurées via <span className="text-foreground font-medium">Umami Analytics</span>, un outil respectueux de la vie privée : aucun cookie n'est déposé, aucune donnée personnelle n'est collectée, et les données sont agrégées de façon anonyme.
                        Vous pouvez consulter les statistiques publiques du site à tout moment.
                      </>,
                      <>
                        Visitor statistics are measured with <span className="text-foreground font-medium">Umami Analytics</span>, a privacy-friendly tool: no cookie is set, no personal data is collected, and the data is aggregated anonymously.
                        You can view the site's public statistics at any time.
                      </>
                    )}
                  </p>
                  <p className="text-sm/relaxed text-muted-foreground">
                    {t(
                      "Aucun cookie publicitaire ou traceur tiers n'est déposé sur votre appareil.",
                      "No advertising cookies or third-party trackers are placed on your device."
                    )}
                  </p>
                </div>

                <div className="pt-6 border-t border-border/50 space-y-4">
                  <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-texte">{t("Vos droits (RGPD)", "Your rights (GDPR)")}</h3>
                  <p className="text-sm/relaxed text-muted-foreground">
                    {t(
                      <>
                        Conformément au Règlement (UE) 2016/679 (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès,
                        de rectification, d'effacement, de limitation et d'opposition concernant vos données personnelles.
                        Pour exercer ces droits, contactez&nbsp;:&nbsp;
                      </>,
                      <>
                        Under Regulation (EU) 2016/679 (GDPR) and the French Data Protection Act, you have the right to access,
                        rectify, erase, restrict and object to the processing of your personal data.
                        To exercise these rights, contact:&nbsp;
                      </>
                    )}
                    <a href="mailto:contact@kaysuto.fr" className="text-accent-texte hover:underline font-medium">contact@kaysuto.fr</a>.
                  </p>
                  <p className="text-sm/relaxed text-muted-foreground">
                    {t("En cas de litige, vous pouvez saisir la ", "In the event of a dispute, you may lodge a complaint with the ")}
                    <a href="https://www.cnil.fr" target="_blank" rel="noreferrer" className="text-accent-texte hover:underline font-medium">CNIL</a>
                    {t(
                      " (Commission Nationale de l'Informatique et des Libertés).",
                      " (Commission Nationale de l'Informatique et des Libertés, the French data protection authority)."
                    )}
                  </p>
                </div>
              </div>
            </section>

            {/* Propriété Intellectuelle */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-accent-texte">
                <ShieldCheck className="size-5" />
                <h2 className="font-mono text-xs font-medium uppercase tracking-[0.25em]">{t("Propriété Intellectuelle", "Intellectual property")}</h2>
              </div>
              <div className="bg-card rounded-lg ring-1 ring-foreground/10 p-6 space-y-6">
                {/* Copyright Principal */}
                <div className="border-l-2 border-accent pl-4 space-y-3">
                  <p className="text-base font-medium text-foreground">
                    © 2015-{new Date().getFullYear()} Kimiya. {t("Tous droits réservés.", "All rights reserved.")}
                  </p>
                  <p className="text-base/relaxed text-muted-foreground font-medium">
                    {t(
                      <>
                        L'ensemble de ce portfolio, incluant mais sans s'y limiter : le code source, le design,
                        l'interface utilisateur, les textes, les images, les créations pixel art, les animations
                        et tous autres contenus sont la propriété exclusive de <span className="text-foreground font-medium">Kimiya</span>.
                      </>,
                      <>
                        This entire portfolio, including but not limited to the source code, design,
                        user interface, text, images, pixel art, animations
                        and all other content, is the exclusive property of <span className="text-foreground font-medium">Kimiya</span>.
                      </>
                    )}
                  </p>
                </div>

                {/* Protection Légale */}
                <div className="pt-6 border-t border-border/50 space-y-4">
                  <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-texte">{t("Protection Légale", "Legal protection")}</h3>
                  <p className="text-base/relaxed text-muted-foreground font-medium">
                    {t(
                      `Ce site web et l'ensemble de ses contenus relèvent de la législation française et internationale
                      sur le droit d'auteur et la propriété intellectuelle. Ils sont protégés par le Code de la
                      propriété intellectuelle français et les conventions internationales applicables.`,
                      `This website and all of its content are governed by French and international copyright
                      and intellectual property law. They are protected by the French Intellectual Property Code
                      and applicable international conventions.`
                    )}
                  </p>
                </div>

                {/* Restrictions d'Utilisation */}
                <div className="pt-6 border-t border-border/50 space-y-4">
                  <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-texte">{t("Restrictions d'Utilisation", "Restrictions on use")}</h3>
                  <ul className="space-y-2 text-sm/relaxed text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="text-accent-texte mt-0.5">•</span>
                      <span>{t(
                        `Toute reproduction, représentation, modification, publication, adaptation de tout ou partie
                        des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans
                        autorisation écrite préalable.`,
                        `Any reproduction, representation, modification, publication or adaptation of all or part
                        of the site's content, by any means or process whatsoever, is prohibited without
                        prior written permission.`
                      )}</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent-texte mt-0.5">•</span>
                      <span>{t(
                        `Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient
                        sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions
                        des articles L.335-2 et suivants du Code de Propriété Intellectuelle.`,
                        `Any unauthorised use of the site or of any of its content will be considered
                        copyright infringement and prosecuted under Articles L.335-2 et seq.
                        of the French Intellectual Property Code.`
                      )}</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent-texte mt-0.5">•</span>
                      <span>{t(
                        `Le code source est fourni à titre de démonstration et de référence uniquement pour
                        l'évaluation des compétences professionnelles de l'auteur.`,
                        `The source code is provided for demonstration and reference purposes only, to
                        assess the author's professional skills.`
                      )}</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent-texte mt-0.5">•</span>
                      <span>{t(
                        "Les projets présentés dans ce portfolio restent la propriété de leurs auteurs respectifs.",
                        "The projects shown in this portfolio remain the property of their respective authors."
                      )}</span>
                    </li>
                  </ul>
                </div>

                {/* Exceptions */}
                <div className="pt-6 border-t border-border/50 space-y-4">
                  <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-texte">Exceptions</h3>
                  <p className="text-base/relaxed text-muted-foreground font-medium">
                    {t(
                      `Les bibliothèques, frameworks et composants open-source utilisés dans ce portfolio conservent
                      leurs licences respectives. Vous pouvez consulter le fichier LICENSE à la racine du projet
                      pour plus de détails.`,
                      `The open-source libraries, frameworks and components used in this portfolio keep
                      their respective licenses. See the LICENSE file at the root of the project
                      for details.`
                    )}
                  </p>
                </div>

                {/* Contact */}
                <div className="pt-6 border-t border-border/50">
                  <p className="text-base/relaxed text-muted-foreground font-medium">
                    {t(
                      <>
                        Pour toute demande d'autorisation, collaboration ou question concernant l'utilisation de ce
                        portfolio, veuillez me contacter via la section <span className="text-accent-texte font-medium">Contact</span> du site.
                      </>,
                      <>
                        For any permission request, collaboration or question about the use of this
                        portfolio, please reach me through the site's <span className="text-accent-texte font-medium">Contact</span> section.
                      </>
                    )}
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
