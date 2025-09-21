import React from 'react';
import { Check, Crown, Zap, Shield } from 'lucide-react';
import { redirectWithParams, trackUTMifyEvent } from '../utils/urlUtils';

const PricingSection = () => {
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

  return (
    <section id="pricing-section" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
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
                    trackUTMifyEvent('plan_selection', { 
                      plan: 'basico', 
                      price: plan.price,
                      button: 'escolher_plano'
                    });
                    const event = new CustomEvent('showUpsell');
                    window.dispatchEvent(event);
                  } else {
                    trackUTMifyEvent('plan_selection', { 
                      plan: plan.name.toLowerCase().replace('plano ', ''), 
                      price: plan.price,
                      button: 'escolher_plano'
                    });
                    // Redirect to appropriate checkout
                    const checkoutUrl = plan.name === 'Plano Intermediário' 
                      ? 'https://pay.kirvano.com/c5d26cdc-18b9-40ef-af71-04b541f4a2ee'
                      : plan.name === 'Plano Master'
                      ? 'https://pay.kirvano.com/c5d26cdc-18b9-40ef-af71-04b541f4a2ee'
                      : 'https://pay.kirvano.com/c5d26cdc-18b9-40ef-af71-04b541f4a2ee';
                    redirectWithParams(checkoutUrl);
                  }
                }}
                className={`w-full bg-gradient-to-r ${plan.color} text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg ${
                  plan.warning 
                    ? 'hover:opacity-80 cursor-not-allowed opacity-75' 
                    : plan.premium
                    ? 'hover:opacity-90 transform hover:scale-105 shadow-xl shadow-purple-500/30'
                    : 'hover:opacity-90 transform hover:scale-105'
                }`}
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
    </section>
  );
};

export default PricingSection;