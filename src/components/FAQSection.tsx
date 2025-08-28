import React, { useState, useCallback } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

  const toggleFAQ = useCallback((index: number) => {
    setOpenIndex(prevIndex => prevIndex === index ? null : index);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-black to-purple-900">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Perguntas Frequentes
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-purple-800/30 backdrop-blur-sm rounded-xl border border-purple-700/50 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-purple-700/20 transition-colors duration-200"
                type="button"
              >
                <span className="text-white font-medium text-lg pr-4">
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-white" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-5 animate-fadeIn">
                  <p className="text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;