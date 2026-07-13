import { useState, useEffect } from "react";
import { projects } from "./projects";

/* ——— редактирай тук ——— */
const LINKS = {
  kuknall: "https://kuknall.com",
  email: "iliya.lambov@kuknall.com",
  facebook: "#",
  instagram: "#",
};

const T = {
  en: {
    nav: { projects: "Projects", about: "About", contact: "Contact" },
    hero: {
      line1: "Ludoom",
      line2: "a laboratory for postmodern product design",
      sub: "Small Bulgarian studio. Steel, plywood, plastic, code. Home of the Kuknall footstep — and whatever comes next.",
      cta: "See the projects",
    },
    about: {
      kicker: "About",
      text: "Ludoom OOD was founded in 2014 in Stamboliyski, Plovdiv region, as a design laboratory: physical products first, honest engineering, direct sales. Our flagship project is Kuknall — a steel footstep that turns any standard toilet into a healthy squat posture. We work lean, prototype by hand, and publish the process.",
    },
    gallery: { kicker: "Projects by year", close: "Close", visit: "Visit →" },
    contact: {
      kicker: "Contact",
      title: "Talk to us",
      text: "Questions, manufacturing offers, clinic pilots, press — one inbox for everything.",
      addr: "6 Zavodska str., Stamboliyski, Plovdiv region, Bulgaria",
    },
    rights: "© 2026 Ludoom OOD · Bulgaria, EU",
  },
  bg: {
    nav: { projects: "Проекти", about: "За нас", contact: "Контакт" },
    hero: {
      line1: "Ludoom",
      line2: "лаборатория за постмодерен продуктов дизайн",
      sub: "Малко българско студио. Стомана, шперплат, пластмаса, код. Домът на степенката Kuknall — и на това, което следва.",
      cta: "Виж проектите",
    },
    about: {
      kicker: "За нас",
      text: "Ludoom OOD е основана през 2014 г. в Стамболийски, обл. Пловдив, като дизайн лаборатория: първо физически продукти, честно инженерство, директни продажби. Водещият ни проект е Kuknall — стоманена степенка, която превръща всяка стандартна тоалетна в здравословна клекнала поза. Работим пестеливо, прототипираме на ръка и публикуваме процеса.",
    },
    gallery: { kicker: "Проекти по години", close: "Затвори", visit: "Посети →" },
    contact: {
      kicker: "Контакт",
      title: "Пиши ни",
      text: "Въпроси, производствени оферти, пилоти за клиники, преса — една поща за всичко.",
      addr: "ул. Заводска 6, Стамболийски, обл. Пловдив, България",
    },
    rights: "© 2026 Ludoom OOD · България, ЕС",
  },
};

