/**
 * Botpress Chatbot Integration
 * Loads chatbot on demand to avoid blocking initial page load
 */

let chatbotLoaded = false;

export function loadChatbot(): void {
  if (chatbotLoaded) return;

  const script = document.createElement('script');
  script.src = 'https://cdn.botpress.cloud/webchat/v2.2/inject.js';
  script.async = true;

  script.onload = () => {
    const configScript = document.createElement('script');
    configScript.src = 'https://files.bpcontent.cloud/2024/12/10/16/20241210160527-Z4FQWTXK.js';
    configScript.async = true;
    document.head.appendChild(configScript);
  };

  document.head.appendChild(script);
  chatbotLoaded = true;
}

export function initChatbotTrigger(): void {
  const triggerButton = document.getElementById('chatbot-trigger');
  if (!triggerButton) return;

  // Show trigger button when user reaches FAQ section
  const faqSection = document.querySelector('[data-section="faq"]');
  if (!faqSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        triggerButton.classList.remove('hidden');
        loadChatbot();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(faqSection);

  // Add click handler to trigger button
  triggerButton.addEventListener('click', () => {
    loadChatbot();

    // Trigger Botpress chat open (if API is available)
    setTimeout(() => {
      const botpressWindow = (window as any).botpress;
      if (botpressWindow?.open) {
        botpressWindow.open();
      }
    }, 1000);
  });

  // Auto-load after 7 seconds as fallback
  setTimeout(() => {
    loadChatbot();
  }, 7000);
}
