import { useEffect, useRef, useState } from "react";
import { adventureConfig as config, type Memory } from "./config";

type Scene = "welcome" | "heart-garden" | "memories" | "gift" | "date-invitation";

const scenes: Scene[] = [
  "welcome",
  "heart-garden",
  "memories",
  "gift",
  "date-invitation",
];

function Icon({
  name,
  size = 20,
}: {
  name: "music" | "muted" | "arrow" | "back" | "map" | "calendar" | "close";
  size?: number;
}) {
  const paths = {
    music: <><path d="M9 18V5l10-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="16" cy="16" r="3" /></>,
    muted: <><path d="M11 5 6 9H3v6h3l5 4V5Z" /><path d="m16 9 5 6m0-6-5 6" /></>,
    arrow: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
    back: <><path d="M19 12H5" /><path d="m10 17-5-5 5-5" /></>,
    map: <><path d="m3 6 5-3 8 3 5-3v15l-5 3-8-3-5 3V6Z" /><path d="M8 3v15m8-12v15" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function HeartIcon({ collected = false }: { collected?: boolean }) {
  return (
    <svg viewBox="0 0 120 110" aria-hidden="true">
      <path
        d="M60 100S8 70 8 35C8 8 43 1 60 26 77 1 112 8 112 35c0 35-52 65-52 65Z"
        fill="currentColor"
      />
      <path d="M27 27c7-10 19-9 25-2" fill="none" stroke="rgba(255,255,255,.65)" strokeWidth="5" strokeLinecap="round" />
      {collected && <path d="m41 55 12 12 27-29" fill="none" stroke="#fff8f0" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}

function Stars({ warm = false }: { warm?: boolean }) {
  return (
    <div className={`stars ${warm ? "stars--warm" : ""}`} aria-hidden="true">
      {Array.from({ length: 26 }, (_, index) => (
        <i key={index} style={{ "--i": index } as React.CSSProperties} />
      ))}
    </div>
  );
}

function TopBar({
  scene,
  musicOn,
  musicAvailable,
  onMusic,
}: {
  scene: Scene;
  musicOn: boolean;
  musicAvailable: boolean;
  onMusic: () => void;
}) {
  const index = scenes.indexOf(scene);
  return (
    <header className={`topbar ${scene === "memories" || scene === "date-invitation" ? "topbar--ink" : ""}`}>
      <div className="wordmark">
        <span className="wordmark__mark">♡</span>
        <span>A little adventure <b>for us</b></span>
      </div>
      <div className="chapter" aria-label={`Chapter ${index + 1} of 5`}>
        <span>Our little story</span>
        <div className="chapter__stars" aria-hidden="true">
          {scenes.map((item, itemIndex) => (
            <i key={item} className={itemIndex <= index ? "is-lit" : ""}>✦</i>
          ))}
        </div>
      </div>
      <button
        className="icon-button"
        onClick={onMusic}
        aria-label={musicAvailable ? (musicOn ? "Mute music" : "Play music") : "Music unavailable"}
        title={musicAvailable ? (musicOn ? "Mute music" : "Play music") : "Add a music file in config to enable"}
      >
        <Icon name={musicOn ? "music" : "muted"} />
      </button>
    </header>
  );
}

function PrimaryButton({
  children,
  onClick,
  light = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  light?: boolean;
}) {
  return (
    <button className={`primary-button ${light ? "primary-button--light" : ""}`} onClick={onClick}>
      <span>{children}</span>
      <Icon name="arrow" size={18} />
    </button>
  );
}

function Welcome({ onNext }: { onNext: () => void }) {
  return (
    <section className="scene welcome-scene" aria-labelledby="welcome-title">
      <Stars />
      <div className="moon" aria-hidden="true"><span /></div>
      <div className="cloud cloud--one" aria-hidden="true" />
      <div className="cloud cloud--two" aria-hidden="true" />
      <div className="welcome-orbit" aria-hidden="true">
        <span className="orbit-line" />
        <span className="hero-heart"><HeartIcon /></span>
      </div>
      <main className="welcome-copy story-copy">
        <p className="eyebrow">A little something for you</p>
        <h1 id="welcome-title">{config.welcomeMessage}</h1>
        <p className="lead">Five little moments. A few memories.<br />One special question.</p>
        <PrimaryButton onClick={onNext} light>Begin our story ♡</PrimaryButton>
        <p className="signature">Made with love, just for you.</p>
      </main>
      <div className="hill hill--far" aria-hidden="true" />
      <div className="hill hill--near" aria-hidden="true" />
    </section>
  );
}

function HeartGarden({
  collected,
  onCollect,
  onContinue,
}: {
  collected: number[];
  onCollect: (index: number) => void;
  onContinue: () => void;
}) {
  const [messageIndex, setMessageIndex] = useState<number | null>(null);
  const collect = (index: number) => {
    onCollect(index);
    setMessageIndex(index);
  };
  return (
    <section className="scene garden-scene" aria-labelledby="garden-title">
      <Stars warm />
      <div className="garden-glow" aria-hidden="true" />
      <main className="garden-layout">
        <div className="garden-copy story-copy">
          <p className="eyebrow">Chapter two · a tiny quest</p>
          <h1 id="garden-title">Collect a few little hearts.</h1>
          <p className="lead">Each one holds something I want you to know.</p>
          <div className="quest-count" aria-live="polite">
            <span>Little hearts found</span>
            <strong>{collected.length} <i>/ 3</i></strong>
            <div className="quest-track"><span style={{ width: `${(collected.length / 3) * 100}%` }} /></div>
          </div>
          <p className="hint">Tap the glowing hearts to discover what they hold.</p>
          {collected.length === 3 && (
            <div className="quest-complete">
              <p>You found all the little hearts ♡</p>
              <PrimaryButton onClick={onContinue}>Discover our memories</PrimaryButton>
            </div>
          )}
          {collected.length < 3 && <button className="text-button" onClick={onContinue}>Skip this little quest</button>}
        </div>
        <div className="garden-stage" aria-label="Magical garden with three collectible hearts">
          <div className="garden-moon" aria-hidden="true" />
          <div className="path" aria-hidden="true" />
          <div className="flowers" aria-hidden="true">
            {Array.from({ length: 16 }, (_, i) => <i key={i} style={{ "--i": i } as React.CSSProperties}>✦</i>)}
          </div>
          {config.hearts.map((_, index) => {
            const isCollected = collected.includes(index);
            return (
              <button
                key={index}
                className={`collectible collectible--${index + 1} ${isCollected ? "is-collected" : ""}`}
                onClick={() => collect(index)}
                disabled={isCollected}
                aria-label={isCollected ? `Heart ${index + 1} collected` : `Collect heart ${index + 1}`}
              >
                <HeartIcon collected={isCollected} />
                <span className="spark-ring" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </main>
      {messageIndex !== null && (
        <div className="note-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setMessageIndex(null)}>
          <div className="heart-note" role="dialog" aria-modal="true" aria-labelledby="heart-note-title">
            <button className="close-button" onClick={() => setMessageIndex(null)} aria-label="Close message"><Icon name="close" /></button>
            <span className="note-heart"><HeartIcon collected /></span>
            <p className="eyebrow">Heart {messageIndex + 1} of 3</p>
            <h2 id="heart-note-title">{config.hearts[messageIndex].kicker}</h2>
            <p>{config.hearts[messageIndex].message}</p>
            <button className="note-button" onClick={() => setMessageIndex(null)}>Keep this close ♡</button>
          </div>
        </div>
      )}
    </section>
  );
}

function PlaceholderArt({ index }: { index: number }) {
  return (
    <div className={`placeholder-art placeholder-art--${index + 1}`} role="img" aria-label={config.memories[index].alt}>
      <span className="placeholder-sun" />
      <span className="placeholder-hill one" />
      <span className="placeholder-hill two" />
      <span className="placeholder-figures">♥</span>
    </div>
  );
}

function MemoryImage({ memory, index }: { memory: Memory; index: number }) {
  const [failed, setFailed] = useState(false);
  if (!memory.src || failed) return <PlaceholderArt index={index} />;
  return <img src={memory.src} alt={memory.alt} onError={() => setFailed(true)} />;
}

function Memories({ onNext }: { onNext: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (selected === null) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);
  return (
    <section className="scene memories-scene" aria-labelledby="memories-title">
      <div className="paper-doodles" aria-hidden="true">✦　♡　·　✦</div>
      <main className="memories-layout">
        <div className="memories-heading story-copy">
          <p className="eyebrow">Chapter three · keepsakes</p>
          <h1 id="memories-title">Our little collection of memories.</h1>
          <p className="lead">A few moments I want to keep close.</p>
        </div>
        <div className="polaroid-grid">
          {config.memories.map((memory, index) => (
            <button className={`polaroid polaroid--${index + 1}`} key={memory.caption} onClick={() => setSelected(index)}>
              <span className="tape" aria-hidden="true" />
              <span className="photo-frame"><MemoryImage memory={memory} index={index} /></span>
              <span className="polaroid-caption">{memory.caption}</span>
              <span className="polaroid-number">0{index + 1}</span>
            </button>
          ))}
        </div>
        <div className="memories-next">
          <p>Ready for our next little adventure?</p>
          <PrimaryButton onClick={onNext}>Let's see what's next</PrimaryButton>
        </div>
      </main>
      {selected !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={config.memories[selected].caption} onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}>
          <div className="lightbox__paper">
            <button ref={closeRef} className="close-button" onClick={() => setSelected(null)} aria-label="Close photograph"><Icon name="close" /></button>
            <div className="lightbox__image"><MemoryImage memory={config.memories[selected]} index={selected} /></div>
            <p>{config.memories[selected].caption}</p>
          </div>
        </div>
      )}
    </section>
  );
}

function Gift({ opened, onOpen, onNext }: { opened: boolean; onOpen: () => void; onNext: () => void }) {
  return (
    <section className={`scene gift-scene ${opened ? "gift-is-open" : ""}`} aria-labelledby="gift-title">
      <Stars warm />
      <div className="gift-aura" aria-hidden="true" />
      <main className="gift-layout">
        <div className="gift-heading story-copy">
          <p className="eyebrow">Chapter four · almost there</p>
          <h1 id="gift-title">One last little surprise.</h1>
          <p className="lead">There's something I've been looking forward to telling you.</p>
        </div>
        {!opened ? (
          <div className="gift-action">
            <button className="gift-box" onClick={onOpen} aria-label="Open your gift">
              <span className="gift-lid"><i /></span>
              <span className="gift-body"><i /></span>
              <span className="gift-bow">♡</span>
            </button>
            <button className="gift-open-button" onClick={onOpen}>Open your gift ♡</button>
          </div>
        ) : (
          <div className="revealed-letter">
            <span className="wax-seal" aria-hidden="true">♡</span>
            <p>Because the best memories aren't only the ones we look back on…</p>
            <h2>I want to make some new ones with you.</h2>
            <PrimaryButton onClick={onNext}>Reveal our date</PrimaryButton>
          </div>
        )}
      </main>
    </section>
  );
}

function isConfigured(value: string) {
  return Boolean(value && !value.includes("["));
}

function DateInvitation({
  celebrated,
  onCelebrate,
}: {
  celebrated: boolean;
  onCelebrate: () => void;
}) {
  const canMap = /^https?:\/\//.test(config.googleMapsUrl);
  const dateReady = isConfigured(config.date) && isConfigured(config.time);
  const celebrate = () => {
    onCelebrate();
  };
  const openMap = () => canMap && window.open(config.googleMapsUrl, "_blank", "noopener,noreferrer");
  const addCalendar = () => {
    if (!dateReady) return;
    const start = new Date(`${config.date}T${config.time}`);
    if (Number.isNaN(start.getTime())) return;
    const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
    const stamp = (date: Date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const escape = (value: string) => value.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
    const body = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//A Little Adventure For Us//EN",
      "BEGIN:VEVENT", `DTSTART:${stamp(start)}`, `DTEND:${stamp(end)}`,
      `SUMMARY:${escape(config.dateActivity)}`, `LOCATION:${escape(`${config.venueName}, ${config.venueAddress}`)}`,
      `DESCRIPTION:${escape(config.personalNote)}`, "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([body], { type: "text/calendar;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "our-little-date.ics";
    link.click();
    URL.revokeObjectURL(url);
  };
  return (
    <section className={`scene invitation-scene ${celebrated ? "is-celebrated" : ""}`} aria-labelledby="invitation-title">
      <div className="botanical botanical--left" aria-hidden="true">❧</div>
      <div className="botanical botanical--right" aria-hidden="true">❧</div>
      {celebrated && <div className="confetti" aria-hidden="true">{Array.from({ length: 22 }, (_, i) => <i key={i} style={{ "--i": i } as React.CSSProperties}>♥</i>)}</div>}
      <main className="invitation-card">
        <span className="invitation-corner one" aria-hidden="true" />
        <span className="invitation-corner two" aria-hidden="true" />
        <p className="eyebrow">An invitation, just for you</p>
        <h1 id="invitation-title">It's a date! <i>♡</i></h1>
        <p className="greeting">To my favorite person, <strong>{config.girlfriendName}</strong></p>
        <p className="invitation-message">Would you let me steal a little time with you for a day filled with good food, little adventures, and new memories?</p>
        <div className="date-details">
          <div><span>Date</span><strong>{config.date}</strong></div>
          <div><span>Time</span><strong>{config.time}</strong></div>
          <div><span>Destination</span><strong>{config.venueName}</strong><small>{config.venueAddress}</small></div>
          <div><span>Our little plan</span><strong>{config.dateActivity}</strong></div>
        </div>
        <blockquote><span>Personal note</span>“{config.personalNote}”</blockquote>
        {celebrated ? (
          <div className="final-message" role="status">
            <span>♡</span>
            <strong>Yay! I can't wait to see you.</strong>
            <small>With love, {config.senderName}</small>
          </div>
        ) : (
          <PrimaryButton onClick={celebrate}>Let's make this memory ♡</PrimaryButton>
        )}
        <div className="secondary-actions">
          <button onClick={openMap} disabled={!canMap} title={!canMap ? "Add a Google Maps URL in config to enable" : undefined}><Icon name="map" />Open the map</button>
          <button onClick={addCalendar} disabled={!dateReady} title={!dateReady ? "Add a valid date and time in config to enable" : undefined}><Icon name="calendar" />Add to my calendar</button>
        </div>
      </main>
    </section>
  );
}

export default function App() {
  const [scene, setScene] = useState<Scene>("welcome");
  const [collected, setCollected] = useState<number[]>([]);
  const [giftOpened, setGiftOpened] = useState(false);
  const [celebrated, setCelebrated] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [musicNotice, setMusicNotice] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sceneIndex = scenes.indexOf(scene);

  useEffect(() => {
    if (!config.backgroundMusicPath) return;
    const audio = new Audio(config.backgroundMusicPath);
    audio.loop = true;
    audio.volume = 0.18;
    audioRef.current = audio;
    return () => { audio.pause(); audioRef.current = null; };
  }, []);

  const goTo = (next: Scene) => {
    setScene(next);
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  };
  const begin = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => setMusicOn(true)).catch(() => setMusicOn(false));
    }
    goTo("heart-garden");
  };
  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) {
      setMusicNotice(true);
      window.setTimeout(() => setMusicNotice(false), 2600);
      return;
    }
    if (musicOn) {
      audio.pause();
      setMusicOn(false);
    } else {
      audio.play().then(() => setMusicOn(true)).catch(() => setMusicOn(false));
    }
  };
  const collectHeart = (index: number) => setCollected((current) => current.includes(index) ? current : [...current, index]);

  return (
    <div className="app-shell">
      <TopBar scene={scene} musicOn={musicOn} musicAvailable={Boolean(config.backgroundMusicPath)} onMusic={toggleMusic} />
      {sceneIndex > 0 && (
        <button className={`back-button ${scene === "memories" || scene === "date-invitation" ? "back-button--ink" : ""}`} onClick={() => goTo(scenes[sceneIndex - 1])}>
          <Icon name="back" size={17} />Back
        </button>
      )}
      {musicNotice && <div className="toast" role="status">Music is ready when you add a local audio file.</div>}
      <div key={scene} className="scene-transition">
        {scene === "welcome" && <Welcome onNext={begin} />}
        {scene === "heart-garden" && <HeartGarden collected={collected} onCollect={collectHeart} onContinue={() => goTo("memories")} />}
        {scene === "memories" && <Memories onNext={() => goTo("gift")} />}
        {scene === "gift" && <Gift opened={giftOpened} onOpen={() => setGiftOpened(true)} onNext={() => goTo("date-invitation")} />}
        {scene === "date-invitation" && <DateInvitation celebrated={celebrated} onCelebrate={() => setCelebrated(true)} />}
      </div>
    </div>
  );
}
