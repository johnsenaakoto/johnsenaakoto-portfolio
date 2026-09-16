const carousel = document.querySelector('.photo-carousel');

if (carousel) {
    const reel = carousel.querySelector('.photo-reel');
    const previous = carousel.querySelector('[data-carousel-prev]');
    const next = carousel.querySelector('[data-carousel-next]');

    const scrollPhotos = direction => {
        const firstPhoto = reel.querySelector('img');
        const gap = parseFloat(getComputedStyle(reel).columnGap) || 0;
        const distance = firstPhoto ? (firstPhoto.clientWidth + gap) * 2 : reel.clientWidth;

        reel.scrollBy({
            left: direction * distance,
            behavior: 'smooth'
        });
    };

    previous.addEventListener('click', () => scrollPhotos(-1));
    next.addEventListener('click', () => scrollPhotos(1));
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!reduceMotion.matches) {
    const root = document.documentElement;
    let ticking = false;

    const updateGlow = () => {
        const scrollRatio = Math.min(window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1), 1);

        root.style.setProperty('--glow-drift-soft', `${scrollRatio * 8}rem`);
        root.style.setProperty('--glow-drift-medium', `${scrollRatio * 14}rem`);
        root.style.setProperty('--glow-drift-strong', `${scrollRatio * 20}rem`);
        ticking = false;
    };

    const requestGlowUpdate = () => {
        if (!ticking) {
            window.requestAnimationFrame(updateGlow);
            ticking = true;
        }
    };

    updateGlow();
    window.addEventListener('scroll', requestGlowUpdate, { passive: true });
    window.addEventListener('resize', requestGlowUpdate);
}
