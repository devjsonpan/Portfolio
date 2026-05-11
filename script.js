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
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = contactForm.querySelector('[name="name"]').value.trim();
    const email = contactForm.querySelector('[name="email"]').value.trim();
    const message = contactForm.querySelector('[name="message"]').value.trim();

    const subject = encodeURIComponent(`Portfolio message from ${name || 'visitor'}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    window.location.href = `mailto:j98pan@uwaterloo.ca?subject=${subject}&body=${body}`;
  });
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