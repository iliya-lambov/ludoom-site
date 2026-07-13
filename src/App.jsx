import { useState, useEffect, Fragment } from "react";
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
    nav: { projects: "Projects", about: "About us", investors: "For investors" },
    hero: {
      sub: "Ludoom is a Bulgarian laboratory for postmodern product design. Steel, plywood, plastic, code. Home of the Kuknall footstep — and whatever comes next.",
      cta: "See the projects",
      kuknall: "Visit kuknall.com →",
    },
    /* frames: static "pre" + animated word + static "post" */
    slogans: [
      { pre: "Madly ", word: "we work", post: "" },
      { pre: "Madly ", word: "we never rest", post: "" },
      { pre: "", word: "A mad mind", post: " knows no fatigue" },
      { pre: "", word: "A mad heart", post: " knows no fatigue" },
    ],
    about: {
      title: "About us",
      text: "Ludoom OOD was founded in 2014 in Stamboliyski, Plovdiv region, as a design laboratory: physical products first, honest engineering, direct sales. Our flagship project is Kuknall — a steel footstep with a medical focus: prevention of conditions linked to unhealthy elimination posture.",
      contactTitle: "Contact",
      name: "Your name",
      emailLbl: "Your email",
      msg: "Message",
      send: "Send",
      note: "The form opens your email client with the message pre-filled.",
      addr: "6 Zavodska str., Stamboliyski, Plovdiv region, Bulgaria",
    },
    investors: {
      title: "Investor portal",
      text: "A live dashboard with current projects, company growth and active investor count is in preparation. Crowdfunders will also be able to join through the Kuknall Kickstarter campaign.",
      soon: "Coming soon",
      request: "Request access by email",
    },
    gallery: { kicker: "Projects by year", close: "Close", visit: "Visit →" },
    rights: "© 2026 Ludoom OOD · Bulgaria, EU",
  },
  bg: {
    nav: { projects: "Проекти", about: "За нас", investors: "За инвеститори" },
    hero: {
      sub: "Ludoom е българска лаборатория за постмодерен продуктов дизайн. Стомана, шперплат, пластмаса, код. Домът на степенката Kuknall — и на това, което следва.",
      cta: "Виж проектите",
      kuknall: "Посети kuknall.com →",
    },
    slogans: [
      { pre: "За лудо ", word: "работим", post: "" },
      { pre: "За лудо ", word: "не стоим", post: "" },
      { pre: "", word: "Луд човек", post: " умора няма" },
      { pre: "", word: "Луд ум", post: " умора няма" },
    ],
    about: {
      title: "За нас",
      text: "Ludoom OOD е основана през 2014 г. в Стамболийски, обл. Пловдив, като дизайн лаборатория: първо физически продукти, честно инженерство, директни продажби. Водещият ни проект е Kuknall — стоманена степенка с медицинска насоченост: превенция на заболявания, свързани с нездравословната поза при елиминация.",
      contactTitle: "Контакт",
      name: "Твоето име",
      emailLbl: "Твоят имейл",
      msg: "Съобщение",
      send: "Изпрати",
      note: "Формата отваря пощенската ти програма с попълнено съобщение.",
      addr: "ул. Заводска 6, Стамболийски, обл. Пловдив, България",
    },
    investors: {
      title: "Инвеститорски портал",
      text: "Живо табло с текущите проекти, растежа на компанията и броя активни инвеститори е в подготовка. Краудфъндърите ще могат да се включат и през Kickstarter кампанията на Kuknall.",
      soon: "Очаквайте скоро",
      request: "Заяви достъп по имейл",
    },
    gallery: { kicker: "Проекти по години", close: "Затвори", visit: "Посети →" },
    rights: "© 2026 Ludoom OOD · България, ЕС",
  },
};

