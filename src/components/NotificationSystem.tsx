import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface Notification {
  id: number;
  name: string;
  message: string;
  timestamp: Date;
}

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);

  const sampleNotifications = [
    { name: 'Luana', message: 'Garantia de Acesso Premium' },
    { name: 'Carlos', message: 'Adquiriu o Plano Premium' },
    { name: 'Fernanda', message: 'Adquiriu o Plano Básico' },
    { name: 'Maria', message: 'Garantia de Acesso Premium' },
    { name: 'João', message: 'Adquiriu o Plano Vitalício' },
    { name: 'Roberto', message: 'Adquiriu o Plano Básico' },
    { name: 'Ana', message: 'Garantia de Acesso Premium' },
    { name: 'Pedro', message: 'Adquiriu o Plano Básico' },
    { name: 'Sofia', message: 'Garantia de Acesso Premium' },
    { name: 'Lucas', message: 'Adquiriu o Plano Premium' },
    { name: 'Juliana', message: 'Adquiriu o Plano Básico' },
    { name: 'Camila', message: 'Garantia de Acesso Premium' },
    { name: 'Rafael', message: 'Adquiriu o Plano Vitalício' },
    { name: 'Beatriz', message: 'Adquiriu o Plano Básico' },
    { name: 'Diego', message: 'Adquiriu o Plano Premium' }
  ];

  useEffect(() => {
    const showRandomNotification = () => {
      const randomNotification = sampleNotifications[Math.floor(Math.random() * sampleNotifications.length)];
      const newNotification: Notification = {
        id: Date.now(),
        name: randomNotification.name,
        message: randomNotification.message,
        timestamp: new Date()
      };

      setCurrentNotification(newNotification);
      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);

      // Auto hide after 5 seconds
      setTimeout(() => {
        setCurrentNotification(null);
      }, 5000);
    };

    // Show first notification after 3 seconds
    const initialTimer = setTimeout(showRandomNotification, 3000);

    // Then show notifications every 8-15 seconds
    const scheduleNextNotification = () => {
      const randomDelay = Math.random() * 7000 + 8000; // Random between 8-15 seconds
      setTimeout(() => {
        showRandomNotification();
        scheduleNextNotification(); // Schedule the next one
      }, randomDelay);
    };

    // Start the scheduling after initial notification
    setTimeout(scheduleNextNotification, 3000 + 5000); // After initial + display time

    return () => {
      clearTimeout(initialTimer);
    };
  }, []);

  const closeNotification = () => {
    setCurrentNotification(null);
  };

  if (!currentNotification) return null;

  return (
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 animate-slideInLeft">
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-2xl p-3 md:p-4 w-64 md:w-72 lg:max-w-sm border border-green-400/30 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-semibold text-white text-xs md:text-sm truncate">
                {currentNotification.name}
              </h4>
              <button
                onClick={closeNotification}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X className="w-3 h-3 md:w-4 md:h-4" />
              </button>
            </div>
            <p className="text-green-100 text-xs md:text-sm leading-tight">
              {currentNotification.message}
            </p>
            <p className="text-green-200/70 text-xs mt-1 md:mt-1">
              {Math.floor(Math.random() * 5) + 1} minutos atrás
            </p>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-2 md:mt-3 h-0.5 md:h-1 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white/40 rounded-full animate-shrink"></div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSystem;