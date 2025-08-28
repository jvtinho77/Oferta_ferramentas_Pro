import React from 'react';
import { ShoppingCart, Clock, Shield } from 'lucide-react';
import { trackUTMifyEvent } from '../utils/urlUtils';

const ThreeStepsSection = () => {
  const steps = [
    {
      icon: ShoppingCart,
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

  return (
    <section className="py-20 bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
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
                  <div className="w-24 h-24 mx-auto bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/20 group-hover:border-white/40 transition-all duration-300">
                    <step.icon className="w-12 h-12 text-white" strokeWidth={1.5} />
                  </div>
                  
                  {/* Step number */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
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
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-white/20 to-transparent transform translate-x-12 -translate-y-1/2"></div>
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
              const element = document.getElementById('bonus-section');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold text-xl px-12 py-4 rounded-full hover:from-yellow-500 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25"
          >
            QUERO MEU ACESSO AGORA! 🚀
          </button>
          
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-purple-200">
            <Shield className="w-4 h-4" />
            <span>Compra 100% segura • Garantia de 7 dias</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeStepsSection;