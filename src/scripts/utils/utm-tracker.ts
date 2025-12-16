/**
 * UTM Tracker - Capture and append UTM parameters to checkout URLs
 */

interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export function getUTMParams(): UTMParams {
  const params = new URLSearchParams(window.location.search);

  return {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    utm_term: params.get('utm_term') || undefined,
    utm_content: params.get('utm_content') || undefined,
  };
}

export function buildURLWithUTM(baseUrl: string): string {
  const utmParams = getUTMParams();
  const url = new URL(baseUrl);

  // Append UTM parameters if they exist
  Object.entries(utmParams).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });

  // Add sck parameter for Kiwify/Hotmart tracking
  const sckValue = [
    utmParams.utm_source || '',
    utmParams.utm_medium || '',
    utmParams.utm_campaign || '',
    utmParams.utm_term || '',
    utmParams.utm_content || ''
  ].join('|');

  if (sckValue.replace(/\|/g, '')) {
    url.searchParams.set('sck', sckValue);
  }

  return url.toString();
}

export function initUTMTracking(): void {
  // Store UTM params in sessionStorage for persistence
  const params = getUTMParams();
  if (Object.values(params).some(v => v !== undefined)) {
    sessionStorage.setItem('utm_params', JSON.stringify(params));
  }
}
