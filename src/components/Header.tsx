import React, { useState, useEffect } from 'react';
import { Clock, Star, Shield } from 'lucide-react';
import { trackUTMifyEvent } from '../utils/urlUtils';

const Header = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [accessCount, setAccessCount] = useState(12);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Set current date
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    setCurrentDate(`${day}/${month}/${year}`);

    // Set countdown to end of day
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);
      
      const difference = endOfDay.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    // Simulate access count decreasing
    const accessTimer = setInterval(() => {
      setAccessCount(prev => prev > 1 ? prev - 1 : 1);
    }, 30000); // Decrease every 30 seconds

    return () => {
      clearInterval(timer);
      clearInterval(accessTimer);
    };
  }, []);

  return (
    <header className="relative min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent w-full"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)] overflow-hidden"></div>
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(196,121,253,0.2),transparent_50%)] overflow-hidden"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-full overflow-hidden">
        {/* Top Alert Bar */}
        <div className="flex justify-center mb-8">
          <div className="bg-red-500/90 backdrop-blur-sm text-white px-3 md:px-6 py-2 md:py-3 rounded-full flex items-center gap-2 text-xs md:text-sm font-medium animate-pulse max-w-full">
            <Clock className="w-4 h-4" />
            <span className="whitespace-nowrap overflow-hidden text-ellipsis">🚨 SOMENTE HOJE - {currentDate} - Restam {accessCount} Acessos 🚨</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center max-w-6xl mx-auto px-2">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight break-words">
              <span className="text-white">+ DE </span>
              <span className="shimmer-gold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                500 PLATAFORMAS
              </span>
              <br />
              <span className="shimmer-gold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                PREMIUM
              </span>
              <span className="text-white"> EM UM </span>
              <span className="shimmer-gold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                ÚNICO
              </span>
              <br />
              <span className="text-white">LUGAR!</span>
            </h1>
          </div>

          <div className="text-base md:text-lg lg:text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed px-2">
            Acesse as melhores plataformas/ferramentas{' '}
            <span className="text-yellow-400 font-semibold">Premium</span> em um único lugar. E o melhor,{' '}
            <span className="text-yellow-400 font-semibold">GARANTIA TOTAL DE 7 DIAS</span> ou o seu dinheiro de volta!
          </div>

          {/* Video Section */}
          <div className="mb-12 max-w-4xl mx-auto">
            <div className="relative bg-black/20 backdrop-blur-sm rounded-2xl p-3 md:p-6 border border-white/10 mx-2">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe 
                  src="https://player.vimeo.com/video/1099738716?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" 
                  className="absolute top-0 left-0 w-full h-full rounded-xl"
                  frameBorder="0" 
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                  title="Ferramentas_Pro"
                />
              </div>
              
              {/* Video description */}
              <div className="mt-4 text-center">
                <p className="text-white font-medium text-base md:text-lg mb-2">
                  🎥 Veja como funciona na prática
                </p>
                <p className="text-gray-300 text-sm">
                  Demonstração completa de todas as ferramentas premium disponíveis
                </p>
              </div>
            </div>

            {/* Super CTA Button */}
            <div className="text-center mt-8">
              <button 
                onClick={() => {
                  trackUTMifyEvent('header_super_cta_click', { button: 'escolher_plano_agora' });
                  // Force scroll with URL params preserved
                  const element = document.getElementById('bonus-section');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-lg md:text-xl lg:text-2xl px-8 md:px-12 lg:px-16 py-4 md:py-5 lg:py-6 rounded-full animate-pulse hover:from-red-600 hover:to-red-700 transition-colors duration-300 max-w-full"
              >
                🔥 ESCOLHER MEU PLANO AGORA! 🚀
              </button>
              
              {/* Urgency text */}
              <div className="mt-4">
                <p className="text-red-400 font-bold text-lg">
                  <span className="whitespace-nowrap">⚡ ÚLTIMAS VAGAS DISPONÍVEIS! ⚡</span>
                </p>
                <p className="text-yellow-300 text-sm font-medium">
                  Não perca essa oportunidade única!
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;