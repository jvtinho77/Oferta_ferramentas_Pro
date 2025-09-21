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
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            Perguntas Frequentes
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                type="button"
              >
                <span className="text-gray-900 font-medium text-lg pr-4">
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-5 animate-fadeIn">
                  <p className="text-gray-600 leading-relaxed">
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