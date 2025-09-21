import React from 'react';
import { Gift, Star, Crown } from 'lucide-react';
import { trackUTMifyEvent } from '../utils/urlUtils';

const ExclusiveBonusSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold text-lg mb-6 shadow-lg">
            <Gift className="w-5 h-5" />
            BÔNUS EXCLUSIVO
            <Gift className="w-5 h-5" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            Plataformas Premium Incluídas
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Acesse as principais plataformas de streaming e entretenimento sem pagar nada extra!
          </p>
        </div>

        {/* Premium Platforms Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
          {/* Netflix */}
          <div className="group relative bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <img 
              src="/images/bonus/netflix.webp"
              alt="Netflix Premium"
              className="w-full h-auto rounded-lg"
            />
            <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded-full shadow-lg">
              PREMIUM
            </div>
          </div>
          
          {/* Spotify Premium */}
          <div className="group relative bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <img 
              src="/images/bonus/spotify-premium.webp"
              alt="Spotify Premium"
              className="w-full h-auto rounded-lg"
            />
            <div className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-full shadow-lg">
              PREMIUM
            </div>
          </div>
          
          {/* YouTube Premium */}
          <div className="group relative bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <img 
              src="/images/bonus/youtube-premium.webp"
              alt="YouTube Premium"
              className="w-full h-auto rounded-lg"
            />
            <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded-full shadow-lg">
              PREMIUM
            </div>
          </div>
          
          {/* Disney+ */}
          <div className="group relative bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <img 
              src="/images/bonus/disney-plus.webp"
              alt="Disney Plus"
              className="w-full h-auto rounded-lg"
            />
            <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full shadow-lg">
              PREMIUM
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="text-center mb-12">
          <div className="bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto border border-gray-200">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="w-6 h-6 text-blue-600" />
              <h3 className="text-2xl font-semibold text-gray-900">E muito mais!</h3>
              <Crown className="w-6 h-6 text-blue-600" />
            </div>
            
            <p className="text-lg text-gray-600 mb-6">
              Mais de <span className="text-blue-600 font-semibold">500 plataformas premium</span> disponíveis em um único lugar
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-green-600">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-medium">Acesso Vitalício</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-blue-600">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-medium">Suporte 24/7</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-medium">Garantia Total</span>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-green-700 font-medium">
                Economize mais de R$ 150 por mês em assinaturas!
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
            className="bg-blue-600 text-white font-semibold text-xl px-12 py-4 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg"
          >
            QUERO ESSES BÔNUS AGORA!
          </button>
          
          <p className="text-gray-500 text-sm mt-4">
            Oferta por tempo limitado • Garantia de 7 dias
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExclusiveBonusSection;