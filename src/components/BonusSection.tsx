import React from 'react';
import { Check, Crown, Gift } from 'lucide-react';
import { redirectWithParams, trackUTMifyEvent, forceRedirectWithAllParams } from '../utils/urlUtils';

const BonusSection = () => {
  const vitalicioFeatures = [
    'CANVA PRO',
    'CAPCUT PRO',
    'ADOBE PREMIERE',
    'ADOBE PHOTOSHOP',
    'ADOBE ILLUSTRATOR',
    'ADOBE AFTER EFFECTS',
    'CHATGPT PLUS',
    'MIDJOURNEY',
    'LEONARDO AI',
    'GAMMA AI',
    'SPOTIFY',
    'NETFLIX PRO',
    'YOUTUBE PREMIUM',
    'HBO+',
    'DISNEY+',
    'AMAZON PRIME',
    'GLOBOPLAY',
    'PARAMOUNT+',
    'APPLE TV+',
    'CRUNCHYROLL',
    'FIGMA PRO',
    'NOTION PRO',
    'GRAMMARLY PREMIUM',
    'ENVATO ELEMENTS',
    'EPIDEMIC SOUND',
    'RENDERFOREST',
    'VECTEEZY PRO',
    'PIXELCUT PRO',
    'TURBO SCRIBE',
    'ELEVEN LABS',
    'SUNO AI',
    'HEYGEN',
    'PERPLEXITY PRO',
    'E + 500 OUTRAS PLATAFORMAS',
    'SUPORTE WHATSAPP 24H DE 3A',
    'ACESSO VITALÍCIO GARANTIDO'
  ];

  const planoRuralFeatures = [
    'NETFLIX',
    'SPOTIFY',
    'YOUTUBE PREMIUM',
    'CANVA PRO',
    'CHATGPT PLUS',
    'SUPORTE BÁSICO'
  ];

  return (
    <section id="bonus-section" className="py-20 bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900">
      <div className="container mx-auto px-4 max-w-full overflow-hidden">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-full font-bold text-sm mb-6">
            <Gift className="w-4 h-4" />
            MAIS POPULAR
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Nossos Planos
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto px-2">
          {/* Plano Vitalício - Exatamente como na imagem */}
          <div className="relative transform hover:scale-105 transition-all duration-500">
            {/* Glowing border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl blur-sm animate-pulse"></div>
            
            {/* Premium crown badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
              <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black px-3 md:px-6 py-1 md:py-2 rounded-full text-xs md:text-sm font-bold shadow-2xl border-2 border-yellow-300 animate-bounce whitespace-nowrap">
                <Crown className="w-4 h-4 inline mr-2" />
                PLANO MAIS EXCLUSIVO
              </div>
            </div>
            
            {/* Side badges */}
            <div className="absolute -left-3 top-1/4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold transform -rotate-12 animate-pulse shadow-lg">
              🔥 TOP
            </div>
            
            {/* Floating particles */}
            <div className="absolute -top-2 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-bounce opacity-80"></div>
            <div className="absolute -top-1 right-1/4 w-1 h-1 bg-yellow-300 rounded-full animate-bounce delay-300 opacity-60"></div>
            <div className="absolute top-1/2 -left-1 w-1 h-1 bg-yellow-500 rounded-full animate-bounce delay-500 opacity-70"></div>
            <div className="absolute top-1/3 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-700 opacity-80"></div>
            
            <div className="relative bg-gradient-to-b from-purple-800 via-purple-700 to-purple-900 rounded-2xl p-4 md:p-6 lg:p-8 border-2 border-yellow-400/50 shadow-2xl overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-400/20 via-transparent to-yellow-600/20 animate-pulse"></div>
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-400/10 rounded-full blur-xl animate-ping"></div>
                <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-yellow-500/10 rounded-full blur-xl animate-ping delay-1000"></div>
              </div>
              
              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent -skew-x-12 translate-x-[-200%] animate-shimmer"></div>
              
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Crown className="w-6 h-6 text-yellow-400 animate-pulse" />
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                    Plano Vitalício
                  </h3>
                  <Crown className="w-6 h-6 text-yellow-400 animate-pulse" />
                </div>
                <div className="mb-2">
                  <span className="text-red-400 line-through text-xl font-bold animate-pulse">R$ 197,90</span>
                </div>
                <div className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent mb-2 animate-pulse">
                  R$ 19,90
                </div>
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-bold inline-block animate-bounce shadow-lg whitespace-nowrap">
                  💎 ÚNICO PAGAMENTO VITALÍCIO 💎
                </div>
              </div>

              <div className="space-y-3 mb-8 relative z-10">
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-8 relative z-10">
                  {vitalicioFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center animate-pulse">
                          <Check className="w-2.5 h-2.5 text-white" />
                        </div>
                      </div>
                      <span className="text-white text-sm font-medium hover:text-yellow-300 transition-colors">{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => {
                    trackUTMifyEvent('plan_selection', { 
                      plan: 'vitalicio', 
                      price: '19,90',
                      button: 'quero_ser_vip_agora'
                    });
                    // Force redirect with all URL parameters
                    forceRedirectWithAllParams('https://pay.kirvano.com/c5d26cdc-18b9-40ef-af71-04b541f4a2ee');
                  }}
                  className="relative w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-black py-3 md:py-4 lg:py-5 rounded-xl overflow-hidden group shadow-2xl text-base md:text-lg lg:text-xl transform hover:scale-110 transition-all duration-300 border-2 border-yellow-300"
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 animate-shimmer"></div>
                  
                  {/* Pulsing glow */}
                  <div className="absolute -inset-1 rounded-xl bg-yellow-400/60 blur-lg animate-ping"></div>
                  <div className="absolute -inset-2 rounded-xl bg-yellow-500/30 blur-xl animate-pulse"></div>
                  
                  {/* Multiple glow layers */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/40 via-yellow-500/40 to-yellow-600/40 animate-pulse"></div>
                  
                  {/* Button content */}
                  <span className="relative z-10 flex items-center justify-center gap-2 drop-shadow-lg">
                    <Crown className="w-5 h-5 animate-bounce" />
                    QUERO SER VIP AGORA!
                    <Crown className="w-5 h-5 animate-bounce delay-300" />
                  </span>
                  
                  {/* Button particles */}
                  <div className="absolute top-1 left-4 w-1 h-1 bg-white rounded-full animate-ping opacity-80"></div>
                  <div className="absolute top-2 right-6 w-1 h-1 bg-white rounded-full animate-ping delay-500 opacity-60"></div>
                  <div className="absolute bottom-1 left-8 w-1 h-1 bg-white rounded-full animate-ping delay-1000 opacity-70"></div>
                </button>
                
                {/* Exclusive badge at bottom */}
                <div className="text-center mt-4">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 md:px-4 py-1 md:py-2 rounded-full text-xs font-bold animate-pulse shadow-lg whitespace-nowrap">
                    🚨 ACESSO VITALÍCIO LIMITADO 🚨
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Plano Rural - Exatamente como na imagem */}
          <div className="bg-gradient-to-b from-purple-800 to-purple-900 rounded-2xl p-4 md:p-6 lg:p-8 border border-purple-600/50 shadow-xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Plano Básico</h3>
              <div className="text-4xl font-bold text-white mb-2">R$ 8,90</div>
            </div>

            <div className="space-y-4 mb-8">
              {planoRuralFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="text-white text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => {
                trackUTMifyEvent('plan_selection', { 
                  plan: 'basico', 
                  price: '8,90',
                  button: 'comecar_agora'
                });
                forceRedirectWithAllParams('https://pay.kirvano.com/a8fbfebd-726c-48e1-a256-6ea387a743e9');
              }}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-4 rounded-xl hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg text-lg"
            >
              Começar Agora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BonusSection;