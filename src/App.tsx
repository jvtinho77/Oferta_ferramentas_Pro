import React, { useEffect } from 'react';
import UnifiedSection from './components/UnifiedSection';
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
      <UnifiedSection />
      <UpsellModal />
    </div>
  );
}

export default App;