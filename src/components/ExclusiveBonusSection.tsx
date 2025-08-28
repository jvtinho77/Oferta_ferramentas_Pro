import React from 'react';
import { Gift, Star, Crown } from 'lucide-react';
import { trackUTMifyEvent } from '../utils/urlUtils';

const ExclusiveBonusSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-purple-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-full font-bold text-lg mb-6 animate-pulse">
            <Gift className="w-5 h-5" />
            BÔNUS EXCLUSIVO
            <Gift className="w-5 h-5" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Plataformas Premium Incluídas
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Acesse as principais plataformas de streaming e entretenimento sem pagar nada extra!
          </p>
        </div>

        {/* Premium Platforms Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
          {/* Netflix */}
          <div className="group relative bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <img 
              src="/images/bonus/netflix.webp"
              alt="Netflix Premium"
              className="w-full h-auto rounded-lg relative z-10"
            />
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              PREMIUM
            </div>
          </div>
          
          {/* Spotify Premium */}
          <div className="group relative bg-green-500/10 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-green-400/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <img 
              src="/images/bonus/spotify-premium.webp"
              alt="Spotify Premium"
              className="w-full h-auto rounded-lg relative z-10"
            />
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              PREMIUM
            </div>
          </div>
          
          {/* YouTube Premium */}
          <div className="group relative bg-red-500/10 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-red-400/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <img 
              src="/images/bonus/youtube-premium.webp"
              alt="YouTube Premium"
              className="w-full h-auto rounded-lg relative z-10"
            />
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              PREMIUM
            </div>
          </div>
          
          {/* Disney+ */}
          <div className="group relative bg-blue-600/10 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <img 
              src="/images/bonus/disney-plus.webp"
              alt="Disney Plus"
              className="w-full h-auto rounded-lg relative z-10"
            />
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              PREMIUM
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-purple-800/30 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-purple-600/30">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="w-6 h-6 text-yellow-400" />
              <h3 className="text-2xl font-bold text-white">E muito mais!</h3>
              <Crown className="w-6 h-6 text-yellow-400" />
            </div>
            
            <p className="text-lg text-gray-300 mb-6">
              Mais de <span className="text-yellow-400 font-bold">500 plataformas premium</span> disponíveis em um único lugar
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-green-400">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-medium">Acesso Vitalício</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-blue-400">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-medium">Suporte 24/7</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-purple-400">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-medium">Garantia Total</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-4">
              <p className="text-green-300 font-medium">
                💰 Economize mais de R$ 150 por mês em assinaturas!
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button 
            onClick={() => {
              trackUTMifyEvent('exclusive_bonus_cta_click', { button: 'quero_bonus_agora' });
              const element = document.getElementById('bonus-section');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold text-xl px-12 py-4 rounded-full hover:from-yellow-500 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25"
          >
            🎁 QUERO ESSES BÔNUS AGORA!
          </button>
          
          <p className="text-gray-400 text-sm mt-4">
            Oferta por tempo limitado • Garantia de 7 dias
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExclusiveBonusSection;