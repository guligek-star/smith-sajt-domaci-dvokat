import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import {
  ArrowUpRight,
  Asterisk,
  Building2,
  ChevronDown,
  ChevronRight,
  Clock3,
  FileText,
  Globe2,
  Landmark,
  Linkedin,
  Mail,
  Menu,
  Scale,
  ShieldCheck,
  X,
} from 'lucide-react';

const images = {
  office: 'https://images.pexels.com/photos/6077091/pexels-photo-6077091.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  meeting: 'https://images.pexels.com/photos/7876197/pexels-photo-7876197.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  consultation: 'https://images.pexels.com/photos/8112166/pexels-photo-8112166.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  architecture: 'https://images.pexels.com/photos/12302766/pexels-photo-12302766.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  building: 'https://images.pexels.com/photos/11615043/pexels-photo-11615043.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  portraitA: 'https://images.pexels.com/photos/4427501/pexels-photo-4427501.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  portraitB: 'https://images.pexels.com/photos/4427622/pexels-photo-4427622.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  portraitC: 'https://images.pexels.com/photos/7841431/pexels-photo-7841431.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

const navItems = [
  ['O nama', '/o-nama'],
  ['Usluge', '/usluge'],
  ['Korporativno pravo', '/korporativno-pravo'],
  ['Naš pristup', '/nas-pristup'],
  ['Kontakt', '/kontakt'],
];

const services = [
  'Osnivanje i registracija preduzeća',
  'Spajanje i akvizicije',
  'Pregovaranje i sporazumi',
  'Građansko pravo',
  'Radno pravo',
  'Intelektualna svojina',
  'Poresko pravo',
  'Arbitraža',
  'Medijacija',
  'Sudski postupak',
  'Prava međunarodnog poslovanja',
  'Pravna međunarodna trgovina',
];

function getPath(): string {
  return window.location.pathname.replace(/\/$/, '') || '/';
}

function navigate(path: string): void {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a className={`brand ${light ? 'brand-light' : ''}`} href="/" onClick={(event) => { event.preventDefault(); navigate('/'); }}>
      <span className="brand-mark"><Asterisk size={18} strokeWidth={1.6} /></span>
      <span><strong>SMITH</strong><em>&amp; ASSOCIATES</em></span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className={`main-nav ${open ? 'nav-open' : ''}`}>
          {navItems.map(([label, path]) => (
            <a key={path} href={path} onClick={(event) => { event.preventDefault(); setOpen(false); navigate(path); }}>{label}</a>
          ))}
          <a className="header-cta" href="/kontakt" onClick={(event) => { event.preventDefault(); setOpen(false); navigate('/kontakt'); }}>Zakažite konsultacije <ArrowUpRight size={15} /></a>
        </nav>
        <button className="menu-toggle" type="button" aria-label="Otvori meni" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-intro"><Brand light /><p>Pravo koje razume<br />vašu ambiciju.</p></div>
        <div><span className="footer-label">Kancelarija</span><p>Vuka Karadžića 12<br />11000 Beograd, Srbija</p><p>+381 11 328 74 20<br />office@smith-associates.rs</p></div>
        <div><span className="footer-label">Navigacija</span>{navItems.slice(0, 4).map(([label, path]) => <a key={path} href={path} onClick={(event) => { event.preventDefault(); navigate(path); }}>{label}</a>)}</div>
        <div><span className="footer-label">Pratite nas</span><a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a><a href="mailto:office@smith-associates.rs"><Mail size={16} /> E-mail</a></div>
      </div>
      <div className="footer-bottom"><span>© 2024 Smith &amp; Associates</span><span>Advokatska kancelarija</span><span>Politika privatnosti</span></div>
    </footer>
  );
}

function Page({ children }: { children: ReactNode }) {
  return <><Header /><main>{children}</main><Footer /></>;
}

function Eyebrow({ children }: { children: ReactNode }) { return <div className="eyebrow"><span className="eyebrow-line" />{children}</div>; }
function SectionTitle({ eyebrow, title, body, align = 'left' }: { eyebrow: string; title: string; body?: string; align?: 'left' | 'right' }) { return <div className={`section-heading align-${align}`}><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2>{body && <p>{body}</p>}</div>; }
function ButtonLink({ children, path = '/kontakt', secondary = false }: { children: ReactNode; path?: string; secondary?: boolean }) { return <a className={`button-link ${secondary ? 'button-secondary' : ''}`} href={path} onClick={(event) => { event.preventDefault(); navigate(path); }}>{children}<ArrowUpRight size={16} /></a>; }

