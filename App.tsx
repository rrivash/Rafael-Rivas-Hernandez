
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  ShieldCheck, 
  Building2, 
  Home, 
  GraduationCap, 
  ChevronRight,
  Menu,
  X,
  CheckCircle2,
  Info,
  Calendar,
  ArrowDown,
  ChevronDown,
  AlertCircle
} from 'lucide-react';
import { NavigationSection } from './types';

// --- Shared Components ---

const LogoSomosCoppel: React.FC<{ className?: string, color?: string }> = ({ className = "h-12", color = "#0047e1" }) => (
  <svg 
    viewBox="0 0 540 180" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Isotipo: Espiral Coppel */}
    <path 
      d="M102.5 155C66.3254 155 37 125.675 37 89.5C37 53.3246 66.3254 24 102.5 24C138.675 24 168 53.3246 168 89.5C168 111.832 156.848 131.558 139.81 143.434C137.493 145.049 135.059 143.102 135.797 140.403C143.719 111.411 117.93 84.5 89.5 84.5C61.07 84.5 44 101.5 44 121C44 140.5 61.07 155 89.5 155C108.5 155 125 145 133 131.5" 
      stroke={color} 
      strokeWidth="22" 
      strokeLinecap="round"
    />
    <circle cx="102.5" cy="89.5" r="45" stroke={color} strokeWidth="22" />
    
    {/* Texto: Somos Coppel */}
    <text x="210" y="75" fill={color} style={{ font: 'bold 75px Inter, sans-serif', letterSpacing: '-2px' }}>Somos</text>
    <text x="210" y="150" fill={color} style={{ font: 'bold 95px Inter, sans-serif', letterSpacing: '-4px' }}>Coppel</text>
  </svg>
);

const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-slate-200 p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${className}`}>
    {children}
  </div>
);

const Badge: React.FC<{ children: React.ReactNode, color: 'blue' | 'yellow' }> = ({ children, color }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-900 border border-blue-200",
    yellow: "bg-yellow-100 text-yellow-900 border border-yellow-200"
  };
  return (
    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${colors[color]}`}>
      {children}
    </span>
  );
};

// --- Interactive Sub-components ---

