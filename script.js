// Starfield background animation
const starfield = document.querySelector('.starfield');

if (starfield) {
  const starPalette = [
    { color: 'rgba(255,255,255,0.92)',   glow: 'rgba(255,255,255,0.5)',   glowSize: '4px'  },
    { color: 'rgba(255,255,255,0.60)',   glow: 'rgba(255,255,255,0.25)',  glowSize: '2px'  },
    { color: 'rgba(147,197,253,0.92)',   glow: 'rgba(147,197,253,0.6)',   glowSize: '6px'  },
    { color: 'rgba(196,181,253,0.90)',   glow: 'rgba(196,181,253,0.55)',  glowSize: '6px'  },
    { color: 'rgba(254,240,138,0.85)',   glow: 'rgba(254,240,138,0.45)',  glowSize: '5px'  },
  ];

  const starCount = 100;
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('span');
    star.className = 'star';

    const sizeRoll = Math.random();
    let size;
    if (sizeRoll < 0.25)      size = 0.5 + Math.random() * 1;
    else if (sizeRoll < 0.82) size = 1.2 + Math.random() * 1.3;
    else                      size = 2.5 + Math.random() * 1.5;

    const roll = Math.random();
    const palette = roll < 0.40 ? starPalette[0]
                  : roll < 0.60 ? starPalette[1]
                  : roll < 0.75 ? starPalette[2]
                  : roll < 0.90 ? starPalette[3]
                  :               starPalette[4];

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDuration = `${3 + Math.random() * 4}s`;
    star.style.animationDelay = `${Math.random() * 6}s`;
    star.style.setProperty('--star-color', palette.color);
    star.style.setProperty('--star-glow-color', palette.glow);
    star.style.setProperty('--star-glow-size', palette.glowSize);
    // Twinkle intensity: 55% faint, 35% mid, 10% strong
    const twinkleRoll = Math.random();
    star.style.animationName = twinkleRoll < 0.55 ? 'star-twinkle-faint'
                             : twinkleRoll < 0.90 ? 'star-twinkle-mid'
                             :                      'star-twinkle-strong';
    starfield.appendChild(star);
  }

  // Star clusters — denser patches to mimic real night sky depth
  const clusters = [
    { cx: 68, cy: 18, count: 14, spread: 4.5 },
    { cx: 22, cy: 48, count: 11, spread: 3.5 },
    { cx: 82, cy: 72, count: 10, spread: 4.0 },
  ];

  clusters.forEach(({ cx, cy, count, spread }) => {
    for (let i = 0; i < count; i++) {
      const star = document.createElement('span');
      star.className = 'star';
      const angle = Math.random() * Math.PI * 2;
      const dist  = Math.pow(Math.random(), 0.5) * spread; // bias toward centre
      const size  = 0.4 + Math.random() * 0.9;
      star.style.width  = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left   = `${cx + Math.cos(angle) * dist}%`;
      star.style.top    = `${cy + Math.sin(angle) * dist}%`;
      star.style.animationDuration = `${2.5 + Math.random() * 3}s`;
      star.style.animationDelay   = `${Math.random() * 6}s`;
      star.style.animationName    = Math.random() < 0.7 ? 'star-twinkle-faint' : 'star-twinkle-mid';
      star.style.setProperty('--star-color',      'rgba(210, 220, 255, 0.75)');
      star.style.setProperty('--star-glow-color', 'rgba(180, 200, 255, 0.25)');
      star.style.setProperty('--star-glow-size',  '2px');
      starfield.appendChild(star);
    }
  });

  const shootingCount = 3;
  for (let i = 0; i < shootingCount; i++) {
    const shootingStar = document.createElement('span');
    shootingStar.className = 'shooting-star';
    shootingStar.style.left = `${Math.random() * 75}%`;
    shootingStar.style.top = `${Math.random() * 40}%`;
    shootingStar.style.animationDelay = `${i * 7 + Math.random() * 5}s`;
    shootingStar.style.animationDuration = `${3 + Math.random() * 1.5}s`;
    // Tight angle range 140â€“150Â°: steep downward-right, all stars look the same direction
    const angle = 140 + Math.random() * 10;
    const dist = 1300 + Math.random() * 500;
    const rad = angle * Math.PI / 180;
    shootingStar.style.setProperty('--shoot-angle', `${angle}deg`);
    shootingStar.style.setProperty('--shoot-dx', `${Math.sin(rad) * dist}px`);
    shootingStar.style.setProperty('--shoot-dy', `${-Math.cos(rad) * dist}px`);
    starfield.appendChild(shootingStar);
  }

  const spaceObjects = [
    { type: 'planet',   left: '12%', top: '18%', size: 110, delay: '0s', parallax: 0.05 },
    { type: 'moon',     left: '80%', top: '10%', size: 42,  delay: '2s', parallax: 0.03 },
    { type: 'asteroid', left: '58%', top: '28%', size: 22,  delay: '3s', parallax: 0.08 },
    { type: 'asteroid', left: '30%', top: '75%', size: 18,  delay: '5s', parallax: 0.06 }
  ];

  spaceObjects.forEach(object => {
    // Wrapper handles position + parallax; inner span keeps CSS float animation
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `position:absolute;left:${object.left};top:${object.top};width:${object.size}px;height:${object.size}px;will-change:transform;`;
    wrapper.dataset.parallax = object.parallax;

    const el = document.createElement('span');
    el.className = `space-object ${object.type}`;
    el.style.cssText = `width:${object.size}px;height:${object.size}px;position:absolute;left:0;top:0;`;
    el.style.animationDelay = object.delay;

    wrapper.appendChild(el);
    starfield.appendChild(wrapper);
  });

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    document.querySelectorAll('[data-parallax]').forEach(el => {
      el.style.transform = `translateY(${-scrollY * parseFloat(el.dataset.parallax)}px)`;
    });
  }, { passive: true });
}

