// Utility functions for URL parameter handling

/**
 * Gets current URL search parameters
 */
export const getCurrentUrlParams = (): string => {
  return window.location.search;
};

/**
 * Builds URL with current parameters preserved
 */
export const buildUrlWithParams = (baseUrl: string): string => {
  const currentParams = window.location.search;
  const separator = baseUrl.includes('?') ? '&' : '?';
  return currentParams ? `${baseUrl}${separator}${currentParams.substring(1)}` : baseUrl;
};

/**
 * Redirects to URL preserving current parameters
 */
export const redirectWithParams = (url: string): void => {
  // Force all URL parameters to be passed
  const currentParams = window.location.search;
  const separator = url.includes('?') ? '&' : '?';
  const urlWithParams = currentParams ? `${url}${separator}${currentParams.substring(1)}` : url;
  
  console.log('Redirecting with params:', urlWithParams);
  window.location.href = urlWithParams;
};

/**
 * Opens URL in new tab preserving current parameters
 */
export const openInNewTabWithParams = (url: string): void => {
  // Force all URL parameters to be passed
  const currentParams = window.location.search;
  const separator = url.includes('?') ? '&' : '?';
  const urlWithParams = currentParams ? `${url}${separator}${currentParams.substring(1)}` : url;
  
  window.open(urlWithParams, '_blank');
};

/**
 * Gets specific parameter value from URL
 */
export const getUrlParameter = (name: string): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
};

/**
 * Adds or updates a parameter in the current URL
 */
export const updateUrlParameter = (name: string, value: string): void => {
  const url = new URL(window.location.href);
  url.searchParams.set(name, value);
  window.history.replaceState({}, '', url.toString());
};

/**
 * Tracks UTMify events with current parameters
 */
export const trackUTMifyEvent = (eventName: string, eventData?: Record<string, any>): void => {
  try {
    // Check if UTMify is loaded
    if (typeof window !== 'undefined' && (window as any).utmify && typeof (window as any).utmify.track === 'function') {
      (window as any).utmify.track(eventName, {
        ...eventData,
        url_params: window.location.search,
        full_url: window.location.href,
        timestamp: new Date().toISOString()
      });
    } else {
      // Fallback: log to console in development
      console.log('UTMify Event:', eventName, {
        ...eventData,
        url_params: window.location.search,
        full_url: window.location.href
      });
    }
  } catch (error) {
    console.warn('UTMify tracking error:', error);
  }
};
/**
 * Enhanced redirect function that ensures ALL parameters are preserved
 */
export const forceRedirectWithAllParams = (url: string): void => {
  // Get all current URL parameters
  const currentParams = window.location.search;
  
  // Build final URL with all parameters
  let finalUrl = url;
  if (currentParams) {
    const separator = url.includes('?') ? '&' : '?';
    finalUrl = `${url}${separator}${currentParams.substring(1)}`;
  }
  
  // Log for debugging
  console.log('Original URL:', url);
  console.log('Current params:', currentParams);
  console.log('Final redirect URL:', finalUrl);
  
  // Force redirect
  window.location.href = finalUrl;
};