function Home() {
  return <Page>
    <section className="hero-home">
      <div className="hero-copy"><Eyebrow>Advokatska kancelarija / Beograd</Eyebrow><h1>Pravo sa<br /><i>širim pogledom.</i></h1><p>Smith &amp; Associates pruža promišljenu pravnu podršku ljudima i kompanijama koje stvaraju ono što dolazi.</p><div className="hero-actions"><ButtonLink>Zakažite konsultacije</ButtonLink><ButtonLink path="/usluge" secondary>Naše usluge <ChevronRight size={15} /></ButtonLink></div></div>
      <div className="hero-visual"><img src={images.architecture} alt="Detalj savremene poslovne arhitekture" /><div className="hero-note">01 <span /> Beograd · London · Region</div></div>
      <div className="hero-foot"><span>Od 2008.</span><span>Nezavisna kancelarija za kompleksne izazove.</span><span>Scroll to explore ↓</span></div>
    </section>
    <section className="intro-statement page-width"><div className="statement-number">/ 01</div><div><h2>Jasnoća u složenim<br /><i>situacijama.</i></h2><p>Pravo nije samo sistem pravila. Ono je prostor za dobre odluke. Naš posao je da taj prostor učinimo razumljivim, sigurnim i otvorenim za vaš sledeći korak.</p><ButtonLink path="/o-nama" secondary>Upoznajte nas</ButtonLink></div></section>
    <section className="practice-section"><div className="page-width"><SectionTitle eyebrow="01 / Oblasti rada" title="Znanje koje pokreće važne odluke." body="Od prvog ugovora do najvažnije transakcije, naš tim spaja stručnost različitih oblasti u jednu jasnu strategiju." /><div className="practice-grid">{[['01','Korporativno pravo','Od osnivanja do rasta, čuvamo strukturu vašeg poslovanja.'],['02','Sporovi','Kada je važno ostati pribran, zastupamo vaše interese sa preciznošću.'],['03','Radno pravo','Odnosi koji su uređeni dobro, ostaju dobri i kada postanu složeni.'],['04','Intelektualna svojina','Ideje su imovina. Pomažemo vam da ih zaštitite i razvijate.']].map(([number, title, text]) => <a className="practice-item" key={number} href="/usluge" onClick={(event) => { event.preventDefault(); navigate('/usluge'); }}><span className="item-number">{number}</span><div><h3>{title}</h3><p>{text}</p></div><ArrowUpRight size={18} /></a>)}</div></div></section>
    <section className="split-feature page-width"><div className="split-image"><img src={images.office} alt="Biblioteka i radni sto u advokatskoj kancelariji" /></div><div className="split-copy"><Eyebrow>02 / Zašto Smith &amp; Associates</Eyebrow><h2>Partnerstvo koje<br /><i>ima smisla.</i></h2><p>Za svaki predmet biramo pravi tim, pravi tempo i pravi nivo uključenosti. Bez gotovih odgovora i bez nepotrebne distance.</p><ul className="check-list"><li><ShieldCheck size={18} /> Stručnost koja se vidi u detaljima</li><li><ShieldCheck size={18} /> Direktna komunikacija bez posrednika</li><li><ShieldCheck size={18} /> Perspektiva koja prelazi granice</li></ul><ButtonLink path="/nas-pristup" secondary>Naš pristup</ButtonLink></div></section>
    <NewsSection />
    <ConsultationBand />
  </Page>;
}

function NewsSection() { const news = [{ date: '12.06.2024', title: 'Novi okvir za održivo poslovanje u Srbiji', img: images.building }, { date: '28.05.2024', title: 'Šta donosi novi Zakon o zaštiti podataka?', img: images.meeting }, { date: '07.05.2024', title: 'Transakcije u regionu: prilika ili izazov?', img: images.architecture }]; return <section className="news-section page-width"><div className="news-head"><SectionTitle eyebrow="03 / Iz kancelarije" title="U fokusu." /><ButtonLink path="/kontakt" secondary>Postanimo partneri</ButtonLink></div><div className="news-grid">{news.map((item) => <article className="news-item" key={item.title}><img src={item.img} alt="" /><span>{item.date}</span><h3>{item.title}</h3><a href="/kontakt" onClick={(event) => { event.preventDefault(); navigate('/kontakt'); }}>Pročitaj više <ArrowUpRight size={14} /></a></article>)}</div></section> }

