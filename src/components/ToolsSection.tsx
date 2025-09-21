import React from 'react';
import { trackUTMifyEvent } from '../utils/urlUtils';

const ToolsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 max-w-full overflow-hidden">
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
          <div className="relative bg-white rounded-2xl p-4 md:p-6 lg:p-8 border border-gray-200 shadow-lg mx-2">
            <img 
              src="/images/tools/screenshot.jpg"
              alt="Grid com todas as ferramentas premium disponíveis - HeyGen, ADSparo, CapCut, DreamFace, Envato Elements, Leonardo AI, Midjourney, Perplexity GPT, Gamma, Sora, Suno, TurboScribe, Vecteezy, Renderforest, PixelCut, ChatGPT, Designrr, Cana Pro, Eleven Labs, Epidemic Sound e muitas outras"
              className="w-full h-auto rounded-xl shadow-lg max-w-full"
            />
            
            {/* Premium badge overlay */}
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              TODAS PREMIUM
            </div>
          </div>
          
          {/* Tools count badge - moved below image */}
          <div className="flex justify-center mt-4">
            <div className="bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg">
              500+ FERRAMENTAS
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button 
            onClick={() => {
              trackUTMifyEvent('tools_section_cta_click', { button: 'ver_todas_ferramentas' });
              const element = document.getElementById('bonus-section');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-blue-600 text-white font-semibold text-lg px-10 py-4 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg"
          >
            VER TODAS AS FERRAMENTAS
          </button>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;