// barba.js
// Wipe transition with page name reveal for Litverse (no AJAX, just a true page reload during the second wipe)

(function() {
  let isTransitioning = false;
  let wipe, wipeText;

  function createWipe() {
    if (document.getElementById('barba-wipe')) return;
    wipe = document.createElement('div');
    wipe.id = 'barba-wipe';
    wipe.style.position = 'fixed';
    wipe.style.top = 0;
    wipe.style.left = 0;
    wipe.style.width = '100vw';
    wipe.style.height = '100vh';
    wipe.style.zIndex = 9999;
    wipe.style.transform = 'translateX(-100vw)';
    wipe.style.transition = 'transform 0.5s cubic-bezier(.77,0,.18,1)'; // Fast for first wipe
    wipe.style.display = 'flex';
    wipe.style.alignItems = 'center';
    wipe.style.justifyContent = 'center';
    wipe.style.pointerEvents = 'none';
    wipe.innerHTML = `
      <svg width="100%" height="100%" style="position:absolute;top:0;left:0;z-index:0;" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="barba-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#555" stroke-width="0.8" opacity="0.4"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="#232323"/>
        <rect width="100%" height="100%" fill="url(#barba-grid)"/>
      </svg>
    `;
    wipeText = document.createElement('div');
    wipeText.id = 'barba-wipe-text';
    wipeText.style.position = 'relative';
    wipeText.style.zIndex = 1;
    wipeText.style.color = '#e8e8e8';
    wipeText.style.fontFamily = "'Pirata One', 'Josefin Sans', serif";
    wipeText.style.fontSize = '2.2em';
    wipeText.style.letterSpacing = '0.1em';
    wipeText.style.opacity = 0;
    wipeText.style.transition = 'opacity 0.5s cubic-bezier(.77,0,.18,1)';
    wipe.appendChild(wipeText);
    document.body.appendChild(wipe);
  }

  function showWipe(text, href) {
    wipeText.textContent = text;
    wipeText.style.opacity = 0;
    wipe.style.pointerEvents = 'auto';
    wipe.style.transition = 'transform 0.8s cubic-bezier(.77,0,.18,1)'; // Slower for first wipe
    wipe.style.transform = 'translateX(0)';
    setTimeout(() => {
      wipeText.style.opacity = 1;
      setTimeout(() => {
        wipeText.style.opacity = 0;
        setTimeout(() => {
          // --- HIDE OLD PAGE CONTENT BEFORE SECOND WIPE ---
          document.body.style.transition = 'opacity 0.3s cubic-bezier(.77,0,.18,1)';
          document.body.style.background = '#2a2a2a';
          document.body.style.opacity = '0';
          // --- SECOND WIPE (FASTER) ---
          wipe.style.transition = 'transform 1.1s cubic-bezier(.77,0,.18,1)'; // Faster for second wipe
          wipe.style.transform = 'translateX(100vw)';
          // Move navigation AFTER the wipe is fully gone
          setTimeout(() => {
            window.location.href = href;
          }, 1100); // Wait for wipe to finish before navigating
        }, 600);
      }, 900);
    }, 600);
  }

  function resetWipe() {
    wipe.style.transition = 'transform 0.5s cubic-bezier(.77,0,.18,1)';
    wipe.style.transform = 'translateX(-100vw)';
    wipe.style.pointerEvents = 'none';
  }

  // Smooth scroll to top for any 'move to top' link or button
  function enableSmoothScrollToTop() {
    document.addEventListener('click', function(e) {
      const el = e.target.closest('a, button');
      if (!el) return;
      // Accepts links or buttons with href="#top", class="move-to-top", or id="moveToTop"
      if (
        (el.tagName === 'A' && el.getAttribute('href') === '#top') ||
        el.classList.contains('move-to-top') ||
        el.id === 'moveToTop'
      ) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    createWipe();
    enableSmoothScrollToTop(); // Enable smooth scroll to top
    document.addEventListener('click', function(e) {
      if (isTransitioning) return;
      const a = e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) return;
      if (a.target === '_blank') return;
      e.preventDefault();
      isTransitioning = true;
      showWipe(a.textContent.trim() || 'Loading…', href);
    });
    setTimeout(resetWipe, 100);
  });
})();
