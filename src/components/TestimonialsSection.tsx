import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, ChevronLeft, ChevronRight, Star, Verified } from 'lucide-react';
import { trackUTMifyEvent } from '../utils/urlUtils';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

  // Auto-play functionality
  useEffect(() => {
    let intervalRef: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      intervalRef = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === realTestimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000); // 4 seconds
    }

    return () => {
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

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            O que dizem nossos clientes
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Depoimentos reais de pessoas que já estão aproveitando todas as ferramentas premium
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {realTestimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105 shadow-xl"
            >
              {/* Customer Profile */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-700/50">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={testimonial.profileImage}
                    alt={`Foto de perfil de ${testimonial.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-white text-sm">{testimonial.name}</h4>
                    {testimonial.verified && (
                      <Verified className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                  <p className="text-xs text-gray-400">{testimonial.location}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Testimonial Text */}
              <div className="mb-4">
                <p className="text-gray-300 text-sm leading-relaxed italic">
                  "{testimonial.testimonial}"
                </p>
              </div>

              {/* WhatsApp Screenshot */}
              <div className="relative">
                <div className="bg-gray-700 rounded-xl p-2 mb-3">
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
              <div className="flex items-center justify-center gap-2 text-green-400 text-xs">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Cliente Verificado</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet Carousel */}
        <div 
          className="lg:hidden relative max-w-2xl mx-auto"
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
                  <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                    {/* Customer Profile */}
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-700/50">
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <img 
                          src={testimonial.profileImage}
                          alt={`Foto de perfil de ${testimonial.name}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-white">{testimonial.name}</h4>
                          {testimonial.verified && (
                            <Verified className="w-5 h-5 text-blue-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-400">{testimonial.location}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Testimonial Text */}
                    <div className="mb-4">
                      <p className="text-gray-300 leading-relaxed italic">
                        "{testimonial.testimonial}"
                      </p>
                    </div>

                    {/* WhatsApp Screenshot */}
                    <div className="relative">
                      <div className="bg-gray-700 rounded-xl p-2 mb-3">
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
                    <div className="flex items-center justify-center gap-2 text-green-400 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
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
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-200 z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-200 z-10"
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
                    ? 'bg-green-500 scale-110' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          {/* Auto-play indicator */}
          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
              <span>{isAutoPlaying ? 'Reprodução automática' : 'Pausado'}</span>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-center gap-3 text-green-400">
              <Verified className="w-6 h-6" />
              <span className="font-medium">Clientes Verificados</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-yellow-400">
              <Star className="w-6 h-6 fill-current" />
              <span className="font-medium">Avaliação 5 Estrelas</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-blue-400">
              <MessageCircle className="w-6 h-6" />
              <span className="font-medium">Conversas Reais</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              💬 Junte-se a Milhares de Clientes Satisfeitos!
            </h3>
            <p className="text-gray-300 mb-6">
              Não perca tempo e dinheiro com múltiplas assinaturas. Tenha acesso a tudo que precisa em um só lugar.
            </p>
            <button 
              onClick={() => {
                trackUTMifyEvent('testimonials_cta_click', { button: 'comecar_agora' });
                const element = document.getElementById('bonus-section');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg px-10 py-4 rounded-full hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              COMEÇAR AGORA
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;