/* ——— Animated slogan rotator ——— */
function SloganRotator({ frames }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % frames.length), 2400);
    return () => clearInterval(id);
  }, [frames.length]);
  const f = frames[i];
  return (
    <h1 className="display font-bold tracking-tight leading-tight text-4xl sm:text-6xl lg:text-7xl min-h-[2.4em] sm:min-h-[1.2em]">
      {f.pre && <span>{f.pre}</span>}
      {/* key=i remounts the span so the CSS animation replays */}
      <span key={i} className="word-anim">{f.word}</span>
      {f.post && <span>{f.post}</span>}
    </h1>
  );
}

/* ——— Shared modal shell ——— */
function Modal({ open, onClose, children, labelledBy }) {
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
    <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm overflow-y-auto" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby={labelledBy}>
      <div className="min-h-full flex items-start justify-center p-4 sm:p-8">
        <div className="bg-panel border border-line w-full max-w-4xl rounded-2xl p-6 sm:p-10 relative" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>
  );
}

function CloseBtn({ onClose, label }) {
  return (
    <button
      onClick={onClose}
      className="absolute top-5 right-5 text-sm font-semibold border border-line hover:border-paper text-muted hover:text-paper rounded-full px-4 py-1.5 transition-colors"
    >
      {label} ✕
    </button>
  );
}

