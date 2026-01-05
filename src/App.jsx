import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Image as ImageIcon, Sparkles, Scale, CheckCircle2, 
  Fingerprint, Utensils, Plane, Ticket, CreditCard, 
  Gavel, Lock, Unlock, ArrowRight, X, Gem, Crown, Dna,
  ChevronLeft, ChevronRight, Star, FlaskConical, Timer, Wifi,
  BookOpen, Moon, Sun, Music, Thermometer, Zap
} from 'lucide-react';

import myPhoto1 from './assets/photo1.jpg'; 
import myPhoto2 from './assets/photo2.jpg';
import myPhoto3 from './assets/photo3.jpg';

// --- ДАНІ ---

const START_DATE = new Date(2022, 7, 1); 
const NEXT_MEETING = new Date(2024, 5, 1); // Червень 2024

// Передбачення для "Карти Дня"
const FORTUNES = [
  "Сьогодні тобі можна все. Абсолютно все.",
  "Зірки кажуть, що дядя сьогодні має скинути гроші на суші.",
  "Ідеальний день, щоб нічого не робити і бути красивою.",
  "Твоя посмішка сьогодні врятує чийсь день (мій).",
  "Сьогодні ти не принцеса, сьогодні ти QUEEN.",
  "Увага! Очікуються опади у вигляді поцілунків (онлайн).",
  "Книга сама себе не замовить. Це знак."
];

// Купони для Банку
const COUPONS = [
  {
    id: 'sushi',
    title: 'Суші безліміт',
    desc: 'Сертифікат на замовлення будь-якого сету суші. Дядя оплачує, тьотя насолоджується.',
    finePrint: 'Діє 24/7. Включає напої та десерт.',
    icon: <Utensils className="w-10 h-10 text-white" />,
    gradient: 'from-orange-400 to-red-500',
    texture: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.2), transparent)'
  },
  {
    id: 'right',
    title: 'Ти права',
    desc: 'Джокер. Автоматична перемога в суперечці. Дядя погоджується і вибачається.',
    finePrint: 'Миттєва дія. Не підлягає оскарженню.',
    icon: <Crown className="w-10 h-10 text-white" />,
    gradient: 'from-yellow-400 to-amber-600',
    texture: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)'
  },
  {
    id: 'experiments',
    title: 'BookTok експерименти',
    desc: 'Після того, як тьотя прочитала "якусь" книжку, дядя зобов\'язується стати об\'єктом для відтворення улюблених сцен.',
    finePrint: 'Включає рольові ігри та повну покору дяді.',
    icon: <BookOpen className="w-10 h-10 text-white" />,
    gradient: 'from-pink-600 to-rose-900',
    texture: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)'
  },
  {
    id: 'book',
    title: 'Книжковий Рейд',
    desc: 'Похід в онлайн-книгарню. Тьотя обирає, дядя "носить" пакети і платить.',
    finePrint: 'Ліміт книг відсутній. Кава включена(маккохве на кухні).',
    icon: <Dna className="w-10 h-10 text-white" />,
    gradient: 'from-blue-400 to-cyan-500',
    texture: 'radial-gradient(circle at 70% 80%, rgba(255,255,255,0.2), transparent)'
  }
];

// Справи для "Суду Кіно" (ОНОВЛЕНО: Життєві ситуації)
const COURT_CASES = [
  {
    id: 1,
    title: "Справа №1: Останній шматочок",
    plaintiff: "Голодний Шлунок",
    defendant: "Совість",
    desc: "На столі залишився останній шматочок піци/рол. Кому він дістанеться?",
    option1: "З'їсти самій 😋",
    option2: "Поділитися (ні) 🙅‍♀️",
    evidence: "Згідно з Конституцією Кохання, все найсмачніше належить Тьоті."
  },
  {
    id: 2,
    title: "Справа №2: Температурний режим",
    plaintiff: "Тьотя (Мерзне)",
    defendant: "Дядя (Жарко)",
    desc: "В кімнаті має бути температура, комфортна для кого?",
    option1: "Сахара (+28°C) ☀️",
    option2: "Аляска (+18°C) ❄️",
    evidence: "Доказ: дядя може спати на вулиці, якщо йому щось не подобається."
  },
  {
    id: 3,
    title: "Справа №3: DJ в машині",
    plaintiff: "Тейлор Свіфт",
    defendant: "Рандомний Плейлист",
    desc: "Хто обирає музику під час поїздки?",
    option1: "Тьотя (DJ) 🎧",
    option2: "Тиша 🔇",
    evidence: "У Дяді немає музичного смаку (згідно з попередніми вироками)."
  },
  {
    id: 4,
    title: "Справа №4: Час зборів",
    plaintiff: "Краса",
    defendant: "Пунктуальність",
    desc: "Скільки часу потрібно на 'я вже майже готова'?",
    option1: "Скільки треба 💅",
    option2: "Ще 5 хв (годин) 💄",
    evidence: "Шедеври не створюються поспіхом."
  }
];