// Typing animation for hero subtitle
const heroSubtitle = document.querySelector('.heroSubtitle');
if (heroSubtitle) {
  const fullText = heroSubtitle.textContent.trim();
  heroSubtitle.textContent = '';
  const cursorSpan = document.createElement('span');
  cursorSpan.className = 'typingCursor';
  heroSubtitle.appendChild(cursorSpan);
  let i = 0;
  function typeNext() {
    if (i < fullText.length) {
      cursorSpan.insertAdjacentText('beforebegin', fullText[i++]);
      setTimeout(typeNext, 55 + Math.random() * 35);
    }
  }
  setTimeout(typeNext, 700);
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
  const scrollPosition = window.pageYOffset;
  
  if (scrollPosition > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth scrolling for anchor links
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

smoothScrollLinks.forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const navbarHeight = 80;
      const targetPosition = targetSection.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navlink');

const updateActiveLink = () => {
  let currentSection = '';
  const scrollPosition = window.pageYOffset;
  const bottomThreshold = document.documentElement.scrollHeight - window.innerHeight - 10;

  if (scrollPosition >= bottomThreshold) {
    currentSection = 'contact';
  } else {
    sections.forEach(function(section) {
      const sectionTop = section.offsetTop;
      if (scrollPosition >= sectionTop - 200) {
        currentSection = section.getAttribute('id');
      }
    });
  }

  navLinks.forEach(function(link) {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
};

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('resize', updateActiveLink);
updateActiveLink();

// Magic-line nav indicator
const navIndicator    = document.querySelector('.navIndicator');
const navlinksEl      = document.querySelector('.navlinks');

if (navIndicator && navlinksEl) {
  let isHovering = false;

  function positionIndicator(el) {
    const cRect = navlinksEl.getBoundingClientRect();
    const lRect = el.getBoundingClientRect();
    navIndicator.style.left    = (lRect.left - cRect.left) + 'px';
    navIndicator.style.width   = lRect.width + 'px';
    navIndicator.style.opacity = '1';
  }

  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      isHovering = true;
      positionIndicator(link);
    });
  });

  navlinksEl.addEventListener('mouseleave', () => {
    isHovering = false;
    const active = navlinksEl.querySelector('.navlink.active');
    active ? positionIndicator(active) : (navIndicator.style.opacity = '0');
  });

  // Keep indicator in sync as scroll changes the active link
  window.addEventListener('scroll', () => {
    if (isHovering) return;
    const active = navlinksEl.querySelector('.navlink.active');
    active ? positionIndicator(active) : (navIndicator.style.opacity = '0');
  });

  // Initial position
  const initialActive = navlinksEl.querySelector('.navlink.active');
  if (initialActive) positionIndicator(initialActive);
}