function initials(str) {
  return str.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function ProjectCard({ item, lang, t }) {
  const title = item.title[lang];
  return (
    <div className="group border border-line bg-panel-2 rounded-xl overflow-hidden hover:border-signal/50 transition-colors">
      <div className="aspect-[16/10] bg-black/30 grid place-items-center overflow-hidden">
        {item.image ? (
          <img src={`/projects/${item.image}`} alt={title} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <span className="display text-4xl font-bold text-signal/60 select-none">{initials(title)}</span>
        )}
      </div>
      <div className="p-5">
        <h4 className="display font-semibold text-paper">{title}</h4>
        <p className="text-sm text-muted mt-2 leading-relaxed">{item.desc[lang]}</p>
        {item.link && (
          <a href={item.link} className="inline-block mt-3 text-sm font-semibold text-signal hover:text-signal-soft">
            {t.gallery.visit}
          </a>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("bg");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [investOpen, setInvestOpen] = useState(false);
  const t = T[lang];

  const submitContact = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const subject = encodeURIComponent(`Ludoom contact — ${data.get("name")}`);
    const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} <${data.get("email")}>`);
    window.location.href = `mailto:${LINKS.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-carbon text-paper">
      {/* NAV */}
      <header className="sticky top-0 z-50 bg-carbon/80 backdrop-blur border-b border-line">
        <nav className="max-w-5xl mx-auto flex items-center justify-between px-5 py-4">
          <a href="#top" className="display font-bold text-lg tracking-tight">
            ludoom<span className="text-signal">_</span>
          </a>
          <div className="flex items-center gap-6 text-sm">
            <button onClick={() => setGalleryOpen(true)} className="hover:text-signal font-medium transition-colors">
              {t.nav.projects}
            </button>
            <button onClick={() => setAboutOpen(true)} className="hover:text-signal font-medium transition-colors hidden sm:inline">
              {t.nav.about}
            </button>
            <button onClick={() => setInvestOpen(true)} className="hover:text-signal font-medium transition-colors hidden sm:inline">
              {t.nav.investors}
            </button>
            <div className="flex rounded-full border border-line overflow-hidden text-xs font-semibold">
              {["bg", "en"].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1.5 uppercase transition-colors ${
                    lang === l ? "bg-paper text-carbon" : "text-muted hover:text-paper"
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

      {/* HERO — id="rive-slot" запазено за бъдещата Rive анимация */}
      <section id="top" className="flex-1 grid place-items-center px-5 py-24 sm:py-32 hero-grid-bg">
        <div className="max-w-4xl text-center" id="rive-slot">
          <p className="display text-muted text-sm sm:text-base uppercase tracking-[0.3em] mb-6">
            ludoom<span className="text-signal">_</span> laboratory
          </p>
          <SloganRotator frames={t.slogans} />
          <p className="mt-8 text-muted max-w-xl mx-auto">{t.hero.sub}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setGalleryOpen(true)}
              className="bg-signal hover:bg-signal-soft text-carbon font-semibold px-8 py-3.5 rounded-full transition-colors"
            >
              {t.hero.cta}
            </button>
            <a
              href={LINKS.kuknall}
              className="border border-line hover:border-paper text-paper font-semibold px-8 py-3.5 rounded-full transition-colors"
            >
              {t.hero.kuknall}
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-line py-6 text-center text-xs text-muted">
        {t.rights}
      </footer>

      {/* ——— PROJECTS GALLERY ——— */}
      <Modal open={galleryOpen} onClose={() => setGalleryOpen(false)} labelledBy="gallery-title">
        <CloseBtn onClose={() => setGalleryOpen(false)} label={t.gallery.close} />
        <p id="gallery-title" className="text-signal font-mono text-xs uppercase tracking-widest mb-8">{t.gallery.kicker}</p>
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
      </Modal>

      {/* ——— ABOUT + CONTACT FORM ——— */}
      <Modal open={aboutOpen} onClose={() => setAboutOpen(false)} labelledBy="about-title">
        <CloseBtn onClose={() => setAboutOpen(false)} label={t.gallery.close} />
        <h2 id="about-title" className="display text-3xl font-bold mb-5">{t.about.title}</h2>
        <p className="text-muted leading-relaxed max-w-2xl">{t.about.text}</p>
        <a href={LINKS.kuknall} className="inline-block mt-4 font-semibold text-signal hover:text-signal-soft">
          kuknall.com →
        </a>

        <div className="border-t border-line mt-8 pt-8">
          <h3 className="display text-xl font-bold mb-4">{t.about.contactTitle}</h3>
          <form onSubmit={submitContact} className="grid sm:grid-cols-2 gap-4 max-w-2xl">
            <input
              name="name" required placeholder={t.about.name}
              className="bg-panel-2 border border-line rounded-lg px-4 py-3 text-sm placeholder:text-muted focus:border-signal outline-none"
            />
            <input
              name="email" type="email" required placeholder={t.about.emailLbl}
              className="bg-panel-2 border border-line rounded-lg px-4 py-3 text-sm placeholder:text-muted focus:border-signal outline-none"
            />
            <textarea
              name="message" required rows="4" placeholder={t.about.msg}
              className="bg-panel-2 border border-line rounded-lg px-4 py-3 text-sm placeholder:text-muted focus:border-signal outline-none sm:col-span-2"
            />
            <div className="sm:col-span-2 flex items-center gap-4 flex-wrap">
              <button type="submit" className="bg-signal hover:bg-signal-soft text-carbon font-semibold px-7 py-3 rounded-full transition-colors">
                {t.about.send}
              </button>
              <span className="text-xs text-muted">{t.about.note}</span>
            </div>
          </form>
          <p className="text-sm text-muted mt-6">{t.about.addr}</p>
        </div>
      </Modal>

      {/* ——— INVESTORS (портал — фаза 2) ——— */}
      <Modal open={investOpen} onClose={() => setInvestOpen(false)} labelledBy="invest-title">
        <CloseBtn onClose={() => setInvestOpen(false)} label={t.gallery.close} />
        <div className="text-center py-6">
          <div className="mx-auto w-14 h-14 rounded-full border border-signal/50 grid place-items-center mb-5">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <rect x="5" y="11" width="14" height="9" rx="2" className="stroke-signal" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" className="stroke-signal" />
            </svg>
          </div>
          <h2 id="invest-title" className="display text-3xl font-bold">{t.investors.title}</h2>
          <p className="text-signal font-mono text-xs uppercase tracking-widest mt-2 mb-5">{t.investors.soon}</p>
          <p className="text-muted max-w-xl mx-auto leading-relaxed">{t.investors.text}</p>
          <a
            href={`mailto:${LINKS.email}?subject=${encodeURIComponent("Ludoom investor access request")}`}
            className="inline-block mt-8 border border-signal text-signal hover:bg-signal hover:text-carbon font-semibold px-7 py-3 rounded-full transition-colors"
          >
            {t.investors.request}
          </a>
        </div>
      </Modal>
    </div>
  );
}