const ReadingProgress: React.FC = () => {
  const [width, setWidth] = useState(0);
  
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    setWidth(scrolled);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-2 z-[100] bg-slate-100 md:left-72 md:w-[calc(100%-18rem)]">
      <div 
        className="h-full bg-[#0047e1] transition-all duration-200 ease-out shadow-[0_0_10px_rgba(0,71,225,0.5)]"
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

const InteractiveObjective: React.FC<{ label: string, icon: string, description: string }> = ({ label, icon, description }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div 
      className={`p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${isOpen ? 'bg-[#0047e1] text-white border-[#0047e1] shadow-lg scale-105' : 'bg-white text-slate-900 border-slate-100 hover:border-blue-300 hover:bg-blue-50/30'}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center gap-4">
        <span className="text-3xl bg-white/10 w-12 h-12 flex items-center justify-center rounded-xl shadow-inner">{icon}</span>
        <span className="font-extrabold text-base flex-1 tracking-tight">{label}</span>
        <ChevronDown size={20} className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : 'text-blue-500'}`} />
      </div>
      {isOpen && (
        <p className="mt-4 text-sm leading-relaxed font-medium animate-in fade-in slide-in-from-top-2">
          {description}
        </p>
      )}
    </div>
  );
};

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const questions = [
    {
      q: "¿En qué año se establece el fundamento jurídico de la seguridad social en la Constitución Mexicana?",
      options: ["1910", "1917", "1943", "1959"],
      a: 1,
      feedback: "El Artículo 123 de la Constitución de 1917 es el pilar de la Seguridad Social en México."
    },
    {
      q: "¿Qué institución nació en 1943 con una composición tripartita?",
      options: ["ISSSTE", "CONSAR", "IMSS", "FOVISSSTE"],
      a: 2,
      feedback: "El IMSS se integra por representantes de Trabajadores, Patrones y el Gobierno Federal."
    },
    {
      q: "¿Cuál es el organismo que regula los Sistemas de Ahorro para el Retiro?",
      options: ["SAT", "CONSAR", "INFONAVIT", "BANXICO"],
      a: 1,
      feedback: "La CONSAR es el máximo regulador de todas las Afores y el Sistema de Ahorro para el Retiro."
    }
  ];

  const handleAnswer = (idx: number) => {
    if (isLocked) return;
    setSelectedOption(idx);
    setIsLocked(true);
    
    if (idx === questions[currentQuestion].a) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setIsLocked(false);
      } else {
        setShowResult(true);
      }
    }, 2500);
  };

  return (
    <Card className="max-w-2xl mx-auto border-t-8 border-t-[#0047e1]">
      {!showResult ? (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <GraduationCap className="text-[#0047e1]" size={32} /> Evaluación
            </h3>
            <span className="bg-slate-100 px-3 py-1 rounded-lg text-sm font-black text-slate-500 tracking-tighter">PREGUNTA {currentQuestion + 1} / {questions.length}</span>
          </div>
          
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner">
            <p className="text-xl text-slate-900 font-extrabold leading-snug">{questions[currentQuestion].q}</p>
          </div>

          <div className="grid gap-4">
            {questions[currentQuestion].options.map((opt, i) => {
              const isCorrect = i === questions[currentQuestion].a;
              const isSelected = i === selectedOption;
              let btnClass = "border-slate-200 hover:bg-blue-50 hover:border-[#0047e1] bg-white shadow-sm";
              
              if (isSelected) {
                btnClass = isCorrect ? "bg-green-600 border-green-600 text-white shadow-lg shadow-green-200" : "bg-red-600 border-red-600 text-white shadow-lg shadow-red-200";
              } else if (isLocked && isCorrect) {
                btnClass = "bg-green-100 border-green-400 text-green-900";
              }

              return (
                <button
                  key={i}
                  disabled={isLocked}
                  onClick={() => handleAnswer(i)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between group relative overflow-hidden font-bold text-lg ${btnClass}`}
                >
                  <span className="relative z-10">{opt}</span>
                  {isSelected && (
                    <div className="relative z-10">
                      {isCorrect ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          
          {isLocked && (
            <div className="p-5 bg-blue-50 border-2 border-blue-200 rounded-2xl animate-in fade-in slide-in-from-bottom-2 flex gap-4">
              <Info className="text-[#0047e1] shrink-0" />
              <p className="text-sm text-blue-900 font-semibold leading-relaxed"><strong>Respuesta:</strong> {questions[currentQuestion].feedback}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-10 space-y-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full animate-bounce shadow-xl shadow-green-100">
            <CheckCircle2 className="text-green-600 w-12 h-12" />
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">¡Misión Cumplida!</h3>
            <p className="text-lg text-slate-600 font-semibold">Obtuviste <span className="text-[#0047e1] text-2xl font-black px-2">{score} de {questions.length}</span> aciertos.</p>
          </div>
          <button 
            onClick={() => { setCurrentQuestion(0); setScore(0); setShowResult(false); setSelectedOption(null); setIsLocked(false); }}
            className="w-full bg-[#0047e1] text-white px-8 py-5 rounded-2xl font-black text-lg hover:bg-blue-700 shadow-2xl shadow-blue-200 transition-all active:scale-95"
          >
            VOLVER A INTENTAR
          </button>
        </div>
      )}
    </Card>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<NavigationSection>(NavigationSection.INTRO);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: NavigationSection.INTRO, label: 'Inicio', icon: <BookOpen size={20} /> },
    { id: NavigationSection.MARCO, label: 'Marco Normativo', icon: <ShieldCheck size={20} /> },
    { id: NavigationSection.IMSS, label: 'IMSS', icon: <Building2 size={20} /> },
    { id: NavigationSection.ISSSTE, label: 'ISSSTE', icon: <Building2 size={20} /> },
    { id: NavigationSection.FOVISSSTE, label: 'FOVISSSTE', icon: <Home size={20} /> },
    { id: NavigationSection.QUIZ, label: 'Evaluación', icon: <GraduationCap size={20} /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const current = sections.find(section => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top >= 0 && rect.top <= 500;
      });
      if (current) setActiveSection(current.id as NavigationSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f8fafc]">
      <ReadingProgress />

      {/* Sidebar - Con Identidad Somos Coppel */}
      <aside className="hidden md:flex w-72 bg-white border-r-2 border-slate-100 flex-col sticky top-0 h-screen z-50">
        <div className="p-8">
          <div className="flex flex-col gap-2 mb-4 group cursor-pointer" onClick={() => scrollTo(NavigationSection.INTRO)}>
             <LogoSomosCoppel className="h-14 w-auto object-contain transition-transform group-hover:scale-105" />
             <p className="text-[10px] font-bold text-[#0047e1] uppercase tracking-[0.2em] leading-none ml-1 mt-1">Universidad</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-extrabold transition-all duration-300 ${
                activeSection === item.id 
                  ? 'bg-[#0047e1] text-white shadow-xl shadow-blue-100 scale-[1.03]' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className={`transition-transform duration-500 ${activeSection === item.id ? 'scale-110' : ''}`}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t-2 border-slate-50">
          <div className="p-5 bg-yellow-50 rounded-[2rem] border border-yellow-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle className="text-yellow-600" size={18} />
              <span className="text-[11px] font-black text-yellow-800 uppercase tracking-tighter">Módulo SAR</span>
            </div>
            <p className="text-[11px] font-bold text-yellow-900/70 leading-relaxed">
              Capacitación Integral Somos Coppel.
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden bg-white/90 backdrop-blur-xl border-b border-slate-200 p-5 sticky top-0 z-[60] flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <LogoSomosCoppel className="h-8 w-auto" />
        </div>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className={`p-2.5 rounded-xl transition-colors ${isMenuOpen ? 'bg-slate-100 text-[#0047e1]' : 'text-slate-500'}`}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* Mobile Nav Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-[55] pt-28 px-6 md:hidden animate-in fade-in">
          <div className="grid gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full flex items-center gap-5 p-6 text-xl font-black rounded-3xl transition-all ${
                   activeSection === item.id ? 'bg-[#0047e1] text-white shadow-2xl shadow-blue-100' : 'bg-slate-50 text-slate-700'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto px-6 py-16 md:px-16 md:py-24 space-y-40">
        
        {/* Intro Section - Rediseñado con el logo Somos Coppel */}
        <section id={NavigationSection.INTRO} className="scroll-mt-32 text-center py-20 bg-gradient-to-br from-blue-50/70 via-white to-transparent rounded-[4rem] relative overflow-hidden">
          <div className="relative z-10 space-y-12 max-w-4xl mx-auto">
            <div className="flex justify-center mb-8 animate-fade-in">
               <LogoSomosCoppel className="h-28 md:h-40 w-auto drop-shadow-2xl" />
            </div>
            
            <div className="space-y-6">
              <Badge color="yellow">Capítulo de Formación 01</Badge>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.95]">
                Marco Normativo <br />
                <span className="text-[#0047e1] italic">del S.A.R.</span>
              </h2>
              <p className="text-xl md:text-2xl text-slate-700 max-w-2xl mx-auto leading-relaxed font-semibold">
                Plataforma interactiva para el estudio de las leyes y fundamentos que rigen la seguridad social en México.
              </p>
            </div>

            <div className="flex justify-center pt-8">
              <button 
                onClick={() => scrollTo(NavigationSection.MARCO)}
                className="bg-slate-900 text-white p-5 rounded-full shadow-2xl hover:scale-110 hover:bg-[#0047e1] transition-all animate-bounce"
              >
                <ArrowDown size={32} />
              </button>
            </div>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/50 rounded-full -mr-40 -mt-40 blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-100/40 rounded-full -ml-40 -mb-40 blur-[100px]"></div>
        </section>

        {/* Marco Normativo Section */}
        <section id={NavigationSection.MARCO} className="scroll-mt-32 space-y-20">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="flex-1 space-y-10">
              <div className="inline-flex items-center gap-5 p-3 bg-white rounded-3xl pr-10 border-2 border-slate-50 shadow-sm">
                <div className="w-16 h-16 bg-[#0047e1] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-100">
                  <ShieldCheck size={36} />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Fundamentos</h3>
                  <p className="text-xs font-black text-[#0047e1] uppercase tracking-widest">Instituciones y Regulación</p>
                </div>
              </div>
              
              <div className="prose prose-slate prose-xl max-w-none">
                <p className="text-2xl leading-relaxed text-slate-800 font-medium">
                  Los Sistemas de ahorro para el retiro, están regulados por la <strong className="text-[#0047e1] font-black">CONSAR</strong> y los institutos que participan para el otorgamiento de Seguridad Social.
                </p>
                
                <div className="p-8 bg-white border-2 border-slate-100 border-l-[12px] border-l-yellow-400 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-2xl font-black flex items-center gap-3 mb-4 text-slate-900">
                    <Calendar size={28} className="text-yellow-600" /> Constitución de 1917
                  </h4>
                  <p className="text-lg text-slate-700 leading-relaxed font-bold">
                    El <strong className="text-slate-900 underline decoration-yellow-400 decoration-4 underline-offset-4">Artículo 123</strong> establece la responsabilidad de los patrones hacia sus trabajadores ante accidentes y enfermedades profesionales.
                  </p>
                </div>
                
                <div className="bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl mt-16 relative overflow-hidden group transition-all hover:scale-[1.01]">
                   <div className="relative z-10 space-y-8">
                    <div className="flex items-center justify-between">
                       <Badge color="blue">Pilar del Sistema</Badge>
                       <ShieldCheck className="opacity-40 animate-pulse text-blue-400" size={40} />
                    </div>
                    <p className="text-3xl md:text-4xl font-black leading-[1.1] italic tracking-tight">
                      "La Seguridad Social en México garantiza la protección ante contingencias que reduzcan o supriman la capacidad de trabajo."
                    </p>
                    <p className="text-lg font-bold text-slate-400 max-w-xl">
                      Las Leyes de Seguridad Social otorgan prestaciones a través de seguros, migrando de sistemas de <span className="text-yellow-400">reparto</span> a <span className="text-blue-400">capitalización individual</span>.
                    </p>
                  </div>
                  <div className="absolute -bottom-20 -right-20 opacity-[0.05]">
                    <ShieldCheck size={450} />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[400px] space-y-6 sticky top-32">
              <div className="bg-blue-50/50 p-8 rounded-[3rem] border-2 border-blue-100 shadow-xl space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-10 bg-[#0047e1] rounded-full shadow-lg shadow-blue-100"></div>
                  <h4 className="font-black text-2xl text-slate-900 uppercase tracking-tighter">Objetivos</h4>
                </div>
                
                <div className="grid gap-4">
                  {[
                    { label: "Salud", icon: "🏥", description: "Prevención, curación y rehabilitación integral." },
                    { label: "Subsistencia", icon: "👨‍⚕️", description: "Garantía de ingresos ante incapacidad laboral." },
                    { label: "Bienestar", icon: "🤝", description: "Asistencia social para sectores vulnerables." },
                    { label: "Pensión", icon: "💰", description: "Ingreso garantizado para la etapa del retiro." },
                    { label: "Vivienda", icon: "🏠", description: "Acceso a créditos para un hogar digno." }
                  ].map((item, idx) => (
                    <InteractiveObjective key={idx} {...item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* IMSS Section */}
        <section id={NavigationSection.IMSS} className="scroll-mt-32">
          <div className="group relative bg-[#0047e1] rounded-[4rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row border-4 border-white transition-all hover:shadow-blue-200">
            <div className="lg:w-1/3 bg-slate-900 p-16 lg:p-20 flex flex-col justify-center items-center text-center relative overflow-hidden">
              <div className="relative z-10 w-40 h-40 bg-white rounded-[2.5rem] flex items-center justify-center mb-10 shadow-2xl group-hover:rotate-6 transition-transform duration-700">
                <span className="text-6xl font-black text-slate-900">IMSS</span>
              </div>
              <div className="relative z-10 space-y-3">
                <p className="text-blue-400 font-black uppercase tracking-[0.4em] text-xs">Fundación 1943</p>
                <div className="inline-block px-5 py-2 bg-blue-600 rounded-full text-[11px] text-white font-black border border-white/20 uppercase">Institución Tripartita</div>
              </div>
            </div>
            <div className="p-12 lg:p-20 flex-1 space-y-10 text-white">
              <div className="space-y-4">
                <h3 className="text-4xl lg:text-5xl font-black tracking-tighter leading-none">Seguro Social</h3>
                <div className="h-2 w-32 bg-yellow-400 rounded-full group-hover:w-64 transition-all duration-1000"></div>
              </div>
              <p className="text-2xl text-blue-50 leading-relaxed font-bold">
                Representantes de los <span className="text-yellow-400">trabajadores</span>, <span className="text-yellow-400">patrones</span> y el <span className="text-yellow-400">Gobierno Federal</span> integrados tripartitamente.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 pt-6">
                <div className="p-8 bg-white/5 backdrop-blur-md rounded-[3rem] border-2 border-white/10 group-hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                    <Calendar className="text-blue-300" size={28} />
                  </div>
                  <h5 className="font-black text-xl mb-3">Modelo de Reparto</h5>
                  <p className="text-base text-blue-100/80 leading-relaxed font-medium">Originalmente instaurado bajo la Ley del Seguro Social inicial.</p>
                </div>
                <div className="p-8 bg-blue-900/40 backdrop-blur-md rounded-[3rem] border-2 border-white/10">
                  <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mb-6">
                    <AlertCircle className="text-white" size={28} />
                  </div>
                  <h5 className="font-black text-xl mb-3">Evolución</h5>
                  <p className="text-base text-blue-100/80 leading-relaxed font-medium">Hacia cuentas individuales administradas por Somos Coppel (Afore).</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ISSSTE Section */}
        <section id={NavigationSection.ISSSTE} className="scroll-mt-32 space-y-20">
          <div className="flex flex-col md:flex-row items-end justify-between gap-10">
            <div className="space-y-4 max-w-2xl">
              <Badge color="blue">Trayectoria Histórica</Badge>
              <h3 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">Evolución del ISSSTE</h3>
              <p className="text-xl text-slate-600 font-bold leading-relaxed">De un modelo centralizado de reparto a un esquema robusto de prestaciones.</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            <Card className="flex flex-col border-none bg-white shadow-2xl relative group overflow-hidden">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-[#0047e1] mb-10 group-hover:scale-110 transition-transform">
                <Building2 size={32} />
              </div>
              <span className="text-6xl font-black text-slate-100 mb-4">1959</span>
              <h4 className="text-2xl font-black text-slate-900 mb-5">Ley LISSSTE</h4>
              <p className="text-lg text-slate-700 leading-relaxed font-medium">Publicación oficial de la ley que rige la seguridad social para trabajadores del Estado.</p>
            </Card>

            <Card className="flex flex-col border-none bg-slate-900 text-white shadow-2xl group">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400 mb-10">
                <ShieldCheck size={32} />
              </div>
              <span className="text-6xl font-black text-white/5 mb-4 italic">Operación</span>
              <h4 className="text-2xl font-black text-white mb-5">Solidaridad</h4>
              <p className="text-lg text-slate-400 leading-relaxed font-medium">Modelo basado en la solidaridad intergeneracional y administración directa.</p>
            </Card>

            <Card className="flex flex-col border-none bg-yellow-400 text-yellow-900 shadow-2xl group">
              <div className="w-16 h-16 bg-yellow-900/10 rounded-2xl flex items-center justify-center text-yellow-900 mb-10">
                <Calendar size={32} />
              </div>
              <span className="text-6xl font-black text-yellow-900/5 mb-4">1983</span>
              <h4 className="text-2xl font-black text-yellow-900 mb-5">Reforma</h4>
              <p className="text-lg text-yellow-900/80 leading-relaxed font-bold">Actualización profunda del catálogo de prestaciones sociales.</p>
            </Card>
          </div>
        </section>

        {/* FOVISSSTE Section */}
        <section id={NavigationSection.FOVISSSTE} className="scroll-mt-32 space-y-20">
          <div className="text-center space-y-6">
            <Badge color="yellow">Desde 1972</Badge>
            <h3 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">Vivienda FOVISSSTE</h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-semibold leading-relaxed">
              Administra aportaciones para préstamos baratos y suficientes bajo garantía hipotecaria.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { title: "Gestión", icon: <ShieldCheck />, desc: "Aportaciones de dependencias públicas federales.", color: "blue" },
              { title: "Préstamos", icon: <Home />, desc: "Financiamiento para adquisición o reparación.", color: "green" },
              { title: "Continuidad", icon: <CheckCircle2 />, desc: "Opción de 2° crédito tras liquidar satisfactoriamente.", color: "yellow" },
              { title: "Alcance", icon: <Building2 />, desc: "Cofinanciamiento con bancos e INFONAVIT.", color: "slate" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] border-2 border-slate-50 shadow-lg hover:shadow-2xl transition-all group">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:rotate-12 transition-transform bg-${item.color}-50 text-${item.color}-600`}>
                  {React.cloneElement(item.icon as React.ReactElement<any>, { size: 32 })}
                </div>
                <h4 className="font-black text-xl text-slate-900 mb-4 tracking-tight">{item.title}</h4>
                <p className="text-base text-slate-600 leading-relaxed font-bold">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Deducibilidad Fiscal - Rediseño Somos Coppel */}
          <div className="bg-slate-900 text-white rounded-[4rem] p-12 lg:p-24 overflow-hidden relative shadow-2xl">
            <div className="relative z-10 flex flex-col lg:flex-row gap-20 items-center">
              <div className="lg:w-1/2 space-y-12">
                <div className="space-y-6">
                  <Badge color="blue">Somos Coppel Beneficios</Badge>
                  <h3 className="text-4xl lg:text-5xl font-black tracking-tighter leading-tight">Deducibilidad SAT</h3>
                </div>
                <p className="text-2xl text-slate-400 font-bold leading-relaxed">
                  Intereses nominales y reales deducibles en tu declaración anual.
                </p>
              </div>
              <div className="lg:w-1/2 w-full">
                <div className="bg-white p-10 lg:p-14 rounded-[3.5rem] shadow-2xl space-y-10 group transition-transform hover:scale-[1.02]">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-xl">SAT</div>
                    <h5 className="font-black text-2xl text-slate-900 tracking-tight">Constancia Fiscal</h5>
                  </div>
                  <button className="w-full bg-[#0047e1] text-white py-6 rounded-3xl font-black uppercase text-sm tracking-[0.2em] hover:bg-slate-900 transition-all shadow-xl active:scale-95">
                    DESCARGAR CONSTANCIA
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full -mr-72 -mt-72 blur-[150px]"></div>
          </div>
        </section>

        {/* Final Quiz Section */}
        <section id={NavigationSection.QUIZ} className="scroll-mt-32 py-16">
          <div className="max-w-3xl mx-auto space-y-16">
             <div className="text-center space-y-6">
                <Badge color="yellow">Evaluación Final</Badge>
                <h3 className="text-5xl font-black text-slate-900 tracking-tighter">Certifica tu conocimiento</h3>
                <p className="text-xl text-slate-600 font-bold">Demuestra lo aprendido sobre el Marco Normativo.</p>
             </div>
             <Quiz />
          </div>
        </section>

        {/* Footer Rediseñado Somos Coppel */}
        <footer className="pt-40 pb-20 border-t-4 border-slate-50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-5">
              <LogoSomosCoppel className="h-14 w-auto" />
              <div className="w-[2px] h-10 bg-slate-200"></div>
              <p className="font-black text-slate-900 text-xl tracking-tighter leading-none">Universidad</p>
            </div>
            <div className="text-center md:text-right space-y-3">
              <p className="text-base font-black text-slate-800 tracking-tight">Marco Normativo del SAR • Capacitación 2024</p>
              <p className="text-xs font-bold text-slate-400 max-w-sm md:max-w-none leading-relaxed">
                Contenido exclusivo para colaboradores de Afore Coppel.
              </p>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
};

export default App;
