import React, { useState, useEffect, useRef } from 'react';
import { Check, Crown, Zap, Shield, Clock, Star, MessageCircle, ChevronLeft, ChevronRight, Verified, ChevronDown, ChevronUp } from 'lucide-react';
import { redirectWithParams, trackUTMifyEvent } from '../utils/urlUtils';

const UnifiedSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [accessCount, setAccessCount] = useState(12);
  const [currentDate, setCurrentDate] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showUpsell, setShowUpsell] = useState(false);
  const [showDownsell, setShowDownsell] = useState(false);
  const [countdown, setCountdown] = useState(180); // 3 minutos
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const plans = [
    {
      name: 'Plano Intermediário',
      price: '21,90',
      originalPrice: '39,90',
      duration: 'mês',
      description: 'Mais vendido - Melhor custo-benefício',
      features: [
        'Tudo do Plano Básico',
        'Apps mais famosos: Netflix, Disney+, HBO',
        'Adobe Creative Suite',
        '250+ ferramentas adicionais',
        'MidJourney, Leonardo AI, Grammarly',
        'Notion Pro e muito mais',
        'Acesso ilimitado',
        'Suporte WhatsApp 24h',
        '7 dias de garantia'
      ],
      popular: true,
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Plano Master',
      price: '27,00',
      originalPrice: '49,90',
      duration: 'mês',
      description: 'O mais completo - Para quem quer escalar',
      features: [
        'Tudo do Plano Intermediário',
        'Todas as ferramentas disponíveis',
        'VO3 (IA gera vídeos infinitos)',
        'IA cria e posta em 10+ contas',
        'TikTok e YouTube automatizados',
        'Suporte VIP com chamada de voz',
        'Fura-fila no atendimento',
        'Garantia de 14 dias',
        'Atualizações em tempo real'
      ],
      popular: false,
      color: 'from-purple-500 to-purple-600',
      premium: true
    },
    {
      name: 'Plano Básico',
      price: '8,90',
      originalPrice: '19,90',
      duration: 'mês',
      description: 'Ideal para iniciantes',
      features: [
        'ChatGPT Plus',
        'Canva Pro',
        'Spotify Premium',
        'YouTube Premium',
        '⚠️ Acesso limitado (servidor compartilhado)',
        '⚠️ Pode ter lentidão e travamentos',
        '⚠️ Suporte básico (resposta em 48h)',
        '⚠️ Sem atualizações em tempo real',
        '7 dias de garantia'
      ],
      popular: false,
      color: 'from-gray-500 to-gray-600',
      warning: true
    }
  ];

  const realTestimonials = [
    {
      id: 1,
      name: 'Carlos Silva',
      profileImage: '/images/testimonials/carlos-profile.jpg',
      whatsappImage: '/images/testimonials/carlos-whatsapp.webp',
      location: 'São Paulo, SP',
      rating: 5,
      testimonial: 'Incrível! Todas as ferramentas funcionando perfeitamente. Já economizei mais de R$ 500 só no primeiro mês!',
      verified: true
    },
    {
      id: 2,
      name: 'Ana Beatriz',
      profileImage: '/images/testimonials/ana-profile.jpg',
      whatsappImage: '/images/testimonials/ana-whatsapp.webp',
      location: 'Rio de Janeiro, RJ',
      rating: 5,
      testimonial: 'YouTube Premium, Netflix, Spotify... tudo funcionando! Melhor investimento que já fiz.',
      verified: true
    },
    {
      id: 3,
      name: 'Rafael Santos',
      profileImage: '/images/testimonials/rafael-profile.jpg',
      whatsappImage: '/images/testimonials/rafael-whatsapp.webp',
      location: 'Belo Horizonte, MG',
      rating: 5,
      testimonial: 'ChatGPT Plus funcionando perfeitamente! Suporte muito rápido e eficiente.',
      verified: true
    },
    {
      id: 4,
      name: 'Mariana Costa',
      profileImage: '/images/testimonials/mariana-profile.jpg',
      whatsappImage: '/images/testimonials/mariana-whatsapp.webp',
      location: 'Brasília, DF',
      rating: 5,
      testimonial: 'Canva Pro, Adobe... todas as ferramentas que preciso para meu trabalho. Recomendo!',
      verified: true
    }
  ];

  const steps = [
    {
      icon: Crown,
      title: 'Clique no botão "Quero Meu Acesso"',
      description: 'Escolha seu plano e finalize a compra de forma segura'
    },
    {
      icon: Clock,
      title: 'Tenha o acesso imediato liberado em seu e-mail',
      description: 'Receba instantaneamente após a confirmação do pagamento'
    },
    {
      icon: Shield,
      title: 'Use à vontade, se não gostar, peça reembolso em até 7 dias',
      description: 'Garantia total de satisfação ou seu dinheiro de volta'
    }
  ];

  const faqs = [
    {
      question: 'Onde vou receber?',
      answer: 'Em seu e-mail após a compra e na plataforma.'
    },
    {
      question: 'Funciona em todos os dispositivos?',
      answer: 'Sim, celulares, notebooks e computadores.'
    },
    {
      question: 'Existe alguma garantia de que o programa funciona?',
      answer: 'Sim! Oferece 7 dias de garantia incondicional para testar sem riscos.'
    },
    {
      question: 'Demora quanto tempo para receber?',
      answer: 'O acesso é liberado imediatamente após a confirmação do pagamento.'
    }
  ];

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
    }, 30000);

    // Auto-play functionality for testimonials
    let intervalRef: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      intervalRef = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === realTestimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000);
    }

    // Countdown timer for upsell/downsell
    const countdownTimer = setInterval(() => {
      setCountdown(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(accessTimer);
      clearInterval(countdownTimer);
      if (intervalRef) {
        clearInterval(intervalRef);
      }
    };
  }, [isAutoPlaying, realTestimonials.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === realTestimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? realTestimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  const toggleFAQ = (index: number) => {
    setOpenIndex(prevIndex => prevIndex === index ? null : index);
  };

  const handleBasicPlanClick = () => {
    trackUTMifyEvent('plan_selection', { 
      plan: 'basico', 
      price: '8,90',
      button: 'escolher_plano'
    });
    setShowUpsell(true);
    setCountdown(180); // Reset countdown
  };

  const handleUpsellAccept = () => {
    trackUTMifyEvent('upsell_accepted', { 
      plan: 'master_upsell', 
      price: '24,90',
      button: 'aceitar_upsell'
    });
    setShowUpsell(false);
    const checkoutUrl = 'https://pay.cakto.com.br/3bf25md';
    redirectWithParams(checkoutUrl);
  };

  const handleUpsellDecline = () => {
    trackUTMifyEvent('upsell_declined', { 
      plan: 'master_upsell', 
      price: '24,90',
      button: 'recusar_upsell'
    });
    setShowUpsell(false);
    setShowDownsell(true);
    setCountdown(120); // 2 minutos para downsell
  };

  const handleDownsellAccept = () => {
    trackUTMifyEvent('downsell_accepted', { 
      plan: 'master_downsell', 
      price: '20,00',
      button: 'aceitar_downsell'
    });
    setShowDownsell(false);
    const checkoutUrl = 'https://pay.cakto.com.br/nkhh58c';
    redirectWithParams(checkoutUrl);
  };

  const handleDownsellDecline = () => {
    trackUTMifyEvent('downsell_declined', { 
      plan: 'master_downsell', 
      price: '20,00',
      button: 'recusar_downsell'
    });
    setShowDownsell(false);
    // Redirecionar para o plano básico
    const checkoutUrl = 'https://pay.kirvano.com/c5d26cdc-18b9-40ef-af71-04b541f4a2ee';
    redirectWithParams(checkoutUrl);
  };

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_60%)]"></div>
      <div className="fixed bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.05),transparent_60%)]"></div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-full">
        {/* Top Alert Bar */}
        <div className="flex justify-center mb-8">
          <div className="bg-red-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-full flex items-center gap-2 text-xs md:text-sm font-medium shadow-lg max-w-full">
            <Clock className="w-4 h-4" />
            <span className="whitespace-nowrap overflow-hidden text-ellipsis">SOMENTE HOJE - {currentDate} - Restam {accessCount} Acessos</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center max-w-6xl mx-auto px-2">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight break-words text-white">
              <span className="text-white">+ DE </span>
              <span className="text-blue-400">
                500 PLATAFORMAS
              </span>
              <br />
              <span className="text-blue-400">
                PREMIUM
              </span>
              <span className="text-white"> EM UM </span>
              <span className="text-blue-400">
                ÚNICO
              </span>
              <br />
              <span className="text-white">LUGAR!</span>
            </h1>
          </div>

          <div className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed px-2">
            Acesse as melhores plataformas/ferramentas{' '}
            <span className="text-blue-400 font-medium">Premium</span> em um único lugar. E o melhor,{' '}
            <span className="text-green-400 font-medium">GARANTIA TOTAL DE 7 DIAS</span> ou o seu dinheiro de volta!
          </div>

           {/* Video Section */}
           <div className="mb-12 max-w-4xl mx-auto">
             <div className="relative rounded-2xl shadow-lg mx-2">
               <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                 <iframe 
                   src="https://player.vimeo.com/video/1099738716?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" 
                   className="absolute top-0 left-0 w-full h-full rounded-2xl"
                   frameBorder="0" 
                   allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                   title="Ferramentas_Pro"
                 />
               </div>
              
              {/* Video description */}
              <div className="mt-4 text-center">
                <p className="text-white font-medium text-base md:text-lg mb-2">
                  Veja como funciona na prática
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
                  const element = document.getElementById('pricing-section');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-blue-600 text-white font-semibold text-lg md:text-xl lg:text-2xl px-8 md:px-12 lg:px-16 py-4 md:py-5 lg:py-6 rounded-full hover:bg-blue-700 transition-colors duration-300 max-w-full shadow-lg"
              >
                ESCOLHER MEU PLANO AGORA
              </button>
              
              {/* Urgency text */}
              <div className="mt-4">
                <p className="text-red-400 font-semibold text-lg">
                  <span className="whitespace-nowrap">ÚLTIMAS VAGAS DISPONÍVEIS!</span>
                </p>
                <p className="text-gray-300 text-sm font-medium">
                  Não perca essa oportunidade única!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tools Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            Todas as Ferramentas que Você Precisa
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Mais de 500 plataformas premium organizadas por categoria para facilitar sua vida
          </p>
        </div>

        {/* Premium Tools Grid Image */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="relative border-2 border-white/20 rounded-3xl p-1 shadow-2xl mx-2 overflow-hidden">
            {/* Content */}
            <div className="relative rounded-2xl p-6 md:p-8 lg:p-10">
              <img 
                src="/images/tools/screenshot.jpg"
                alt="Grid com todas as ferramentas premium disponíveis"
                className="w-full h-auto rounded-xl shadow-xl max-w-full"
              />
              
            </div>
          </div>
          
          {/* Tools count badge */}
          <div className="flex justify-center mt-6">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full text-lg font-bold shadow-2xl border-2 border-white/20 hover:scale-105 transition-transform duration-300">
              🚀 500+ FERRAMENTAS 🚀
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing-section" className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Escolha Seu Plano
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Preços promocionais por tempo limitado. Garante já o seu acesso!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:transform hover:scale-105 ${
                  plan.popular 
                    ? 'border-yellow-400 ring-2 ring-yellow-400/50' 
                    : plan.premium
                    ? 'border-purple-400 ring-4 ring-purple-400/60 bg-gradient-to-br from-purple-900/20 to-pink-900/20 shadow-2xl shadow-purple-500/25'
                    : plan.warning
                    ? 'border-gray-500/50 ring-1 ring-gray-500/30'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-6 py-2 rounded-full text-sm flex items-center gap-2">
                      <Crown className="w-4 h-4" />
                      MAIS VENDIDO
                    </div>
                  </div>
                )}
                
                {plan.premium && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold px-6 py-2 rounded-full text-sm flex items-center gap-2 shadow-lg">
                      <Crown className="w-4 h-4" />
                      PREMIUM
                    </div>
                  </div>
                )}
                
                {plan.warning && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gray-600 text-white font-medium px-4 py-1 rounded-full text-xs flex items-center gap-1">
                      ⚠️ BÁSICO
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-4">{plan.description}</p>
                  
                  <div className="mb-4">
                    <span className="text-gray-400 line-through text-lg">R$ {plan.originalPrice}</span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className={`text-4xl font-bold ${plan.premium ? 'text-purple-300' : 'text-white'}`}>
                      R$ {plan.price}
                    </span>
                    <span className="text-gray-400">/ {plan.duration}</span>
                  </div>
                  
                  <div className={`${plan.premium ? 'bg-purple-500/20 border border-purple-400/40' : 'bg-red-500/20 border border-red-500/30'} rounded-lg p-2 mb-6`}>
                    <span className={`${plan.premium ? 'text-purple-300' : 'text-red-300'} text-sm font-medium`}>
                      🔥 {Math.floor(((parseFloat(plan.originalPrice) - parseFloat(plan.price)) / parseFloat(plan.originalPrice)) * 100)}% OFF
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      {feature.startsWith('⚠️') ? (
                        <span className="text-red-400 text-lg mt-0.5 flex-shrink-0">⚠️</span>
                      ) : (
                        <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={feature.startsWith('⚠️') ? 'text-red-300' : 'text-gray-300'}>
                        {feature.replace('⚠️ ', '')}
                      </span>
                    </li>
                  ))}
                </ul>

                 <button 
                   onClick={() => {
                     if (plan.name === 'Plano Básico') {
                       handleBasicPlanClick();
                     } else {
                       trackUTMifyEvent('plan_selection', { 
                         plan: plan.name.toLowerCase().replace('plano ', ''), 
                         price: plan.price,
                         button: 'escolher_plano'
                       });
                       const checkoutUrl = plan.name === 'Plano Intermediário' 
                         ? 'https://pay.cakto.com.br/6krzq2x_576786'
                         : plan.name === 'Plano Master'
                         ? 'https://pay.cakto.com.br/urr9shv_576799'
                         : 'https://pay.cakto.com.br/7vgradj_576782';
                       redirectWithParams(checkoutUrl);
                     }
                   }}
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-black' 
                      : plan.premium
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:opacity-90 transform hover:scale-105 shadow-xl shadow-purple-500/30'
                      : plan.warning
                      ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:opacity-80 cursor-not-allowed opacity-75'
                      : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:opacity-90 transform hover:scale-105'
                  } font-bold py-4 rounded-xl transition-all duration-300 shadow-lg`}
                >
                  {plan.popular ? (
                    <span className="flex items-center justify-center gap-2">
                      <Zap className="w-5 h-5" />
                      ESCOLHER PLANO
                    </span>
                  ) : plan.premium ? (
                    <span className="flex items-center justify-center gap-2">
                      <Crown className="w-5 h-5" />
                      ESCOLHER PLANO
                    </span>
                  ) : plan.warning ? (
                    'APENAS PARA TESTAR'
                  ) : (
                    'ESCOLHER PLANO'
                  )}
                </button>

                <div className="mt-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    <Shield className="w-4 h-4" />
                    <span>{plan.name === 'Plano Master' ? 'Garantia de 14 dias' : 'Garantia de 7 dias'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-white mb-2">💰 Garantia Total de 7 Dias</h3>
              <p className="text-green-300">
                Se você não ficar 100% satisfeito, devolvemos seu dinheiro sem perguntas!
              </p>
            </div>
          </div>
        </div>

        {/* Three Steps Section */}
        <div className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-8">
              Apenas 3 passos
            </h2>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className="text-center group"
                >
                  {/* Icon Container */}
                  <div className="relative mb-8">
                    <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center border-2 border-gray-200 shadow-lg group-hover:border-blue-300 transition-all duration-300">
                      <step.icon className="w-12 h-12 text-blue-600" strokeWidth={1.5} />
                    </div>
                    
                    {/* Step number */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white leading-tight px-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed px-2">
                      {step.description}
                    </p>
                  </div>

                  {/* Connector line (hidden on last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent transform translate-x-12 -translate-y-1/2"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <button 
              onClick={() => {
                trackUTMifyEvent('three_steps_cta_click', { button: 'quero_meu_acesso_agora' });
                const element = document.getElementById('pricing-section');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-blue-600 text-white font-semibold text-xl px-12 py-4 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg"
            >
              QUERO MEU ACESSO AGORA!
            </button>
            
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-300">
              <Shield className="w-4 h-4" />
              <span>Compra 100% segura • Garantia de 7 dias</span>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
              O que dizem nossos clientes
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Depoimentos reais de pessoas que já estão aproveitando todas as ferramentas premium
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
            {realTestimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Customer Profile */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={testimonial.profileImage}
                      alt={`Foto de perfil de ${testimonial.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
                      {testimonial.verified && (
                        <Verified className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{testimonial.location}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Testimonial Text */}
                <div className="mb-4">
                  <p className="text-gray-600 text-sm leading-relaxed italic">
                    "{testimonial.testimonial}"
                  </p>
                </div>

                {/* WhatsApp Screenshot */}
                <div className="relative">
                  <div className="bg-gray-100 rounded-xl p-2 mb-3">
                    <img 
                      src={testimonial.whatsappImage}
                      alt={`Conversa WhatsApp de ${testimonial.name}`}
                      className="w-full h-auto rounded-lg object-cover"
                      style={{ maxHeight: '300px' }}
                    />
                  </div>
                  
                  {/* WhatsApp indicator */}
                  <div className="absolute top-3 right-3 bg-green-500 rounded-full p-1">
                    <MessageCircle className="w-3 h-3 text-white" />
                  </div>
                </div>

                {/* Verification badge */}
                <div className="flex items-center justify-center gap-2 text-green-600 text-xs">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                  <span>Cliente Verificado</span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile/Tablet Carousel */}
          <div 
            className="lg:hidden relative max-w-2xl mx-auto mb-16"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Carousel Container */}
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {realTestimonials.map((testimonial) => (
                  <div 
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                      {/* Customer Profile */}
                      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                          <img 
                            src={testimonial.profileImage}
                            alt={`Foto de perfil de ${testimonial.name}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                            {testimonial.verified && (
                              <Verified className="w-5 h-5 text-blue-600" />
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{testimonial.location}</p>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Testimonial Text */}
                      <div className="mb-4">
                        <p className="text-gray-600 leading-relaxed italic">
                          "{testimonial.testimonial}"
                        </p>
                      </div>

                      {/* WhatsApp Screenshot */}
                      <div className="relative">
                        <div className="bg-gray-100 rounded-xl p-2 mb-3">
                          <img 
                            src={testimonial.whatsappImage}
                            alt={`Conversa WhatsApp de ${testimonial.name}`}
                            className="w-full h-auto rounded-lg object-cover max-h-80"
                          />
                        </div>
                        
                        {/* WhatsApp indicator */}
                        <div className="absolute top-3 right-3 bg-green-500 rounded-full p-1">
                          <MessageCircle className="w-4 h-4 text-white" />
                        </div>
                      </div>

                      {/* Verification badge */}
                      <div className="flex items-center justify-center gap-2 text-green-600 text-sm">
                        <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                        <span>Cliente Verificado</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-900 p-3 rounded-full hover:bg-white transition-all duration-200 z-10 shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-900 p-3 rounded-full hover:bg-white transition-all duration-200 z-10 shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {realTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex 
                      ? 'bg-blue-600 scale-110' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            {/* Auto-play indicator */}
            <div className="flex justify-center mt-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-blue-600 animate-pulse' : 'bg-gray-400'}`}></div>
                <span>{isAutoPlaying ? 'Reprodução automática' : 'Pausado'}</span>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="text-center mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <div className="flex items-center justify-center gap-3 text-green-600">
                <Verified className="w-6 h-6" />
                <span className="font-medium">Clientes Verificados</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-yellow-500">
                <Star className="w-6 h-6 fill-current" />
                <span className="font-medium">Avaliação 5 Estrelas</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-blue-600">
                <MessageCircle className="w-6 h-6" />
                <span className="font-medium">Conversas Reais</span>
              </div>
            </div>

             <div className="relative bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto shadow-2xl overflow-hidden">
               {/* Background decoration */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
               <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-100 to-blue-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>
               
               <div className="relative z-10 text-center">
                 <div className="mb-6">
                   <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                     <Star className="w-4 h-4 fill-current" />
                     <span>+10.000 Clientes Satisfeitos</span>
                   </div>
                 </div>
                 
                 <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                   Junte-se a Milhares de Clientes Satisfeitos!
                 </h3>
                 <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                   Não perca tempo e dinheiro com múltiplas assinaturas. Tenha acesso a tudo que precisa em um só lugar.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                   <button 
                     onClick={() => {
                       trackUTMifyEvent('testimonials_cta_click', { button: 'comecar_agora' });
                       const element = document.getElementById('pricing-section');
                       if (element) {
                         element.scrollIntoView({ behavior: 'smooth' });
                       }
                     }}
                     className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg px-12 py-4 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center gap-2"
                   >
                     <Zap className="w-5 h-5" />
                     COMEÇAR AGORA
                   </button>
                   
                   <div className="flex items-center gap-2 text-sm text-gray-500">
                     <Shield className="w-4 h-4 text-green-500" />
                     <span>Garantia de 7 dias</span>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </div>

         {/* FAQ Section */}
         <div className="py-20">
           <div className="text-center mb-16">
             <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
               Perguntas Frequentes
             </h2>
             <p className="text-xl text-gray-300 max-w-2xl mx-auto">
               Tire suas dúvidas sobre nossa plataforma
             </p>
           </div>

           <div className="space-y-6 max-w-4xl mx-auto">
             {faqs.map((faq, index) => (
               <div 
                 key={index}
                 className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden hover:bg-white/15 transition-all duration-300"
               >
                 <button
                   onClick={() => toggleFAQ(index)}
                   className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-200 group"
                   type="button"
                 >
                   <span className="text-white font-semibold text-lg pr-4 group-hover:text-blue-300 transition-colors duration-200">
                     {faq.question}
                   </span>
                   <div className="flex-shrink-0">
                     {openIndex === index ? (
                       <ChevronUp className="w-6 h-6 text-blue-400 transition-transform duration-200" />
                     ) : (
                       <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-all duration-200" />
                     )}
                   </div>
                 </button>
                 
                 {openIndex === index && (
                   <div className="px-8 pb-6 animate-fadeIn border-t border-white/10">
                     <p className="text-gray-300 leading-relaxed pt-4">
                       {faq.answer}
                     </p>
                   </div>
                 )}
               </div>
             ))}
           </div>
           
           {/* FAQ CTA */}
           <div className="text-center mt-16">
             <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-2xl p-8 max-w-2xl mx-auto">
               <h3 className="text-2xl font-bold text-white mb-4">
                 Ainda tem dúvidas?
               </h3>
               <p className="text-gray-300 mb-6">
                 Entre em contato conosco via WhatsApp e tire todas as suas dúvidas!
               </p>
               <button 
                 onClick={() => {
                   trackUTMifyEvent('faq_cta_click', { button: 'falar_whatsapp' });
                   window.open('https://wa.me/5511999999999', '_blank');
                 }}
                 className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg px-8 py-3 rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 mx-auto"
               >
                 <MessageCircle className="w-5 h-5" />
                 FALAR NO WHATSAPP
               </button>
             </div>
           </div>
         </div>
       </div>

       {/* Upsell Modal */}
       {showUpsell && (
         <div className="fixed inset-0 bg-black/20 backdrop-blur-lg z-50 flex items-center justify-center p-4 sm:p-4">
           <div className="bg-white/10 backdrop-blur-md rounded-2xl max-w-xs sm:max-w-lg w-full shadow-xl border border-white/20">
             {/* Header */}
             <div className="relative p-3 sm:p-6 text-center border-b border-white/20">
               <button
                 onClick={() => setShowUpsell(false)}
                 className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
               >
                 ×
               </button>
               
               {/* Countdown */}
               <div className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 inline-flex items-center gap-2">
                 <Clock className="w-4 h-4" />
                 OFERTA EXPIRA EM: {formatCountdown(countdown)}
               </div>
               
               <h2 className="text-lg sm:text-2xl font-bold text-white mb-2 sm:mb-4">
                 ESPERE! OFERTA ESPECIAL!
               </h2>
               
               {/* Limitation Warning */}
               <div className="bg-red-500/20 border border-red-400/30 text-red-200 px-4 py-3 rounded-lg text-sm mb-4">
                 ⚠️ O Plano Básico é limitado e compartilhado, pode gerar lentidão e frustração.
               </div>
               
               <p className="text-gray-300 mb-4">
                 Que tal uma oferta imperdível?
               </p>
             </div>

             {/* Offer Card */}
             <div className="p-3 sm:p-6">
               <div className="border border-white/20 rounded-xl p-3 sm:p-6 bg-white/5 backdrop-blur-sm">
                 <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 text-center">
                   Plano Master Completo
                 </h3>
                 
                 {/* Pricing */}
                 <div className="text-center mb-4 sm:mb-6">
                   <div className="text-lg text-gray-400 line-through mb-1">
                     R$ 27,00
                   </div>
                   <div className="text-3xl sm:text-4xl font-bold text-green-400 mb-2">
                     R$ 24,90
                   </div>
                   <div className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium inline-block">
                     ECONOMIZE R$ 2,10
                   </div>
                 </div>

                 {/* Benefits */}
                 <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                   <div className="flex items-center gap-3">
                     <Check className="w-5 h-5 text-green-400" />
                     <span className="text-gray-200 text-sm">Fura-fila no atendimento</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <Check className="w-5 h-5 text-green-400" />
                     <span className="text-gray-200 text-sm">Suporte VIP por chamada</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <Check className="w-5 h-5 text-green-400" />
                     <span className="text-gray-200 text-sm">Acesso ilimitado</span>
                   </div>
                 </div>

                 {/* CTA Button */}
               <button
                 onClick={handleUpsellAccept}
                 className="w-full bg-yellow-500 text-black font-bold text-base sm:text-lg py-2 sm:py-3 rounded-lg hover:bg-yellow-600 transition-colors duration-200"
               >
                 SIM! QUERO ESTA OFERTA
               </button>
               </div>

               {/* Decline Button */}
               <button
                 onClick={handleUpsellDecline}
                 className="w-full mt-4 text-gray-500 hover:text-gray-700 py-2 text-center"
               >
                 Não, obrigado. Continuar com o básico.
               </button>
             </div>

             {/* Footer Warning */}
             <div className="px-3 sm:px-6 pb-3 sm:pb-6">
               <div className="bg-red-500/20 border border-red-400/30 text-red-200 px-4 py-2 rounded-lg text-sm text-center">
                 ⚠️ Oferta expira em {formatCountdown(countdown)}!
               </div>
             </div>
           </div>
         </div>
       )}

       {/* Downsell Modal */}
       {showDownsell && (
         <div className="fixed inset-0 bg-black/20 backdrop-blur-lg z-50 flex items-center justify-center p-4 sm:p-4">
           <div className="bg-white/10 backdrop-blur-md rounded-2xl max-w-xs sm:max-w-lg w-full shadow-xl border border-white/20">
             {/* Header */}
             <div className="relative p-3 sm:p-6 text-center border-b border-white/20">
               <button
                 onClick={() => setShowDownsell(false)}
                 className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
               >
                 ×
               </button>
               
               <h2 className="text-lg sm:text-2xl font-bold text-white mb-2 sm:mb-4">
                 OFERTA FINAL
               </h2>
               
               <p className="text-gray-300 mb-4">
                 Entendo que você queira economizar, mas não queria que você ficasse preso a um plano limitado.
               </p>
               
               <div className="bg-red-600/30 border border-red-500/50 text-red-100 px-4 py-2 rounded-lg text-sm font-medium">
                 🎯 ÚLTIMA OPORTUNIDADE!
               </div>
             </div>

             {/* Offer Card */}
             <div className="p-3 sm:p-6">
               <div className="border border-white/20 rounded-xl p-3 sm:p-6 bg-white/5 backdrop-blur-sm">
                 <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 text-center">
                   Plano Master Completo
                 </h3>
                 
                 <p className="text-gray-300 text-sm mb-4 text-center">
                   Condição especial: R$27,00 por apenas R$20,00. Quase o mesmo que o Básico!
                 </p>
                 
                 {/* Pricing */}
                 <div className="text-center mb-4 sm:mb-6">
                   <div className="text-lg text-gray-400 line-through mb-1">
                     R$ 27,00
                   </div>
                   <div className="text-3xl sm:text-4xl font-bold text-red-500 mb-2">
                     R$ 20,00
                   </div>
                   <div className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium inline-block">
                     ECONOMIZE R$ 7,00
                   </div>
                 </div>

                 {/* Benefits */}
                 <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                   <div className="flex items-center gap-3">
                     <Check className="w-5 h-5 text-green-400" />
                     <span className="text-gray-200 text-sm">Fura-fila no atendimento</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <Check className="w-5 h-5 text-green-400" />
                     <span className="text-gray-200 text-sm">Suporte VIP por chamada</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <Check className="w-5 h-5 text-green-400" />
                     <span className="text-gray-200 text-sm">Acesso ilimitado</span>
                   </div>
                 </div>

                 {/* CTA Button */}
               <button
                 onClick={handleDownsellAccept}
                 className="w-full bg-red-600 text-white font-bold text-base sm:text-lg py-2 sm:py-3 rounded-lg hover:bg-red-700 transition-colors duration-200"
               >
                 SIM! QUERO ESTA OFERTA FINAL
               </button>
               </div>

               {/* Decline Button */}
               <button
                 onClick={handleDownsellDecline}
                 className="w-full mt-4 text-gray-500 hover:text-gray-700 py-2 text-center"
               >
                 Não, obrigado. Continuar com o básico.
               </button>
             </div>

             {/* Footer Warning */}
             <div className="px-3 sm:px-6 pb-3 sm:pb-6">
               <div className="bg-red-500/20 border border-red-400/30 text-red-200 px-4 py-2 rounded-lg text-sm text-center">
                 ⚠️ Última oportunidade! Não será mostrada novamente!
               </div>
             </div>
           </div>
         </div>
       )}
     </div>
   );
 };
 
 export default UnifiedSection;