function ConsultationBand() { return <section className="consultation-band"><div className="page-width consultation-inner"><div><Eyebrow>Razgovarajmo</Eyebrow><h2>Vaša sledeća<br /><i>odluka počinje ovde.</i></h2></div><div><p>Recite nam šta vam je važno. Prvi razgovor je prilika da zajedno sagledamo širu sliku.</p><ButtonLink>Zakažite konsultacije</ButtonLink></div></div></section> }

function InnerHero({ eyebrow, title, intro, image, dark = false }: { eyebrow: string; title: ReactNode; intro: string; image: string; dark?: boolean }) { return <section className={`inner-hero ${dark ? 'inner-hero-dark' : ''}`}><div className="page-width inner-hero-grid"><div><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{intro}</p></div><div className="inner-hero-image"><img src={image} alt="" /></div></div></section> }

function About() { return <Page><InnerHero eyebrow="O kancelariji / 01" title={<>Ljudi iza<br /><i>pravne forme.</i></>} intro="Smith & Associates je nezavisna advokatska kancelarija posvećena radu sa ljudima, kompanijama i idejama koje imaju potencijal da menjaju svet oko sebe." image={images.meeting} /><section className="about-manifesto page-width"><div className="statement-number">/ 02</div><div><h2>Ne verujemo u<br /><i>univerzalna rešenja.</i></h2><p>Verujemo u pažljivo slušanje, u odvažno postavljanje pravih pitanja i u savet koji je istovremeno stručan i razumljiv. Od 2008. godine gradimo kancelariju u kojoj se visoki standardi i ljudski pristup ne isključuju.</p><p>Naši klijenti dolaze zbog pravnog znanja, a ostaju zbog poverenja.</p></div></section><section className="history-section"><div className="page-width history-grid"><div><Eyebrow>Naša priča</Eyebrow><h2>Jedna kancelarija.<br /><i>Mnogo perspektiva.</i></h2></div><div className="timeline"><div><strong>2008</strong><p>Osnovana kancelarija Smith &amp; Associates u Beogradu.</p></div><div><strong>2014</strong><p>Otvaramo praksu usmerenu na regionalne transakcije.</p></div><div><strong>Danas</strong><p>Tim od 12 pravnika, sa partnerima širom Evrope.</p></div></div></div></section><TeamSection /><section className="about-values page-width"><SectionTitle eyebrow="04 / Naše vrednosti" title="Principi koji se ne menjaju." /><div className="values-row"><div><span>01</span><h3>Posvećenost</h3><p>Svaki predmet dobija našu punu pažnju.</p></div><div><span>02</span><h3>Stručnost</h3><p>Znanje pretvaramo u odluke koje imaju težinu.</p></div><div><span>03</span><h3>Pristupačnost</h3><p>Uvek znate gde smo i šta je sledeće.</p></div></div></section></Page> }

function TeamSection() { const team = [['Ana Marković','Partner / Korporativno pravo', images.portraitA], ['Marko Ilić','Partner / Sporovi', images.portraitB], ['Jelena Petrović','Savetnik / Radno pravo', images.portraitC]]; return <section className="team-section page-width"><div className="team-head"><SectionTitle eyebrow="03 / Tim" title="Stručnjaci na vašoj strani." body="Različita iskustva. Isti standard." /><ButtonLink path="/kontakt" secondary>Kontaktirajte nas</ButtonLink></div><div className="team-grid">{team.map(([name, role, img]) => <div className="team-member" key={name}><img src={img} alt={name} /><div><h3>{name}</h3><p>{role}</p></div></div>)}</div></section> }

function Services() { return <Page><InnerHero eyebrow="Usluge / 01" title={<>Vaš vodič<br /><i>kroz pravo.</i></>} intro="Pravni savet je vredan onoliko koliko vam pomaže da se krećete sigurnije. Naše usluge su organizovane oko vaših stvarnih potreba, ne oko pravnih kategorija." image={images.consultation} /><section className="directory-section page-width"><div className="directory-intro"><Eyebrow>02 / Naše usluge</Eyebrow><h2>Prostor za<br /><i>dobru odluku.</i></h2><p>Od svakodnevnih pitanja do prelomnih trenutaka, tu smo kada je važno videti i detalj i širu sliku.</p></div><div className="service-directory">{services.map((service, index) => <a href="/kontakt" onClick={(event) => { event.preventDefault(); navigate('/kontakt'); }} key={service}><span>{String(index + 1).padStart(2, '0')}</span><strong>{service}</strong><ArrowUpRight size={17} /></a>)}</div></section><section className="service-image-break"><img src={images.office} alt="Detalj kancelarijske biblioteke" /><div><Eyebrow>03 / Pravni savet</Eyebrow><h2>Ne čekajte da<br /><i>postane hitno.</i></h2><ButtonLink>Zakažite konsultacije</ButtonLink></div></section><FormSection /></Page> }