// Fade-in animation on scroll
const fadeCards = document.querySelectorAll('.projectCard, .contactCard, .timelineItem, .contactFormCard');

fadeCards.forEach(function(card) {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const fadeObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

fadeCards.forEach(function(card) {
  fadeObserver.observe(card);
});

// Contact form send behavior
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = 'Sending...';
        await new Promise(resolve => setTimeout(resolve, 2000));
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(contactForm);
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                contactForm.reset();
                showFormStatus('âœ… Message sent!', 'success');
            } else {
                const data = await response.json();
                const errorMessage = data?.errors?.[0]?.message || 'Oops! Something went wrong. Please try again.';
                showFormStatus(`âŒ ${errorMessage}`, 'error');
            }
        } catch (error) {
            showFormStatus('âŒ Network error. Please check your connection.', 'error');
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

function showFormStatus(message, type) {
    const statusEl = document.getElementById('formStatus');
    if (statusEl) {
        statusEl.textContent = message;
        statusEl.classList.remove('success', 'error');
        statusEl.classList.add(type);

        // Clear message after 5 seconds
        clearTimeout(statusEl._clearTimeout);
        statusEl._clearTimeout = setTimeout(() => {
            statusEl.textContent = '';
            statusEl.classList.remove('success', 'error');
        }, 5000);
    }
}

// Project tag scroller buttons
const tagWrappers = document.querySelectorAll('.projectTagsWrapper');

tagWrappers.forEach(wrapper => {
  const tagRow = wrapper.querySelector('.projectTags');
  const leftBtn = wrapper.querySelector('.tagScrollBtn.left');
  const rightBtn = wrapper.querySelector('.tagScrollBtn.right');
  const scrollAmount = 140;

  const updateButtons = () => {
    leftBtn.disabled = tagRow.scrollLeft <= 0;
    rightBtn.disabled = tagRow.scrollLeft + tagRow.clientWidth >= tagRow.scrollWidth - 1;
  };

  leftBtn.addEventListener('click', () => {
    tagRow.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  rightBtn.addEventListener('click', () => {
    tagRow.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  tagRow.addEventListener('scroll', updateButtons);
  window.addEventListener('resize', updateButtons);
  updateButtons();
});

// Timeline rocket â€” follows hovered item
const timelineEl     = document.querySelector('.timeline');
const rocket         = document.querySelector('.timelineRocket');
const timelineItems  = document.querySelectorAll('.timelineItem');

if (timelineEl && rocket && timelineItems.length) {
  const iconCenterY = (item) => {
    const icon = item.querySelector('.timelineIcon');
    const tlRect   = timelineEl.getBoundingClientRect();
    const iconRect = icon.getBoundingClientRect();
    return iconRect.top - tlRect.top + iconRect.height / 2;
  };

  timelineItems.forEach((item, i) => {
    item.addEventListener('mouseenter', (e) => {
      const isLast = i === timelineItems.length - 1;
      const targetY = isLast
        ? timelineEl.offsetHeight
        : (iconCenterY(item) + iconCenterY(timelineItems[i + 1])) / 2;

      rocket.style.top     = (targetY - rocket.offsetHeight / 2) + 'px';
      rocket.style.opacity = '1';

      // Use the cursor's entry point on the card to determine direction:
      // entered from above card midpoint â†’ going down; from below â†’ going up.
      // mouseenter fires at the moment of first crossing, so clientY reliably
      // reflects which side the cursor came from regardless of prior state.
      const itemRect = item.getBoundingClientRect();
      const enteredFromAbove = e.clientY <= itemRect.top + itemRect.height / 2;
      rocket.style.transform = enteredFromAbove
        ? 'translateX(-50%) rotate(135deg)'
        : 'translateX(-50%) rotate(-45deg)';
    });
  });

  const experienceSection = document.querySelector('#experience');
  (experienceSection || timelineEl).addEventListener('mouseleave', () => {
    rocket.style.opacity = '0';
  });
}

// Custom cursor
const cursorDot = document.querySelector('.cursorDot');

if (cursorDot) {
  document.addEventListener('mousemove', e => {
    cursorDot.style.left    = e.clientX + 'px';
    cursorDot.style.top     = e.clientY + 'px';
    cursorDot.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => { cursorDot.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { cursorDot.style.opacity = '1'; });

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursorDot.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursorDot.classList.remove('hovering'));
  });
}