const MEMORIES = [
  { 
    id: 1, 
    url: myPhoto1,  // <
    title: "Початок подорожі", 
    desc: "<3" 
  },
  { 
    id: 2, 
    url: myPhoto2, 
    title: "Разом", 
    desc: "найкращі миті" 
  },
  { 
    id: 3, 
    url: myPhoto3, 
    title: "Напилися", 
    desc: "сильно..." 
  }
];

// --- MAIN APP ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = now - START_DATE;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      setTimeTogether({ days, hours, minutes });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomeSection timeTogether={timeTogether} />;
      case 'contract': return <ContractSection />;
      case 'bank': return <BankSection />;
      case 'court': return <CinemaCourtSection />;
      case 'safe': return <SafeSection />;
      case 'gallery': return <GallerySection />;
      default: return <HomeSection timeTogether={timeTogether} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans relative overflow-hidden select-none">
      
      <div className="relative z-10 max-w-md mx-auto h-screen flex flex-col bg-white shadow-2xl overflow-hidden">
        
        {/* Header */}
        <header className="px-6 py-4 flex justify-between items-end bg-white/80 backdrop-blur-md border-b border-slate-100 z-20 absolute top-0 w-full">
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tighter flex items-center gap-1">
              US <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
            </h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Тьотя & Дядя</p>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded-full border border-slate-200">
             <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
             <span className="text-[10px] font-bold text-slate-600">працює</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-50 relative scrollbar-hide perspective-1000 pt-20">
          {renderContent()}
        </main>

        {/* Navigation Grid */}
        <nav className="bg-white border-t border-slate-100 px-2 py-2 pb-6 z-30">
          <div className="grid grid-cols-6 gap-1">
             <NavIcon icon={<Sparkles />} active={activeTab === 'home'} onClick={() => setActiveTab('home')} label="Дім" />
             <NavIcon icon={<Scale />} active={activeTab === 'contract'} onClick={() => setActiveTab('contract')} label="Угода" />
             <NavIcon icon={<CreditCard />} active={activeTab === 'bank'} onClick={() => setActiveTab('bank')} label="Банк" />
             <NavIcon icon={<Gavel />} active={activeTab === 'court'} onClick={() => setActiveTab('court')} label="Суд" />
             <NavIcon icon={<Lock />} active={activeTab === 'safe'} onClick={() => setActiveTab('safe')} label="Сейф" />
             <NavIcon icon={<ImageIcon />} active={activeTab === 'gallery'} onClick={() => setActiveTab('gallery')} label="Фото" />
          </div>
        </nav>

      </div>
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .backface-hidden { backface-visibility: hidden; }
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan { animation: scan 1.5s linear infinite; }
        @keyframes gavel-strike {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(-45deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-gavel { animation: gavel-strike 0.3s ease-in-out; }
        @keyframes shine {
           from { transform: translateX(-100%) rotate(45deg); }
           to { transform: translateX(200%) rotate(45deg); }
        }
        .group:hover .animate-shine {
           animation: shine 1s;
        }
        @keyframes stamp {
          0% { transform: scale(2) rotate(-10deg); opacity: 0; }
          100% { transform: scale(1) rotate(-10deg); opacity: 1; }
        }
        .animate-stamp { animation: stamp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        @keyframes pop {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 0; }
        }
        .animate-pop { animation: pop 1s ease-out forwards; }
        @keyframes flipIn {
          from { transform: rotateY(90deg); opacity: 0; }
          to { transform: rotateY(0); opacity: 1; }
        }
        .animate-flipIn { animation: flipIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
      `}</style>
    </div>
  );
}

const NavIcon = ({ icon, active, onClick, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 ${active ? 'bg-rose-50 text-rose-600 scale-105' : 'text-slate-300 hover:text-slate-500 hover:bg-slate-50'}`}
  >
    {React.cloneElement(icon, { size: 20, strokeWidth: active ? 2.5 : 2 })}
    <span className="text-[9px] font-medium mt-1">{label}</span>
  </button>
);

// 1. HOME SECTION (CARD OF THE DAY)
const HomeSection = ({ timeTogether }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [clicks, setClicks] = useState([]);
  const [fortune, setFortune] = useState(null);
  const [cardRevealed, setCardRevealed] = useState(false);

  useEffect(() => {
     // Вибираємо передбачення раз на завантаження (або можна зберігати в localStorage на добу)
     setFortune(FORTUNES[Math.floor(Math.random() * FORTUNES.length)]);
  }, []);

  const sendSignal = (e) => {
    e.stopPropagation();
    setPulse(true);
    setTimeout(() => setPulse(false), 2000);
  };

  const handleScreenClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newClick = { id: Date.now(), x, y };
    setClicks(prev => [...prev, newClick]);
    setTimeout(() => {
      setClicks(prev => prev.filter(c => c.id !== newClick.id));
    }, 1000);
  };

  // Розрахунок днів до зустрічі
  const daysToMeeting = Math.ceil((NEXT_MEETING - new Date()) / (1000 * 60 * 60 * 24));
  const displayDays = daysToMeeting > 0 ? daysToMeeting : 0;

  return (
    <div className="p-6 space-y-6 pb-20 min-h-full relative" onClick={handleScreenClick}>
      
      {clicks.map(click => (
        <div key={click.id} className="absolute pointer-events-none animate-pop z-50 text-rose-500" style={{ left: click.x - 12, top: click.y - 12 }}>
          <Heart fill="currentColor" size={24} />
        </div>
      ))}

      {/* Welcome & Signal */}
      <div className="flex justify-between items-center">
         <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-lg relative">
               <img src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1000&auto=format&fit=crop" alt="Us" className="w-full h-full object-cover" />
            </div>
            <div>
               <h2 className="text-xl font-black text-slate-800">раночкуууу, тьотя!</h2>
               <p className="text-xs text-slate-500 font-medium">Сьогодні чудовий день, бо у мене є ти.</p>
            </div>
         </div>
         <button 
            onClick={sendSignal}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${pulse ? 'bg-rose-500 scale-110 shadow-rose-300' : 'bg-white hover:scale-105'}`}
         >
            <Wifi className={`w-6 h-6 ${pulse ? 'text-white animate-ping' : 'text-slate-400'}`} />
         </button>
      </div>

      {/* Fortune Card Widget */}
      <div className="w-full h-32 perspective-1000 cursor-pointer" onClick={(e) => {e.stopPropagation(); setCardRevealed(!cardRevealed)}}>
         <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${cardRevealed ? 'rotate-y-180' : ''}`}>
            {/* Back of Card (Hidden) */}
            <div className="absolute w-full h-full backface-hidden bg-indigo-600 rounded-2xl shadow-xl flex items-center justify-center overflow-hidden border-2 border-indigo-400">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
               <div className="text-center text-white">
                  <Sparkles className="w-8 h-8 mx-auto mb-2 animate-pulse" />
                  <p className="text-xs font-bold uppercase tracking-widest">Карта Дня</p>
                  <p className="text-[10px] opacity-70">Натисни щоб відкрити</p>
               </div>
            </div>

            {/* Front of Card (Revealed) */}
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-2xl shadow-xl border-2 border-indigo-100 flex items-center justify-center p-4">
               <div className="text-center">
                  <div className="text-indigo-500 mb-1"><Moon className="w-6 h-6 mx-auto" /></div>
                  <p className="font-serif italic text-slate-700 text-sm leading-relaxed">"{fortune}"</p>
               </div>
            </div>
         </div>
      </div>

      {/* Main Stats */}
      <div className="bg-white rounded-[24px] p-6 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
         <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-rose-100 to-indigo-100 rounded-full blur-3xl opacity-50"></div>
         <div className="flex items-center gap-4 mb-6 relative z-10">
            <div>
               <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Разом вже</div>
               <div className="text-3xl font-black text-slate-800 tracking-tight leading-none">
                  {timeTogether.days} <span className="text-sm font-bold text-rose-500">днів</span>
               </div>
            </div>
         </div>
         <div className="grid grid-cols-2 gap-3 relative z-10">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
               <div className="text-lg font-bold text-slate-700">{timeTogether.hours}</div>
               <div className="text-[10px] font-bold text-slate-400 uppercase">Годин</div>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
               <div className="text-lg font-bold text-slate-700">{timeTogether.minutes}</div>
               <div className="text-[10px] font-bold text-slate-400 uppercase">Хвилин</div>
            </div>
         </div>
         <div className="mt-4 text-[10px] text-slate-400 text-center italic">
            *Торкнися екрану, щоб побачити магію*
         </div>
      </div>

      {/* Next Meeting Countdown */}
      <div className="bg-indigo-900 rounded-[24px] p-1 shadow-xl text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
         <div className="bg-gradient-to-r from-indigo-900 to-violet-900 rounded-[20px] p-5 relative">
            <div className="flex justify-between items-center mb-2">
               <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300">Наступна зустріч</span>
               <Timer className="w-4 h-4 text-indigo-300" />
            </div>
            <div className="flex items-baseline gap-2">
               <span className="text-4xl font-black">{displayDays > 0 ? displayDays : '?'}</span>
               <span className="text-sm font-medium opacity-70">днів до обіймів</span>
            </div>
            <div className="mt-4 w-full bg-indigo-950/50 h-2 rounded-full overflow-hidden">
               <div className="h-full bg-indigo-400 w-3/4 rounded-full"></div>
            </div>
         </div>
      </div>

      {/* 3D Ticket */}
      <div className="perspective-1000 h-40 cursor-pointer" onClick={(e) => {e.stopPropagation(); setIsFlipped(!isFlipped)}}>
        <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          <div className="absolute w-full h-full backface-hidden">
            <div className="h-full bg-white rounded-[24px] p-5 relative overflow-hidden border border-slate-200 shadow-lg flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="flex gap-2 items-center">
                  <div className="bg-rose-100 p-1.5 rounded-lg"><Plane className="text-rose-500 w-4 h-4" /></div>
                  <span className="text-slate-800 font-black tracking-wide text-xs">BOARDING PASS</span>
                </div>
                <Ticket className="text-slate-300 w-5 h-5" />
              </div>
              <div className="flex justify-between items-end relative z-10">
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-bold">From</div>
                  <div className="text-slate-800 text-xl font-black">ДЯДЯ</div>
                </div>
                <div className="flex-1 border-b-2 border-dashed border-slate-200 mx-4 mb-2 relative">
                   <Plane className="absolute -top-3 left-1/2 -translate-x-1/2 text-slate-300 w-4 h-4 rotate-90" />
                </div>
                <div className="text-right">
                  <div className="text-slate-400 text-[10px] uppercase font-bold">To</div>
                  <div className="text-slate-800 text-xl font-black">ТЬОТЯ</div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute w-full h-full backface-hidden rotate-y-180">
            <div className="h-full bg-slate-800 rounded-[24px] p-5 relative overflow-hidden shadow-lg flex flex-col justify-center items-center text-center text-white">
               <h3 className="font-bold text-lg uppercase mb-1">VIP Ticket</h3>
               <p className="text-[10px] text-slate-400 mb-4 px-4">Квиток у море щастя.</p>
               <div className="font-barcode text-2xl opacity-50 tracking-widest">||| || ||| ||</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. CONTRACT (UNTOUCHED)
const ContractSection = () => {
  const [signed, setSigned] = useState(false);
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const startHold = () => {
    setHolding(true);
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(intervalRef.current); setSigned(true); return 100; }
        return prev + 2; 
      });
    }, 30);
  };
  const endHold = () => {
    if (progress < 100 && !signed) { setHolding(false); setProgress(0); clearInterval(intervalRef.current); }
  };
  return (
    <div className="p-4 h-full bg-[#fdfbf7] flex flex-col">
       <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
             <Scale className="w-6 h-6 text-slate-800" />
             <h2 className="text-xl font-black text-slate-800 font-serif">PACTUM AMORIS</h2>
          </div>
          <div className="bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded">УГОДА</div>
       </div>
       {!signed ? (
         <>
           <div className="flex-1 overflow-y-auto space-y-6 font-serif pr-2 mb-4 scrollbar-hide">
              <Section title="1. Стратегічне партнерство"><p className="text-sm text-slate-700 leading-relaxed">Сторони (тьотя та дядя) погоджуються, що відстань є тимчасовою технічною несправністю, яку буде виправлено.</p></Section>
              <Section title="2. Культурний обмін"><ul className="list-disc pl-4 space-y-2 text-sm text-slate-700"><li>Дядя визнає Наруто шедевром (кращим за Dragon Ball). Це не підлягає апеляції.</li><li>Тьотя має право на безлімітну кількість книг. Дядя зобов'язується кивати і казати "ого, яка гарна обкладинка".</li></ul></Section>
              <Section title="3. Суші-Протокол"><p className="text-sm text-slate-700 leading-relaxed bg-orange-50 p-2 rounded-lg border border-orange-100">Дядя бере на себе урочисте зобов'язання забезпечувати тьотю суші (Філадельфія, Каліфорнія тощо) за першим запитом, незалежно від курсу долара чи погоди.</p></Section>
              <Section title="4. Аксіома Права"><div className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" /><p className="text-sm text-slate-700 leading-relaxed font-bold">Тьотя завжди права. Якщо тьотя не права — дивись пункт 1. Дядя зобов'язується погоджуватись на всі авантюри і не сперечатись (ну майже).</p></div></Section>
           </div>
           <div className="mt-auto flex flex-col items-center justify-center pt-4 border-t border-slate-200">
              <p className="text-xs text-slate-400 mb-3 animate-pulse">Затисни сканер для підтвердження</p>
              <div className="w-24 h-24 rounded-full border-4 border-slate-200 relative flex items-center justify-center active:scale-95 transition-all cursor-pointer bg-white" onMouseDown={startHold} onMouseUp={endHold} onMouseLeave={endHold} onTouchStart={startHold} onTouchEnd={endHold}>
                 {holding && <div className="absolute inset-0 rounded-full border-4 border-rose-500 border-t-transparent animate-spin"></div>}
                 <Fingerprint className={`w-12 h-12 transition-colors ${progress > 0 ? 'text-rose-500' : 'text-slate-300'}`} />
                 {holding && <div className="absolute inset-0 bg-rose-500/20 rounded-full animate-pulse"></div>}
                 <div className="absolute -bottom-8 text-xs font-bold text-rose-500">{Math.round(progress)}%</div>
              </div>
           </div>
         </>
       ) : (
         <div className="flex-1 flex flex-col items-center justify-center animate-fadeIn">
            <div className="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center mb-6 relative"><div className="absolute inset-0 border-4 border-green-100 rounded-full animate-ping opacity-20"></div><CheckCircle2 className="w-16 h-16 text-green-500" /></div>
            <h3 className="text-2xl font-black text-slate-800 uppercase mb-2">Підписано!</h3>
            <p className="text-center text-slate-500 max-w-xs mb-8">Вітаємо, Дядя тепер офіційно "під каблуком" (і йому це подобається).</p>
         </div>
       )}
    </div>
  );
};