function Corporate() { return <Page><section className="corporate-hero"><div className="corporate-hero-img"><img src={images.building} alt="Staklena poslovna zgrada" /></div><div className="corporate-hero-copy"><Eyebrow>Specijalizovana praksa / 01</Eyebrow><h1>Korporativno<br /><i>pravo.</i></h1><p>Pomagati poslu da raste znači razumeti i njegovu ambiciju i njegov rizik.</p><ButtonLink>Zakažite razgovor</ButtonLink></div></section><section className="corporate-intro page-width"><div><Eyebrow>02 / Naša specijalnost</Eyebrow><h2>Pravo koje<br /><i>drži strukturu.</i></h2></div><div><p>Kompanije se menjaju brzo. Mi pomažemo da pravni temelji ostanu čvrsti dok se strategija razvija. Od osnivanja do prekogranične akvizicije, radimo blizu vašeg poslovanja.</p><p>Naš tim govori jezikom preduzetnika, uprave i investitora — i uvek traži rešenje koje je primenljivo u praksi.</p></div></section><section className="corporate-modules page-width"><div className="corporate-module module-wide"><span>01</span><div><h3>Spajanja i akvizicije</h3><p>Vodimo transakcije koje menjaju pravac poslovanja — od dubinske analize do poslednjeg potpisa.</p><a href="/kontakt" onClick={(event) => { event.preventDefault(); navigate('/kontakt'); }}>Saznajte više <ArrowUpRight size={15} /></a></div></div><div className="corporate-module module-tall"><span>02</span><div><h3>Osnivanje i registracija</h3><p>Prava struktura na početku ostavlja više prostora za rast.</p><a href="/kontakt" onClick={(event) => { event.preventDefault(); navigate('/kontakt'); }}>Saznajte više <ArrowUpRight size={15} /></a></div></div><div className="corporate-module module-light"><span>03</span><div><h3>Pregovori i ugovori</h3><p>Zaštita vaših interesa počinje pre nego što razgovor postane dokument.</p><a href="/kontakt" onClick={(event) => { event.preventDefault(); navigate('/kontakt'); }}>Saznajte više <ArrowUpRight size={15} /></a></div></div></section><section className="benefit-strip"><div className="page-width"><Eyebrow>04 / Zašto mi</Eyebrow><h2>Mirnija odluka.<br /><i>Bolji posao.</i></h2><div className="benefit-list"><span><Scale /> Preciznost</span><span><Globe2 /> Šira perspektiva</span><span><Building2 /> Partnerstvo</span></div></div></section></Page> }

