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

// Fade-in animation on scroll
const fadeCards = document.querySelectorAll('.projectCard, .contactCard, .timelineItem');

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
                showFormStatus('✅ Message sent!', 'success');
            } else {
                const data = await response.json();
                const errorMessage = data?.errors?.[0]?.message || 'Oops! Something went wrong. Please try again.';
                showFormStatus(`❌ ${errorMessage}`, 'error');
            }
        } catch (error) {
            showFormStatus('❌ Network error. Please check your connection.', 'error');
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