const Section = ({ title, children }) => (
  <div><h3 className="font-bold text-slate-900 mb-2 uppercase text-xs tracking-wider border-l-2 border-rose-500 pl-2">{title}</h3>{children}</div>
);

// 3. BANK (WORKING BUTTONS)
const BankSection = () => {
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [isUsing, setIsUsing] = useState(false);
  const [used, setUsed] = useState(false);

  const handleUse = () => {
    setIsUsing(true);
    setTimeout(() => {
      setUsed(true);
      setIsUsing(false);
    }, 2000); 
  };

  const closeModal = () => {
    setSelectedCoupon(null);
    setUsed(false);
    setIsUsing(false);
  };

  return (
    <div className="p-6 h-full bg-slate-50">
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="w-6 h-6 text-slate-800" />
        <h2 className="text-2xl font-black text-slate-800">Банк Любові</h2>
      </div>
      
      <div className="space-y-5 pb-20">
         {COUPONS.map(coupon => (
           <div 
             key={coupon.id} 
             onClick={() => setSelectedCoupon(coupon)}
             className={`h-32 rounded-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer shadow-lg`}
           >
              {/* Card Background */}
              <div className={`absolute inset-0 bg-gradient-to-r ${coupon.gradient}`}></div>
              <div className="absolute inset-0" style={{ backgroundImage: coupon.texture }}></div>
              
              {/* Shiny Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:animate-shine transition-all"></div>

              <div className="relative z-10 p-5 flex justify-between items-start h-full">
                 <div>
                    <h3 className="text-xl font-black text-white drop-shadow-md mb-1">{coupon.title}</h3>
                    <p className="text-xs text-white/90 font-medium max-w-[200px] line-clamp-2">{coupon.desc}</p>
                 </div>
                 <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md border border-white/30 shadow-inner">
                    {coupon.icon}
                 </div>
                 <div className="absolute bottom-4 left-5 flex gap-2">
                    <div className="text-[8px] text-white/70 font-mono tracking-widest">**** **** 143</div>
                 </div>
                 <div className="absolute bottom-4 right-5">
                    <Gem className="text-white/40 w-8 h-8 rotate-12" />
                 </div>
              </div>
           </div>
         ))}
      </div>

      {/* FULL SCREEN MODAL */}
      {selectedCoupon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn" onClick={closeModal}>
           <div className="bg-white w-full max-w-sm rounded-[24px] overflow-hidden relative shadow-2xl animate-slideUp" onClick={(e) => e.stopPropagation()}>
              <div className={`h-32 bg-gradient-to-r ${selectedCoupon.gradient} flex items-center justify-center relative`}>
                 <div className="absolute inset-0" style={{ backgroundImage: selectedCoupon.texture }}></div>
                 {React.cloneElement(selectedCoupon.icon, { className: "w-16 h-16 text-white drop-shadow-lg" })}
                 <button onClick={closeModal} className="absolute top-4 right-4 bg-black/20 p-1 rounded-full text-white hover:bg-black/40 transition"><X size={20}/></button>
              </div>
              
              <div className="p-8 text-center relative">
                 {used && (
                   <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                     <div className="border-4 border-red-600 text-red-600 px-6 py-2 text-4xl font-black uppercase rotate-[-15deg] animate-stamp bg-white/80 backdrop-blur-sm">
                       ЗАТВЕРДЖЕНО
                     </div>
                   </div>
                 )}

                 <h3 className="text-2xl font-black text-slate-800 mb-2 uppercase tracking-tight">{selectedCoupon.title}</h3>
                 <div className="w-16 h-1 bg-slate-200 mx-auto rounded-full mb-6"></div>
                 
                 <p className="text-slate-600 leading-relaxed mb-8">
                    {selectedCoupon.desc}
                 </p>
                 
                 <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-500 mb-8 text-left">
                    <strong className="text-slate-800 block mb-1">Умови використання:</strong> 
                    {selectedCoupon.finePrint}
                 </div>

                 <button 
                   onClick={handleUse}
                   disabled={isUsing || used}
                   className={`w-full py-4 rounded-xl font-bold text-white shadow-lg bg-gradient-to-r ${selectedCoupon.gradient} active:scale-95 transition-all flex items-center justify-center gap-2`}
                 >
                    {isUsing ? <Sparkles className="animate-spin" /> : (used ? <CheckCircle2 /> : <Zap />)}
                    {isUsing ? 'Обробка...' : (used ? 'ВИКОРИСТАНО' : 'ВИКОРИСТАТИ ЗАРАЗ')}
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

// 4. CINEMA COURT (SPICY CASES & NO OBJECTIONS)
const CinemaCourtSection = () => {
  const [activeCase, setActiveCase] = useState(0);
  const [verdict, setVerdict] = useState(null);
  const [striking, setStriking] = useState(false);
  const [showEvidence, setShowEvidence] = useState(false);

  const handleVerdict = (winner) => { setStriking(true); setTimeout(() => { setVerdict(winner); setStriking(false); }, 600); };
  
  const nextCase = () => { 
    if (activeCase < COURT_CASES.length - 1) { 
      setActiveCase(activeCase + 1); 
      setVerdict(null); 
      setShowEvidence(false);
    } else { 
      alert("Всі справи розглянуто! Засідання оголошується закритим."); 
    } 
  };
  
  const current = COURT_CASES[activeCase];

  return (
    <div className="h-full flex flex-col p-6 bg-slate-100 relative">
       <div className="flex items-center gap-2 mb-6 justify-center">
          <Gavel className={`w-6 h-6 text-slate-800 ${striking ? 'animate-gavel' : ''}`} />
          <h2 className="text-xl font-black text-slate-800 uppercase tracking-widest">Суд Кохання</h2>
       </div>
       <div className="flex-1 bg-white rounded-3xl shadow-xl p-6 relative overflow-hidden border border-slate-200 flex flex-col">
          <div className="absolute top-0 left-0 w-full h-2 bg-slate-800"></div>
          <div className="text-center mb-4">
             <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Засідання №{current.id}</div>
             <h3 className="text-xl font-black text-slate-800 leading-tight">{current.title}</h3>
             <p className="text-xs text-slate-500 mt-2 italic px-4">"{current.desc}"</p>
          </div>

          {!verdict ? (
            <div className={`space-y-3 transition-opacity duration-300 ${striking ? 'opacity-0' : 'opacity-100'}`}>
               <button onClick={() => handleVerdict(current.option1)} className="w-full p-4 bg-slate-50 hover:bg-rose-50 border-2 border-slate-100 hover:border-rose-200 rounded-2xl transition-all flex items-center gap-4 group"><div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-xl group-hover:scale-110 transition-transform"><Sun className="w-6 h-6"/></div><div className="text-left"><div className="text-[10px] uppercase font-bold text-slate-400">Позивач</div><div className="font-bold text-slate-800">{current.option1}</div></div></button>
               
               <div className="flex items-center justify-center gap-2 opacity-30"><div className="h-px w-12 bg-slate-400"></div><span className="text-xs font-bold font-serif">VS</span><div className="h-px w-12 bg-slate-400"></div></div>
               
               <button onClick={() => handleVerdict(current.option2)} className="w-full p-4 bg-slate-50 hover:bg-blue-50 border-2 border-slate-100 hover:border-blue-200 rounded-2xl transition-all flex items-center gap-4 group"><div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-xl group-hover:scale-110 transition-transform"><Moon className="w-6 h-6"/></div><div className="text-left"><div className="text-[10px] uppercase font-bold text-slate-400">Відповідач</div><div className="font-bold text-slate-800">{current.option2}</div></div></button>

               <div className="flex gap-2 mt-4">
                  <button onClick={() => setShowEvidence(!showEvidence)} className="flex-1 py-3 bg-slate-100 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition">
                     {showEvidence ? 'Сховати докази' : 'Розглянути докази 📂'}
                  </button>
               </div>

               {showEvidence && (
                  <div className="bg-yellow-50 p-3 rounded-xl border border-yellow-200 text-xs text-yellow-800 italic animate-fadeIn">
                     <strong>Секретний доказ:</strong> {current.evidence}
                  </div>
               )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full animate-fadeIn pb-10"><div className="relative mb-6"><Scale className="w-20 h-20 text-rose-500" /></div><div className="text-[10px] uppercase font-bold text-slate-400 mb-2">Остаточний Вирок</div><h3 className="text-2xl font-black text-center text-slate-800 mb-8 px-4 leading-relaxed">Суддя Тьотя<br/>обирає:<br/><span className="text-rose-600 bg-rose-50 px-4 py-1 rounded-lg shadow-sm border border-rose-100 mt-2 inline-block transform -rotate-2">{verdict}</span></h3><button onClick={nextCase} className="w-full py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-colors flex justify-center items-center gap-2">Наступна справа <ArrowRight size={16} /></button></div>
          )}
          {striking && (<div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-20"><Gavel className="w-32 h-32 text-slate-800 animate-gavel" /></div>)}
       </div>
    </div>
  );
};

// 5. SECRET SAFE (UNTOUCHED)
const SafeSection = () => {
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const CORRECT_PIN = "0108";
  const handleNum = (num) => { if (pin.length < 4) setPin(prev => prev + num); };
  const clear = () => setPin("");
  const check = () => { if (pin === CORRECT_PIN) setUnlocked(true); else { alert("Невірний код! Підказка: День нашого початку (ДДММ)"); setPin(""); } };
  return (
    <div className="h-full flex flex-col p-6 bg-slate-800 text-white">
      {!unlocked ? (
        <div className="flex flex-col h-full"><div className="flex-1 flex flex-col items-center justify-center"><div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mb-6 shadow-inner ring-4 ring-slate-600"><Lock className="w-8 h-8 text-rose-500" /></div><h2 className="text-xl font-bold mb-2">Цілком Таємно</h2><p className="text-xs text-slate-400 mb-8">Доступ лише для Агента Тьоті</p><div className="flex gap-2 mb-8">{[...Array(4)].map((_, i) => (<div key={i} className={`w-4 h-4 rounded-full border border-slate-600 ${pin.length > i ? 'bg-rose-500 border-rose-500 shadow-[0_0_10px_#f43f5e]' : 'bg-transparent'}`}></div>))}</div></div><div className="grid grid-cols-3 gap-4 max-w-xs mx-auto w-full">{[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (<button key={num} onClick={() => handleNum(num)} className="h-16 rounded-full bg-slate-700 hover:bg-slate-600 font-bold text-xl transition-colors shadow-lg active:translate-y-1">{num}</button>))}<button onClick={clear} className="h-16 rounded-full bg-slate-700 hover:bg-red-900/50 text-red-400 font-bold flex items-center justify-center shadow-lg active:translate-y-1"><X /></button><button onClick={() => handleNum(0)} className="h-16 rounded-full bg-slate-700 hover:bg-slate-600 font-bold text-xl shadow-lg active:translate-y-1">0</button><button onClick={check} className="h-16 rounded-full bg-rose-600 hover:bg-rose-500 font-bold flex items-center justify-center shadow-lg active:translate-y-1 shadow-rose-900/50"><ArrowRight /></button></div></div>
      ) : (
        <div className="h-full flex flex-col items-center justify-center animate-fadeIn"><div className="w-full bg-[#f4f1ea] text-slate-800 p-2 rounded-lg shadow-2xl transform rotate-1 border-2 border-slate-300 relative max-h-[80vh] overflow-y-auto"><div className="absolute -top-3 left-4 bg-[#f4f1ea] px-4 py-1 rounded-t-lg border-t-2 border-l-2 border-r-2 border-slate-300 text-[10px] font-bold uppercase tracking-widest text-red-600">Top Secret</div><div className="absolute top-4 right-4 border-4 border-red-600 text-red-600 px-2 py-1 font-black text-xl uppercase rotate-[-15deg] opacity-70">Confidential</div><div className="p-4 pt-8"><div className="flex gap-4 mb-6 border-b border-slate-300 pb-4"><div className="w-24 h-32 bg-slate-200 shrink-0 overflow-hidden grayscale contrast-125 border border-slate-400"><img src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" /></div><div className="font-mono text-xs space-y-2"><p><strong>Агент:</strong> Тьотя</p><p><strong>Статус:</strong> Кохана</p><p><strong>Місія:</strong> Бути щасливою</p><p><strong>Рівень допуску:</strong> Максимальний</p></div></div><h3 className="font-bold text-sm uppercase mb-2 border-b border-slate-300">Досьє:</h3><p className="font-serif text-sm leading-relaxed mb-4 text-justify">Об'єкт має надздібність робити світ навколо яскравішим. Підозрюється у викраденні серця Дяді (докази беззаперечні). Засуджена до довічних обіймів та безлімітних компліментів.</p><div className="bg-slate-100 p-3 rounded border border-slate-200 mb-4"><h4 className="font-bold text-xs uppercase mb-2 flex items-center gap-1"><Star size={12}/> Особливі прикмети:</h4><ul className="list-disc pl-4 text-xs space-y-1 font-mono"><li>Найгарніша посмішка в радіусі всесвіту.</li><li>Юридична проникливість 100-го рівня.</li><li>Смак на серіали: Ідеальний.</li></ul></div><div className="text-center mt-6"><p className="font-script text-xl text-slate-600">Справу веде: Дядя</p></div></div></div><button onClick={() => {setUnlocked(false); setPin("");}} className="mt-6 flex items-center gap-2 text-xs text-slate-400 hover:text-white uppercase tracking-widest"><Lock size={12} /> Засекретити знову</button></div>
      )}
    </div>
  );
};

// 6. GALLERY (UNTOUCHED)
const GallerySection = () => {
  const [idx, setIdx] = useState(0);
  return (
    <div className="p-6 h-full flex flex-col justify-center bg-slate-50">
      <div className="relative group">
         <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 to-violet-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
         <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden aspect-[4/5]">
            <img src={MEMORIES[idx].url} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
               <h3 className="text-white font-bold text-xl">{MEMORIES[idx].title}</h3>
               <p className="text-white/80 text-sm">{MEMORIES[idx].desc}</p>
            </div>
         </div>
      </div>

      <div className="flex justify-center gap-6 mt-8">
        <button onClick={() => setIdx((i) => (i - 1 + MEMORIES.length) % MEMORIES.length)} className="p-4 bg-white rounded-full shadow-lg text-slate-600 hover:text-rose-600 transition-colors">
          <ChevronLeft />
        </button>
        <button onClick={() => setIdx((i) => (i + 1) % MEMORIES.length)} className="p-4 bg-white rounded-full shadow-lg text-slate-600 hover:text-rose-600 transition-colors">
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};