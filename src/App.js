import { useEffect, useMemo, useState } from "react";

const couplePhoto = "/images/heaven-keyza-1.jpg";
const portraitPhoto = "/images/heaven-keyza-2.jpg";
const playfulPhoto = "/images/heaven-keyza-3.jpg";
const handsPhoto = "/images/heaven-keyza-4.jpg";
const storyPhoto = "/images/heaven-keyza-5.jpg";

function Icon({ name, size = 20 }) {
  const paths = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    copy: <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></>,
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    send: <><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></>,
    x: <><path d="m6 6 12 12M18 6 6 18" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function Monogram() {
  return (
    <div className="monogram" aria-label="Heaven dan Keyza">
      <span>H</span><i>&</i><span>K</span>
    </div>
  );
}

function SectionTitle({ eyebrow, children }) {
  return (
    <div className="section-title reveal">
      <span>{eyebrow}</span>
      <h2>{children}</h2>
      <div className="title-line"><i /></div>
    </div>
  );
}

function Countdown() {
  const target = useMemo(() => new Date("2026-10-18T09:00:00+07:00").getTime(), []);
  const calculate = () => {
    const distance = Math.max(0, target - Date.now());
    return {
      Hari: Math.floor(distance / 86_400_000),
      Jam: Math.floor((distance / 3_600_000) % 24),
      Menit: Math.floor((distance / 60_000) % 60),
      Detik: Math.floor((distance / 1000) % 60),
    };
  };
  const [time, setTime] = useState(calculate);

  useEffect(() => {
    const timer = window.setInterval(() => setTime(calculate()), 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  return (
    <div className="countdown" aria-label="Hitung mundur menuju hari pernikahan">
      {Object.entries(time).map(([label, value]) => (
        <div key={label}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

const initialWishes = [
  { name: "Nadia & Bima", text: "Turut berbahagia! Semoga menjadi keluarga yang selalu dipenuhi cinta dan cerita baik.", time: "2 jam lalu" },
  { name: "Raka Pratama", text: "Selamat menempuh hidup baru. Sampai bertemu di hari bahagia kalian!", time: "5 jam lalu" },
];

export default function App() {
  const [opened, setOpened] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [attending, setAttending] = useState("Hadir");
  const [rsvpSent, setRsvpSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [wishes, setWishes] = useState(initialWishes);
  const [wishName, setWishName] = useState("");
  const [wishText, setWishText] = useState("");

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [opened]);

  useEffect(() => {
    if (!opened) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")),
      { threshold: 0.14 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [opened]);

  const submitRsvp = (event) => {
    event.preventDefault();
    setRsvpSent(true);
  };

  const submitWish = (event) => {
    event.preventDefault();
    if (!wishName.trim() || !wishText.trim()) return;
    setWishes([{ name: wishName, text: wishText, time: "Baru saja" }, ...wishes]);
    setWishName("");
    setWishText("");
  };

  const copyAccount = async () => {
    await navigator.clipboard?.writeText("0140924518");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main>
      <div className={`invitation-cover ${opened ? "is-open" : ""}`} aria-hidden={opened}>
        <div className="cover-photo" style={{ backgroundImage: `url(${couplePhoto})` }} />
        <div className="cover-panel">
          <div className="cover-top">
            <Monogram />
            <span className="issue">18 — 10 — 26</span>
          </div>
          <div className="cover-copy">
            <p className="eyebrow">Undangan Pernikahan</p>
            <h1>Heaven <em>&</em><br />Keyza</h1>
            <p>Kepada Bapak/Ibu/Saudara/i yang terkasih, kami mengundang Anda menjadi bagian dari hari bahagia kami.</p>
            <button className="primary-btn" onClick={() => setOpened(true)}>
              <Icon name="mail" size={18} /> Buka Undangan
            </button>
          </div>
          <p className="cover-foot">Dengan penuh cinta, kami menanti kehadiran Anda</p>
        </div>
      </div>

      <header className="site-header">
        <a href="#home" className="brand"><Monogram /></a>
        <nav className={menuOpen ? "open" : ""}>
          {[
            ["home", "Beranda"],
            ["story", "Cerita Kami"],
            ["event", "Acara"],
            ["gallery", "Galeri"],
            ["rsvp", "RSVP"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Tutup menu" : "Buka menu"}>
          <Icon name={menuOpen ? "x" : "menu"} />
        </button>
      </header>

      <section id="home" className="hero">
        <div className="hero-bg" style={{ backgroundImage: `url(${couplePhoto})` }} />
        <div className="hero-overlay" />
        <div className="hero-content reveal">
          <p className="eyebrow">The wedding of</p>
          <h1>Heaven <span>&</span> Keyza</h1>
          <p className="hero-date">Minggu, 18 Oktober 2026 · Surabaya</p>
          <a className="outline-btn" href="#event">Lihat Detail <Icon name="arrow" size={18} /></a>
        </div>
        <div className="scroll-note"><span />Gulir untuk menjelajah</div>
      </section>

      <section className="welcome section-pad">
        <div className="botanical botanical-left">❧</div>
        <div className="welcome-copy reveal">
          <p className="script">Dengan segenap hati</p>
          <blockquote>
            “Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu agar kamu merasa tenteram kepadanya.”
          </blockquote>
          <p>QS. Ar-Rum · 21</p>
        </div>
      </section>

      <section id="story" className="story section-pad">
        <SectionTitle eyebrow="Dua jiwa, satu cerita">Perjalanan Kami</SectionTitle>
        <div className="story-grid">
          <div className="story-photo reveal"><img src={storyPhoto} alt="Heaven dan Keyza menikmati waktu bersama" /></div>
          <div className="timeline reveal">
            <article>
              <span>2019</span>
              <div><h3>Pertama Bertemu</h3><p>Sebuah pertemuan sederhana di sudut toko buku membawa kami pada percakapan yang tak pernah benar-benar usai.</p></div>
            </article>
            <article>
              <span>2022</span>
              <div><h3>Tumbuh Bersama</h3><p>Kami belajar bahwa cinta hadir dalam tawa, perjalanan panjang, dan keberanian untuk saling memilih setiap hari.</p></div>
            </article>
            <article>
              <span>2025</span>
              <div><h3>Satu Tujuan</h3><p>Di bawah langit senja, satu pertanyaan mengantar kami menuju awal dari selamanya.</p></div>
            </article>
          </div>
        </div>
      </section>

      <section className="couple section-pad">
        <div className="couple-card reveal">
          <p className="eyebrow">Mempelai pria</p>
          <h2>Heaven</h2>
          <p>Putra pertama dari<br /><strong>Bapak Hadi & Ibu Ratna</strong></p>
          <a href="#" aria-label="Instagram Heaven">@heaven</a>
        </div>
        <div className="couple-mark reveal"><span>H</span><i>&</i><span>K</span></div>
        <div className="couple-card reveal">
          <p className="eyebrow">Mempelai wanita</p>
          <h2>Keyza</h2>
          <p>Putri kedua dari<br /><strong>Bapak Bagus & Ibu Mira</strong></p>
          <a href="#" aria-label="Instagram Keyza">@keyza</a>
        </div>
      </section>

      <section id="event" className="event section-pad">
        <SectionTitle eyebrow="Simpan tanggalnya">Hari Bahagia</SectionTitle>
        <div className="date-display reveal">
          <div><span>Minggu</span><strong>18</strong><span>Oktober 2026</span></div>
          <i />
          <p>Kami berharap Anda berkenan hadir dan turut merayakan babak baru dalam perjalanan kami.</p>
        </div>
        <Countdown />
        <div className="event-cards">
          <article className="event-card reveal">
            <div className="event-number">01</div>
            <p className="eyebrow">Akad Nikah</p>
            <h3>09.00 — 10.00 WIB</h3>
            <p><Icon name="location" size={18} /> Pondok Plaza Pakuwon City<br />Surabaya, Jawa Timur</p>
            <a href="https://www.google.com/maps/search/?api=1&query=Pondok+Plaza+Pakuwon+City+Surabaya" target="_blank" rel="noreferrer">Buka Peta <Icon name="arrow" size={16} /></a>
          </article>
          <article className="event-card dark reveal">
            <div className="event-number">02</div>
            <p className="eyebrow">Resepsi</p>
            <h3>11.00 — 14.00 WIB</h3>
            <p><Icon name="location" size={18} /> Pondok Plaza Pakuwon City<br />Surabaya, Jawa Timur</p>
            <a href="https://www.google.com/maps/search/?api=1&query=Pondok+Plaza+Pakuwon+City+Surabaya" target="_blank" rel="noreferrer">Buka Peta <Icon name="arrow" size={16} /></a>
          </article>
        </div>
        <a className="calendar-link reveal" href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan%20Heaven%20dan%20Keyza&dates=20261018T020000Z/20261018T070000Z&location=Pondok%20Plaza%20Pakuwon%20City%2C%20Surabaya" target="_blank" rel="noreferrer">
          <Icon name="calendar" size={18} /> Tambahkan ke Kalender
        </a>
      </section>

      <section id="gallery" className="gallery section-pad">
        <SectionTitle eyebrow="Potongan kenangan">Galeri Cerita</SectionTitle>
        <div className="gallery-grid reveal">
          <figure className="gallery-main"><img src={couplePhoto} alt="Heaven dan Keyza tersenyum bersama" /><figcaption>Dalam setiap langkah, bersamamu.</figcaption></figure>
          <img src={portraitPhoto} alt="Potret hangat Heaven dan Keyza" />
          <img src={playfulPhoto} alt="Momen ceria Heaven dan Keyza" />
          <img src={storyPhoto} alt="Heaven dan Keyza berjalan bersama" />
        </div>
      </section>

      <section id="rsvp" className="rsvp section-pad">
        <div className="rsvp-intro reveal">
          <p className="eyebrow">Konfirmasi kehadiran</p>
          <h2>Akankah kami melihat senyum Anda di sana?</h2>
          <p>Mohon konfirmasi kehadiran sebelum 1 Oktober 2026. Kehadiran dan doa Anda adalah hadiah terindah bagi kami.</p>
        </div>
        <div className="rsvp-box reveal">
          {rsvpSent ? (
            <div className="success-state">
              <span><Icon name="check" size={28} /></span>
              <h3>Terima kasih!</h3>
              <p>Konfirmasi Anda telah kami terima. Kami tidak sabar merayakan hari ini bersama Anda.</p>
              <button onClick={() => setRsvpSent(false)}>Ubah jawaban</button>
            </div>
          ) : (
            <form onSubmit={submitRsvp}>
              <label>Nama lengkap<input required placeholder="Tulis nama Anda" /></label>
              <label>Konfirmasi kehadiran</label>
              <div className="choice-row">
                {["Hadir", "Belum pasti", "Tidak hadir"].map((choice) => (
                  <button type="button" key={choice} className={attending === choice ? "selected" : ""} onClick={() => setAttending(choice)}>
                    <span>{attending === choice && <Icon name="check" size={14} />}</span>{choice}
                  </button>
                ))}
              </div>
              {attending === "Hadir" && (
                <label>Jumlah tamu
                  <select defaultValue="1"><option value="1">1 orang</option><option value="2">2 orang</option></select>
                </label>
              )}
              <label>Pesan untuk kami<textarea rows={3} placeholder="Tuliskan doa atau pesan singkat..." /></label>
              <button className="primary-btn" type="submit">Kirim Konfirmasi <Icon name="send" size={17} /></button>
            </form>
          )}
        </div>
      </section>

      <section className="gift section-pad">
        <div className="gift-photo reveal"><img src={handsPhoto} alt="Heaven dan Keyza bergandengan tangan" /></div>
        <div className="gift-copy reveal">
          <p className="eyebrow">Tanda kasih</p>
          <h2>Hadiah Pernikahan</h2>
          <p>Doa restu dan kehadiran Anda sudah lebih dari cukup. Namun jika ingin berbagi tanda kasih, Anda dapat mengirimkannya melalui:</p>
          <div className="bank-card">
            <div><span>Bank Central Asia</span><strong>0140 924 518</strong><small>a.n. Keyza</small></div>
            <button onClick={copyAccount}><Icon name={copied ? "check" : "copy"} size={18} />{copied ? "Tersalin" : "Salin"}</button>
          </div>
        </div>
      </section>

      <section className="wishes section-pad">
        <SectionTitle eyebrow="Sepatah dua patah">Kirimkan Doa</SectionTitle>
        <div className="wish-layout">
          <form className="wish-form reveal" onSubmit={submitWish}>
            <label>Nama<input value={wishName} onChange={(e) => setWishName(e.target.value)} required placeholder="Nama Anda" /></label>
            <label>Ucapan & doa<textarea value={wishText} onChange={(e) => setWishText(e.target.value)} required rows={5} placeholder="Tulis sesuatu yang hangat..." /></label>
            <button className="primary-btn" type="submit">Kirim Ucapan <Icon name="send" size={17} /></button>
          </form>
          <div className="wish-list reveal">
            {wishes.map((wish, index) => (
              <article key={`${wish.name}-${index}`}>
                <div className="wish-avatar">{wish.name.charAt(0)}</div>
                <div><h3>{wish.name}</h3><p>{wish.text}</p><span>{wish.time}</span></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <Monogram />
        <p>Merupakan kebahagiaan bagi kami apabila Anda berkenan hadir.</p>
        <h2>Heaven <i>&</i> Keyza</h2>
        <span>18 · 10 · 2026</span>
        <div className="footer-line" />
      </footer>
    </main>
  );
}
