/**
 * Main Application Entry Point
 * Lightweight TypeScript for LP optimization
 */

import { initUTMTracking, buildURLWithUTM } from './utils/utm-tracker';
import { initAccordion } from './components/accordion';
import { initLazyLoad } from './components/lazy-load';
import { initChatbotTrigger } from './components/chatbot';

// Initialize on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 LP CRC Optimized v2.0 - Loaded');

  // Initialize UTM tracking
  initUTMTracking();

  // Initialize lazy loading for sections
  initLazyLoad();

  // Initialize FAQ accordion
  initAccordion();

  // Initialize chatbot trigger
  initChatbotTrigger();

  // Setup CTA buttons with UTM tracking
  setupCTAButtons();

  // Setup smooth scroll for anchor links
  setupSmoothScroll();
});

/**
 * Setup all CTA buttons with UTM tracking
 */
function setupCTAButtons(): void {
  const ctaButtons = document.querySelectorAll<HTMLAnchorElement>('.cta-button');

  ctaButtons.forEach(button => {
    const baseUrl = button.dataset.url;
    if (!baseUrl) return;

    button.addEventListener('click', (e) => {
      e.preventDefault();
      const urlWithUTM = buildURLWithUTM(baseUrl);

      // Track conversion event (if analytics loaded)
      trackConversion('cta_click', urlWithUTM);

      // Redirect to checkout
      window.location.href = urlWithUTM;
    });
  });
}

/**
 * Setup smooth scroll for anchor links
 */
function setupSmoothScroll(): void {
  const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
}

/**
 * Track conversion events (Facebook Pixel, Clarity, etc)
 */
function trackConversion(eventName: string, url: string): void {
  // Facebook Pixel
  if (typeof (window as any).fbq === 'function') {
    (window as any).fbq('track', 'InitiateCheckout', {
      content_name: eventName,
      value: 0,
      currency: 'BRL'
    });
  }

  // Microsoft Clarity custom event
  if (typeof (window as any).clarity === 'function') {
    (window as any).clarity('set', 'cta_click', url);
  }

  console.log(`📊 Conversion tracked: ${eventName}`, url);
}

// VTurb player ready event listener
document.addEventListener('DOMContentLoaded', () => {
  const player = document.querySelector('vturb-smartplayer');

  if (player) {
    player.addEventListener('player:ready', () => {
      console.log('▶️ VTurb player ready');

      // Optional: Track video milestones
      (player as any).on?.('progress', (data: any) => {
        const progress = Math.floor(data.percent * 100);

        // Track 25%, 50%, 75%, 100% milestones
        if ([25, 50, 75, 100].includes(progress)) {
          trackConversion(`video_${progress}`, `Video watched ${progress}%`);
        }
      });
    });
  }
});
