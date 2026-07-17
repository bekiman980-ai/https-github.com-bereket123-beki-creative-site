export function reveal(root) {
  if (!root || root.__bkReveal) return; root.__bkReveal = true;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const kids = Array.from(root.children).filter(el => {
    const cs = getComputedStyle(el);
    return cs.position !== 'fixed' && cs.position !== 'sticky';
  });
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'none';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
  kids.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.75) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(44px)';
    el.style.transition = 'opacity 1.05s cubic-bezier(.22,.61,.36,1), transform 1.05s cubic-bezier(.22,.61,.36,1)';
    el.style.willChange = 'opacity, transform';
    io.observe(el);
  });
}
