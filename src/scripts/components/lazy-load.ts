/**
 * Lazy Loading with Intersection Observer
 * Loads sections progressively for better performance
 */

export function initLazyLoad(): void {
  const sections = document.querySelectorAll('.loading');

  if (!sections.length) return;

  const observerOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '100px', // Start loading 100px before section enters viewport
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('loaded');
        entry.target.classList.remove('loading');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}