function Approach() { const [active, setActive] = useState<number | null>(null); const questions = ['Koje pravne usluge pruža Smith & Associates?', 'Da li radite sa međunarodnim klijentima?', 'Kako vas mogu kontaktirati?', 'Šta vas izdvaja od drugih kancelarija?']; return <Page><section className="approach-hero page-width"><div className="approach-title"><Eyebrow>Naš pristup / 01</Eyebrow><h1>Pravo zasnovano<br /><i>na poverenju.</i></h1></div><div className="approach-hero-image"><img src={images.consultation} alt="Razgovor advokata i klijenta" /><span>Dobro savetovanje<br />počinje slušanjem.</span></div></section><section className="approach-intro page-width"><div className="large-quote">“</div><div><h2>Ozbiljnost ne mora<br />značiti <i>distancu.</i></h2><p>Najbolji pravni rad nastaje kada su znanje i empatija za istim stolom. Zato naše klijente upoznajemo pre nego što upoznamo njihov predmet.</p><ButtonLink path="/o-nama" secondary>Više o kancelariji</ButtonLink></div></section><section className="approach-dark"><div className="page-width approach-dark-grid"><div><Eyebrow>02 / Međunarodno iskustvo</Eyebrow><h2>Granice su<br /><i>pomerljive.</i></h2></div><div><p>Naše poslovanje je lokalno, ali naše razumevanje nije ograničeno adresom. Kroz mrežu pouzdanih partnera govorimo u ime klijenata širom regiona i Evrope.</p><div className="locations"><span>Beograd</span><span>London</span><span>Budimpešta</span><span>Zagreb</span></div></div></div></section><section className="clients-section page-width"><SectionTitle eyebrow="03 / Klijenti" title="Za koga radimo." body="Pravo prilagođavamo vašoj fazi, industriji i načinu razmišljanja." /><div className="client-types"><div><Landmark size={22} /><h3>Međunarodne korporacije</h3><p>Za timove koji posluju preko granica.</p></div><div><Asterisk size={22} /><h3>Startapi</h3><p>Za ideje koje tek pronalaze formu.</p></div><div><Building2 size={22} /><h3>Mala i srednja preduzeća</h3><p>Za preduzeća koja rastu promišljeno.</p></div><div><FileText size={22} /><h3>Individualni preduzetnici</h3><p>Za ljude koji svoje ime stavljaju na posao.</p></div></div></section><section className="faq-section page-width"><div><Eyebrow>04 / Česta pitanja</Eyebrow><h2>Odgovori na<br /><i>važna pitanja.</i></h2></div><div className="faq-list">{questions.map((question, index) => <div className={`faq-item ${active === index ? 'faq-active' : ''}`} key={question}><button type="button" onClick={() => setActive(active === index ? null : index)}><span>{question}</span><ChevronDown size={18} /></button>{active === index && <p>{index === 0 ? 'Pružamo podršku u oblastima korporativnog, građanskog, radnog i intelektualnog prava, kao i u sporovima i međunarodnim transakcijama.' : index === 1 ? 'Da. Sarađujemo sa klijentima iz regiona i inostranstva, kao i sa mrežom partnera na ključnim tržištima.' : index === 2 ? 'Putem telefona, e-maila ili kontakt forme. Javljamo se u najkraćem roku i dogovaramo prvi razgovor.' : 'Spajamo stručnost sa pristupačnošću. Važno nam je da razumete ne samo šta predlažemo, već i zašto.'}</p>}</div>)}</div></section></Page> }

function FormSection() { const [sent, setSent] = useState(false); const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); }; return <section className="form-section page-width"><div><Eyebrow>04 / Prvi korak</Eyebrow><h2>Razgovarajmo o<br /><i>vašem slučaju.</i></h2><p>Opišite nam ukratko šta vam je potrebno. Odgovorićemo vam u roku od jednog radnog dana.</p></div>{sent ? <div className="form-success"><ShieldCheck size={30} /><h3>Hvala na poverenju.</h3><p>Vaš upit je uspešno poslat. Javićemo vam se uskoro.</p><button type="button" onClick={() => setSent(false)}>Pošalji novi upit</button></div> : <form onSubmit={handleSubmit}><div className="form-row"><label>Ime<input required name="name" placeholder="Vaše ime i prezime" /></label><label>Email<input required type="email" name="email" placeholder="vas@email.com" /></label></div><label>Tema<input required name="subject" placeholder="Kako možemo da pomognemo?" /></label><label>Poruka<textarea required name="message" placeholder="Napišite nam nekoliko rečenica..." rows={4} /></label><button className="button-link" type="submit">Pošalji upit <ArrowUpRight size={16} /></button></form>}</section> }

function Contact() { return <Page><section className="contact-page page-width"><div className="contact-copy"><Eyebrow>Kontakt / 01</Eyebrow><h1>Otvorimo<br /><i>razgovor.</i></h1><p>Za pravna pitanja, poslovne izazove ili samo dobar početak — naša kancelarija je tu.</p><div className="contact-details"><div><span>Adresa</span><p>Vuka Karadžića 12<br />11000 Beograd, Srbija</p></div><div><span>Kontakt</span><p>+381 11 328 74 20<br />office@smith-associates.rs</p></div><div><span>Radno vreme</span><p>Ponedeljak — Petak<br />09:00 — 17:00</p></div></div></div><div className="contact-side"><div className="map-card"><div className="map-grid"></div><span className="map-pin"><Asterisk size={16} /></span><div className="map-label">Smith &amp; Associates<br /><small>Vuka Karadžića 12</small></div></div><div className="contact-note"><Clock3 size={18} /><span>Prvi razgovor je prilika da<br />upoznamo vaš slučaj.</span></div></div></section><FormSection /></Page> }

function App() {
  const [path, setPath] = useState(getPath());
  useEffect(() => {
    const onPopState = () => setPath(getPath());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);
  let page: ReactNode = <Home />;
  if (path === '/o-nama') page = <About />;
  if (path === '/usluge') page = <Services />;
  if (path === '/korporativno-pravo') page = <Corporate />;
  if (path === '/nas-pristup') page = <Approach />;
  if (path === '/kontakt') page = <Contact />;
  return page;
}

export default App;