function initials(str) {
  return str.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function ProjectCard({ item, lang, t }) {
  const title = item.title[lang];
  return (
    <div className="group border border-line bg-white rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-[16/10] bg-carbon/5 grid place-items-center overflow-hidden">
        {item.image ? (
          <img src={`/projects/${item.image}`} alt={title} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <span className="display text-4xl font-bold text-signal/70 select-none">{initials(title)}</span>
        )}
      </div>
      <div className="p-5">
        <h4 className="display font-semibold">{title}</h4>
        <p className="text-sm text-carbon-soft mt-2 leading-relaxed">{item.desc[lang]}</p>
        {item.link && (
          <a href={item.link} className="inline-block mt-3 text-sm font-semibold text-signal hover:underline">
            {t.gallery.visit}
          </a>
        )}
      </div>
    </div>
  );
}

function Gallery({ open, onClose, lang, t }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] bg-carbon/60 backdrop-blur-sm overflow-y-auto" onClick={onClose} role="dialog" aria-modal="true">
      <div className="min-h-full flex items-start justify-center p-4 sm:p-8">
        <div className="bg-paper w-full max-w-5xl rounded-2xl p-6 sm:p-10 relative" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-sm font-semibold border border-carbon/20 hover:border-carbon rounded-full px-4 py-1.5 transition-colors"
          >
            {t.gallery.close} ✕
          </button>
          <p className="text-signal font-mono text-xs uppercase tracking-widest mb-8">{t.gallery.kicker}</p>
          {projects.map(({ year, items }) => (
            <div key={year} className="mb-10 last:mb-0">
              <div className="flex items-baseline gap-4 mb-5">
                <h3 className="display text-3xl font-bold">{year}</h3>
                <div className="flex-1 h-px bg-line" />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                {items.map((item) => (
                  <ProjectCard key={item.title.en} item={item} lang={lang} t={t} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("bg");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const t = T[lang];

  return (
    <div className="min-h-screen flex flex-col">
      {/* NAV */}
      <header className="sticky top-0 z-50 bg-paper/85 backdrop-blur border-b border-line">
        <nav className="max-w-5xl mx-auto flex items-center justify-between px-5 py-4">
          <a href="#top" className="display font-bold text-lg tracking-tight">
            ludoom<span className="text-signal">_</span>
          </a>
          <div className="flex items-center gap-6 text-sm">
            <button onClick={() => setGalleryOpen(true)} className="hover:text-signal font-medium">
              {t.nav.projects}
            </button>
            <a href="#about" className="hover:text-signal hidden sm:inline">{t.nav.about}</a>
            <a href="#contact" className="hover:text-signal hidden sm:inline">{t.nav.contact}</a>
            <div className="flex rounded-full border border-line overflow-hidden text-xs font-semibold">
              {["bg", "en"].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1.5 uppercase transition-colors ${
                    lang === l ? "bg-carbon text-paper" : "text-carbon-soft hover:text-carbon"
                  }`}
                  aria-pressed={lang === l}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* HERO — id="rive-slot" е мястото, където по-късно ще вградим Rive анимацията */}
      <section id="top" className="flex-1 grid place-items-center px-5 py-24 sm:py-32">
        <div className="max-w-3xl text-center" id="rive-slot">
          <h1 className="display font-bold tracking-tight leading-none">
            <span className="block text-6xl sm:text-8xl">{t.hero.line1}<span className="text-signal">_</span></span>
            <span className="block text-lg sm:text-2xl text-carbon-soft font-medium mt-4">{t.hero.line2}</span>
          </h1>
          <p className="mt-7 text-carbon-soft max-w-xl mx-auto">{t.hero.sub}</p>
          <button
            onClick={() => setGalleryOpen(true)}
            className="mt-9 bg-carbon text-paper hover:bg-signal font-semibold px-8 py-3.5 rounded-full transition-colors"
          >
            {t.hero.cta}
          </button>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-t border-line bg-white">
        <div className="max-w-3xl mx-auto px-5 py-16">
          <p className="text-signal font-mono text-xs uppercase tracking-widest mb-4">{t.about.kicker}</p>
          <p className="text-lg leading-relaxed">{t.about.text}</p>
          <a href={LINKS.kuknall} className="inline-block mt-5 font-semibold text-signal hover:underline">
            kuknall.com →
          </a>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-line">
        <div className="max-w-3xl mx-auto px-5 py-16">
          <p className="text-signal font-mono text-xs uppercase tracking-widest mb-4">{t.contact.kicker}</p>
          <h2 className="display text-3xl font-bold mb-3">{t.contact.title}</h2>
          <p className="text-carbon-soft mb-6">{t.contact.text}</p>
          <a
            href={`mailto:${LINKS.email}`}
            className="inline-block bg-signal text-white font-semibold px-7 py-3 rounded-full hover:bg-carbon transition-colors"
          >
            {LINKS.email}
          </a>
          <p className="text-sm text-carbon-soft mt-6">{t.contact.addr}</p>
        </div>
      </section>

      <footer className="border-t border-line py-6 text-center text-xs text-carbon-soft">
        {t.rights}
      </footer>

      <Gallery open={galleryOpen} onClose={() => setGalleryOpen(false)} lang={lang} t={t} />
    </div>
  );
}
