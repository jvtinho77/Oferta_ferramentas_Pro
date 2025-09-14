import React, { useEffect } from 'react';
import Header from './components/Header';
import NotificationSystem from './components/NotificationSystem';
import ToolsSection from './components/ToolsSection';
import ExclusiveBonusSection from './components/ExclusiveBonusSection';
import BonusSection from './components/BonusSection';
import PricingSection from './components/PricingSection';
import ThreeStepsSection from './components/ThreeStepsSection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import UpsellModal from './components/UpsellModal';
import { trackUTMifyEvent, getCurrentUrlParams } from './utils/urlUtils';

function App() {
  useEffect(() => {
    // Track page load with URL parameters
    trackUTMifyEvent('page_load', {
      page: 'landing_page',
      url_params: getCurrentUrlParams(),
      timestamp: new Date().toISOString()
    });
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Header />
      <NotificationSystem />
      <ToolsSection />
      <ExclusiveBonusSection />
      <BonusSection />
      <PricingSection />
      <ThreeStepsSection />
      <TestimonialsSection />
      <FAQSection />
      <UpsellModal />
    </div>
  );
}

export default App;