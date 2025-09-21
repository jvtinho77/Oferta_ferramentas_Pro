import React, { useState, useEffect } from 'react';
import { X, Crown, Check, Clock, Zap, AlertTriangle } from 'lucide-react';
import { redirectWithParams, trackUTMifyEvent, forceRedirectWithAllParams } from '../utils/urlUtils';

const UpsellModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStage, setCurrentStage] = useState<'first' | 'second' | 'third'>('first');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [secondStageTimeLeft, setSecondStageTimeLeft] = useState(180); // 3 minutes for second stage
  const [thirdStageTimeLeft, setThirdStageTimeLeft] = useState(120); // 2 minutes for third stage

  useEffect(() => {
    const handleShowUpsell = () => {
      setIsVisible(true);
      setCurrentStage('first');
      setTimeLeft(300); // Reset timer
    };

    window.addEventListener('showUpsell', handleShowUpsell);

    return () => {
      window.removeEventListener('showUpsell', handleShowUpsell);
    };
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isVisible && currentStage === 'first' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isVisible && currentStage === 'second' && secondStageTimeLeft > 0) {
      timer = setInterval(() => {
        setSecondStageTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isVisible && currentStage === 'third' && thirdStageTimeLeft > 0) {
      timer = setInterval(() => {
        setThirdStageTimeLeft(prev => prev - 1);
      }, 1000);
    } else if ((currentStage === 'first' && timeLeft <= 0) || (currentStage === 'second' && secondStageTimeLeft <= 0) || (currentStage === 'third' && thirdStageTimeLeft <= 0)) {
      // Auto close modal when timer reaches 0
      setIsVisible(false);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isVisible, timeLeft, secondStageTimeLeft, thirdStageTimeLeft, currentStage]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const closeModal = () => {
    trackUTMifyEvent('upsell_modal_close', { action: 'close_modal', stage: currentStage });
    setIsVisible(false);
  };

  const goToSecondStage = () => {
    trackUTMifyEvent('upsell_rejection_first_stage', { 
      action: 'reject_premium_15_90',
      redirect_to: 'second_stage_10_90',
      button: 'nao_quero_oferta_primeira'
    });
    setCurrentStage('second');
    setSecondStageTimeLeft(180); // 3 minutes for second stage
    
    // Scroll to top of modal when transitioning to second stage
    setTimeout(() => {
      const modalContainer = document.querySelector('.upsell-modal-container');
      if (modalContainer) {
        modalContainer.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const goToThirdStage = () => {
    trackUTMifyEvent('upsell_rejection_second_stage', { 
      action: 'reject_premium_10_90',
      redirect_to: 'third_stage_master_27',
      button: 'nao_quero_oferta_segunda'
    });
    setCurrentStage('third');
    setThirdStageTimeLeft(120); // 2 minutes for third stage
    
    // Scroll to top of modal when transitioning to third stage
    setTimeout(() => {
      const modalContainer = document.querySelector('.upsell-modal-container');
      if (modalContainer) {
        modalContainer.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4">
      <div className="upsell-modal-container relative w-full h-full md:max-w-2xl md:w-full md:max-h-[90vh] md:h-auto overflow-y-auto">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 md:top-4 md:right-4 z-10 bg-white/90 text-gray-900 p-2 rounded-full hover:bg-white transition-colors shadow-lg"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Content */}
        <div className="bg-white rounded-none md:rounded-2xl p-4 md:p-6 lg:p-8 border-0 md:border border-gray-200 shadow-2xl h-full md:h-auto flex flex-col justify-start md:justify-center">
          
          {/* PRIMEIRA ETAPA - Oferta Premium R$ 15,90 */}
          {currentStage === 'first' && (
            <>
              {/* Header */}
              <div className="text-center mb-6 md:mb-8 pt-4 md:pt-0">
                <div className="inline-flex items-center gap-2 bg-red-600 text-white px-3 md:px-4 py-2 rounded-full font-semibold text-sm md:text-base mb-4 shadow-lg">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs md:text-sm">OFERTA EXPIRA EM: {formatTime(timeLeft)}</span>
                </div>
                
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-4 leading-tight">
                  ESPERE! OFERTA ESPECIAL!
                </h2>
                
                <p className="text-lg md:text-xl text-gray-600 mb-4 md:mb-6">
                  Antes de finalizar, que tal uma oferta imperdível?
                </p>

                {/* Escassez */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 md:mb-6">
                  <div className="flex items-center justify-center gap-2 text-red-700">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-semibold text-sm md:text-base">APENAS 7 VAGAS RESTANTES HOJE!</span>
                  </div>
                </div>
              </div>

              {/* Oferta Especial */}
              <div className="relative mb-6 md:mb-8">
                {/* Premium badge */}
                <div className="absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-blue-600 text-white px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-semibold shadow-lg">
                    <Crown className="w-4 h-4 inline mr-1" />
                    OFERTA ESPECIAL
                  </div>
                </div>

                <div className="relative bg-gray-50 rounded-xl p-4 md:p-6 lg:p-8 border-2 border-blue-200 shadow-lg">
                  <div className="text-center mb-4 md:mb-6">
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">
                      Plano Premium Completo
                    </h3>
                    <div className="mb-3 md:mb-4">
                      <span className="text-gray-400 line-through text-xl md:text-2xl font-semibold">R$ 19,90</span>
                    </div>
                    <div className="text-4xl md:text-5xl font-semibold text-blue-600 mb-3 md:mb-4">
                      R$ 15,90
                    </div>
                    <div className="bg-green-100 border border-green-200 text-green-700 px-3 md:px-4 py-2 rounded-full text-sm md:text-base font-semibold inline-block mb-4 md:mb-6">
                      ECONOMIZE R$ 4,00
                    </div>
                  </div>

                  {/* Principais categorias em destaque */}
                  <div className="mb-4 md:mb-6">
                    <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4">
                      <div className="bg-red-50 border border-red-200 rounded-lg p-2 text-center">
                        <span className="text-red-700 font-semibold text-xs md:text-sm">STREAMING</span>
                        <p className="text-gray-600 text-xs mt-1">Netflix, Disney+, HBO+</p>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 text-center">
                        <span className="text-blue-700 font-semibold text-xs md:text-sm">DESIGN</span>
                        <p className="text-gray-600 text-xs mt-1">Canva, Adobe, Figma</p>
                      </div>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-2 text-center">
                        <span className="text-purple-700 font-semibold text-xs md:text-sm">IA</span>
                        <p className="text-gray-600 text-xs mt-1">ChatGPT, Midjourney</p>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-center">
                        <span className="text-green-700 font-semibold text-xs md:text-sm">MÚSICA</span>
                        <p className="text-gray-600 text-xs mt-1">Spotify, YouTube</p>
                      </div>
                    </div>
                    
                    {/* Lista compacta dos principais recursos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-white font-medium text-xs md:text-sm">500+ Ferramentas Premium</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-white font-medium text-xs md:text-sm">Suporte Prioritário 24/7</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-white font-medium text-xs md:text-sm">Atualizações em Tempo Real</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-white font-medium text-xs md:text-sm">Acesso Vitalício Garantido</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-white font-medium text-xs md:text-sm">Garantia de 7 Dias</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-white font-medium text-xs md:text-sm">Curso Bônus Grátis</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      trackUTMifyEvent('upsell_conversion_first_stage', { 
                        plan: 'premium_upsell', 
                        price: '15,90',
                        original_price: '19,90',
                        discount: '4,00',
                        button: 'aceitar_oferta_especial_15_90'
                      });
                      forceRedirectWithAllParams('https://pay.cakto.com.br/3bf25md');
                    }}
                    className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-bold py-4 md:py-5 rounded-xl hover:from-yellow-500 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300 shadow-2xl text-lg md:text-xl mb-4"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Zap className="w-5 h-5 md:w-6 md:h-6" />
                      SIM! QUERO ESTA OFERTA ESPECIAL
                    </span>
                  </button>
                </div>
              </div>

              {/* Recusar Button */}
              <div className="text-center">
                <button 
                  onClick={goToSecondStage}
                  className="relative bg-gray-700/50 hover:bg-gray-600/70 text-gray-300 hover:text-white px-4 md:px-6 py-3 rounded-lg border border-gray-600/50 hover:border-gray-500/70 transition-all duration-300 text-sm md:text-base font-medium animate-pulse hover:animate-none transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span className="relative z-10">
                    Não, obrigado. Prefiro continuar com o plano básico.
                  </span>
                  
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-400/10 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Pulsing border */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-500/30 to-gray-400/30 rounded-lg blur-sm animate-pulse opacity-60"></div>
                </button>
              </div>

              {/* Urgency footer */}
              <div className="text-center mt-6">
                <p className="text-red-300 text-sm md:text-base font-medium animate-pulse">
                  ⚠️ Esta oferta expira em {formatTime(timeLeft)} e não aparecerá novamente!
                </p>
              </div>
            </>
          )}

          {/* SEGUNDA ETAPA - Oferta Premium R$ 10,90 */}
          {currentStage === 'second' && (
            <>
              {/* Header */}
              <div className="text-center mb-6 md:mb-8 pt-4 md:pt-0">
                <div className="inline-flex items-center gap-2 bg-red-600 text-white px-3 md:px-4 py-2 rounded-full font-bold text-sm md:text-base mb-4 animate-pulse">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs md:text-sm">ÚLTIMA CHANCE: {formatTime(secondStageTimeLeft)}</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  🔥 ÚLTIMA OPORTUNIDADE! 🔥
                </h2>
                
                <p className="text-xl md:text-2xl text-gray-300 mb-4 md:mb-6 font-medium">
                  Ok, entendi que você prefere economizar. Que tal esta oferta final?
                </p>

                {/* Escassez mais intensa */}
                <div className="bg-red-600/30 border border-red-500/70 rounded-lg p-4 md:p-6 mb-4 md:mb-6 animate-pulse">
                  <div className="flex items-center justify-center gap-2 text-red-200 mb-2">
                    <AlertTriangle className="w-7 h-7 animate-bounce" />
                    <span className="font-bold text-lg md:text-xl">ÚLTIMAS 3 VAGAS!</span>
                  </div>
                  <p className="text-red-300 text-base md:text-lg font-medium">
                    Esta é nossa menor oferta possível. Não conseguimos oferecer por menos que isso!
                  </p>
                </div>
              </div>

              {/* Oferta Final */}
              <div className="relative mb-6 md:mb-8">
                {/* Glowing border effect mais intenso */}
                <div className="absolute -inset-2 bg-gradient-to-r from-red-500 via-orange-500 to-red-600 rounded-xl blur-md animate-pulse"></div>
                
                {/* Badge de última chance */}
                <div className="absolute -top-4 md:-top-6 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-bold shadow-2xl border-2 border-red-400 animate-bounce">
                    <AlertTriangle className="w-5 h-5 inline mr-2" />
                    ÚLTIMA CHANCE
                  </div>
                </div>

                <div className="relative bg-gradient-to-b from-red-900/50 via-purple-800 to-purple-900 rounded-xl p-6 md:p-8 lg:p-10 border-2 border-red-500/50 shadow-2xl">
                  <div className="text-center mb-4 md:mb-6">
                    <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent mb-3 md:mb-4">
                      Plano Premium - Oferta Final
                    </h3>
                    <div className="mb-3 md:mb-4">
                      <span className="text-red-400 line-through text-2xl md:text-3xl font-bold">R$ 15,90</span>
                    </div>
                    <div className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent mb-3 md:mb-4 animate-pulse">
                      R$ 10,90
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-full text-base md:text-lg font-bold inline-block mb-4 md:mb-6 animate-bounce">
                      💰 ECONOMIZE R$ 9,00
                    </div>
                  </div>

                  {/* Principais categorias em destaque */}
                  <div className="mb-4 md:mb-6">
                    <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4">
                      <div className="bg-red-50 border border-red-200 rounded-lg p-2 text-center">
                        <span className="text-red-700 font-semibold text-xs md:text-sm">STREAMING</span>
                        <p className="text-gray-600 text-xs mt-1">Netflix, Disney+, HBO+</p>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 text-center">
                        <span className="text-blue-700 font-semibold text-xs md:text-sm">DESIGN</span>
                        <p className="text-gray-600 text-xs mt-1">Canva, Adobe, Figma</p>
                      </div>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-2 text-center">
                        <span className="text-purple-700 font-semibold text-xs md:text-sm">IA</span>
                        <p className="text-gray-600 text-xs mt-1">ChatGPT, Midjourney</p>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-center">
                        <span className="text-green-700 font-semibold text-xs md:text-sm">MÚSICA</span>
                        <p className="text-gray-600 text-xs mt-1">Spotify, YouTube</p>
                      </div>
                    </div>
                    
                    {/* Lista compacta dos principais recursos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-white font-medium text-xs md:text-sm">500+ Ferramentas Premium</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-white font-medium text-xs md:text-sm">Suporte Prioritário 24/7</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-white font-medium text-xs md:text-sm">Atualizações em Tempo Real</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-white font-medium text-xs md:text-sm">Acesso Vitalício Garantido</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-white font-medium text-xs md:text-sm">Garantia de 7 Dias</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-white font-medium text-xs md:text-sm">Curso Bônus Grátis</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      trackUTMifyEvent('upsell_conversion_second_stage', { 
                        plan: 'premium_final_offer', 
                        price: '10,90',
                        original_price: '19,90',
                        discount: '9,00',
                        button: 'aceitar_oferta_final_10_90'
                      });
                      // Force redirect with all URL parameters
                      forceRedirectWithAllParams('https://pay.cakto.com.br/nkhh58c');
                    }}
                    className="w-full bg-gradient-to-r from-red-500 via-orange-500 to-red-600 text-white font-bold py-4 md:py-5 rounded-xl hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-2xl text-lg md:text-xl mb-4 animate-pulse"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Zap className="w-5 h-5 md:w-6 md:h-6" />
                      SIM! QUERO ESTA OFERTA ESPECIAL
                    </span>
                  </button>
                </div>
              </div>

              {/* Recusar Button Final */}
              <div className="text-center">
                <button 
                  onClick={goToThirdStage}
                  className="relative bg-gray-700/50 hover:bg-gray-600/70 text-gray-300 hover:text-white px-4 md:px-6 py-3 rounded-lg border border-gray-600/50 hover:border-gray-500/70 transition-all duration-300 text-sm md:text-base font-medium animate-pulse hover:animate-none transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span className="relative z-10">
                    Não, obrigado. Prefiro continuar com o plano básico.
                  </span>
                  
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-400/10 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Pulsing border */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-500/30 to-gray-400/30 rounded-lg blur-sm animate-pulse opacity-60"></div>
                </button>
              </div>

              {/* Urgency footer mais intenso */}
              <div className="text-center mt-6">
                <p className="text-red-300 text-sm md:text-base font-medium animate-pulse">
                  🚨 ÚLTIMA CHANCE! Esta oferta expira em {formatTime(secondStageTimeLeft)}!
                </p>
                <p className="text-red-400 text-xs mt-2 font-bold">
                  Não conseguimos oferecer por menos que isso!
                </p>
              </div>
            </>
          )}

          {/* TERCEIRA ETAPA - Plano Master R$ 27,00 */}
          {currentStage === 'third' && (
            <>
              {/* Header */}
              <div className="text-center mb-6 md:mb-8 pt-4 md:pt-0">
                <div className="inline-flex items-center gap-2 bg-red-700 text-white px-3 md:px-4 py-2 rounded-full font-bold text-sm md:text-base mb-4 animate-pulse">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs md:text-sm">OFERTA MASTER: {formatTime(thirdStageTimeLeft)}</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  🚀 PLANO MASTER - OFERTA FINAL! 🚀
                </h2>
                
                <p className="text-xl md:text-2xl text-gray-300 mb-4 md:mb-6 font-medium">
                  Ok, você quer o máximo! Este é nosso plano mais completo!
                </p>

                {/* Escassez máxima */}
                <div className="bg-red-700/40 border border-red-500/80 rounded-lg p-4 md:p-6 mb-4 md:mb-6 animate-pulse">
                  <div className="flex items-center justify-center gap-2 text-red-200 mb-2">
                    <AlertTriangle className="w-8 h-8 animate-bounce" />
                    <span className="font-bold text-xl md:text-2xl">ÚLTIMA VAGA MASTER!</span>
                  </div>
                  <p className="text-red-300 text-lg md:text-xl font-medium">
                    Este é nosso plano mais avançado com IA que cria conteúdo infinito!
                  </p>
                </div>
              </div>

              {/* Oferta Master */}
              <div className="relative mb-6 md:mb-8">
                {/* Glowing border effect máximo */}
                <div className="absolute -inset-3 bg-gradient-to-r from-red-600 via-orange-600 to-red-700 rounded-xl blur-lg animate-pulse"></div>
                
                {/* Badge Master */}
                <div className="absolute -top-6 md:-top-8 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white px-5 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-bold shadow-2xl border-3 border-red-500 animate-bounce">
                    <Crown className="w-6 h-6 inline mr-3" />
                    PLANO MASTER
                    <Crown className="w-6 h-6 inline ml-3" />
                  </div>
                </div>

                <div className="relative bg-gradient-to-b from-red-900/60 via-purple-800 to-purple-900 rounded-xl p-6 md:p-8 lg:p-10 border-3 border-red-500/60 shadow-2xl">
                  <div className="text-center mb-4 md:mb-6">
                    <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent mb-3 md:mb-4">
                      Plano Master - Completo
                    </h3>
                    <div className="mb-3 md:mb-4">
                      <span className="text-red-400 line-through text-3xl md:text-4xl font-bold">R$ 67,00</span>
                    </div>
                    <div className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent mb-3 md:mb-4 animate-pulse">
                      R$ 27,00
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 md:px-8 py-3 md:py-4 rounded-full text-lg md:text-xl font-bold inline-block mb-4 md:mb-6 animate-bounce">
                      💰 ECONOMIZE R$ 40,00
                    </div>
                  </div>

                  {/* Principais categorias em destaque */}
                  <div className="mb-4 md:mb-6">
                    <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4">
                      <div className="bg-red-50 border border-red-200 rounded-lg p-2 text-center">
                        <span className="text-red-700 font-semibold text-xs md:text-sm">STREAMING</span>
                        <p className="text-gray-600 text-xs mt-1">Netflix, Disney+, HBO+</p>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 text-center">
                        <span className="text-blue-700 font-semibold text-xs md:text-sm">DESIGN</span>
                        <p className="text-gray-600 text-xs mt-1">Canva, Adobe, Figma</p>
                      </div>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-2 text-center">
                        <span className="text-purple-700 font-semibold text-xs md:text-sm">IA AVANÇADA</span>
                        <p className="text-gray-600 text-xs mt-1">Cria conteúdo infinito</p>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-center">
                        <span className="text-green-700 font-semibold text-xs md:text-sm">📱 REDES SOCIAIS</span>
                        <p className="text-gray-600 text-xs mt-1">10+ contas TikTok/YT</p>
                      </div>
                    </div>
                    
                    {/* Lista dos recursos Master */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-white font-medium text-xs md:text-sm">Tudo do Plano Premium</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-white font-medium text-xs md:text-sm">Voz Infinita (Vo3)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-white font-medium text-xs md:text-sm">IA Cria Conteúdo Infinito</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-white font-medium text-xs md:text-sm">Gerencia 10+ Contas TikTok</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-white font-medium text-xs md:text-sm">Gerencia 10+ Contas YouTube</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-white font-medium text-xs md:text-sm">Suporte VIP 24/7</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      trackUTMifyEvent('upsell_conversion_third_stage', { 
                        plan: 'master_final_offer', 
                        price: '27,00',
                        original_price: '67,00',
                        discount: '40,00',
                        button: 'aceitar_plano_master_27'
                      });
                      // Force redirect with all URL parameters
                      forceRedirectWithAllParams('https://pay.cakto.com.br/urr9shv_576799');
                    }}
                    className="w-full bg-gradient-to-r from-red-600 via-orange-600 to-red-700 text-white font-bold py-4 md:py-5 rounded-xl hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-300 shadow-2xl text-lg md:text-xl mb-4 animate-pulse"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Crown className="w-6 h-6 md:w-7 md:h-7" />
                      SIM! QUERO SER MASTER AGORA!
                      <Crown className="w-6 h-6 md:w-7 md:h-7" />
                    </span>
                  </button>
                </div>
              </div>

              {/* Recusar Button Final */}
              <div className="text-center">
                <button 
                  onClick={() => {
                    trackUTMifyEvent('upsell_final_rejection', { 
                      action: 'reject_all_offers',
                      redirect_to: 'basic_plan',
                      button: 'nao_quero_oferta_final'
                    });
                    // Force redirect with all URL parameters
                    forceRedirectWithAllParams('https://pay.cakto.com.br/7vgradj_576782');
                  }}
                  className="relative bg-gray-700/50 hover:bg-gray-600/70 text-gray-300 hover:text-white px-4 md:px-6 py-3 rounded-lg border border-gray-600/50 hover:border-gray-500/70 transition-all duration-300 text-sm md:text-base font-medium animate-pulse hover:animate-none transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span className="relative z-10">
                    Não, obrigado. Prefiro continuar com o plano básico.
                  </span>
                  
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-400/10 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Pulsing border */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-500/30 to-gray-400/30 rounded-lg blur-sm animate-pulse opacity-60"></div>
                </button>
              </div>

              {/* Urgency footer máximo */}
              <div className="text-center mt-6">
                <p className="text-red-300 text-lg md:text-xl font-medium animate-pulse">
                  🚨 ÚLTIMA CHANCE MASTER! Esta oferta expira em {formatTime(thirdStageTimeLeft)}!
                </p>
                <p className="text-red-400 text-sm md:text-base mt-2 font-bold">
                  Este é nosso plano mais avançado com IA que cria conteúdo infinito!
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpsellModal;