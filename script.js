// ============================================
// BEGINNER-FRIENDLY JAVASCRIPT FOR PORTFOLIO
// ============================================
// This file makes your website interactive!

// ============================================
// 1. MOBILE MENU - Opens/closes navigation on phones
// ============================================

// First, we "grab" the hamburger button and nav links from HTML
// Think of it like pointing to specific things on your page
const hamburger = document.getElementById('hamburger');
const navlinks = document.getElementById('navlinks');

// When someone clicks the hamburger button, run this code
hamburger.addEventListener('click', function() {
  // Toggle means "switch" - if menu is closed, open it. If open, close it.
  navlinks.classList.toggle('show');
  
  // Change the icon from bars (☰) to X when menu is open
  const icon = hamburger.querySelector('i');
  if (navlinks.classList.contains('show')) {
    // Menu is open, show X icon
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    // Menu is closed, show hamburger icon
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// Close menu when clicking any navigation link
// This loops through all nav links and adds a click listener to each
const allNavLinks = document.querySelectorAll('.navlink');
allNavLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    // Close the menu
    navlinks.classList.remove('show');
    // Reset icon back to hamburger
    const icon = hamburger.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  });
});

// ============================================
// 2. NAVBAR EFFECTS - Changes navbar when scrolling
// ============================================

const navbar = document.getElementById('navbar');

// This runs every time the user scrolls
window.addEventListener('scroll', function() {
  // Get how far down the page we've scrolled (in pixels)
  const scrollPosition = window.pageYOffset;
  
  // If we've scrolled more than 100 pixels down...
  if (scrollPosition > 100) {
    // Add the "scrolled" class (makes navbar smaller/different)
    navbar.classList.add('scrolled');
  } else {
    // Remove the class (navbar back to normal)
    navbar.classList.remove('scrolled');
  }
});

// ============================================
// 3. SMOOTH SCROLLING - Smooth animation when clicking links
// ============================================

// Find all links that start with # (anchor links)
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

// Add smooth scrolling to each link
smoothScrollLinks.forEach(function(link) {
  link.addEventListener('click', function(e) {
    // Prevent the default jump behavior
    e.preventDefault();
    
    // Get the target section from the link's href
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    // If the target section exists...
    if (targetSection) {
      // Calculate position (accounting for navbar height)
      const navbarHeight = 80;
      const targetPosition = targetSection.offsetTop - navbarHeight;
      
      // Scroll smoothly to that position
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================
// 4. ACTIVE NAV LINK - Highlights current section in navbar
// ============================================

// Get all sections and nav links
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navlink');

// Check which section is currently visible while scrolling
window.addEventListener('scroll', function() {
  let currentSection = '';
  const scrollPosition = window.pageYOffset;
  
  // Loop through each section to find which one is visible
  sections.forEach(function(section) {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    // If we're in this section's area (with 200px buffer)
    if (scrollPosition >= sectionTop - 200) {
      currentSection = section.getAttribute('id');
    }
  });
  
  // Update nav links to show which section is active
  navLinks.forEach(function(link) {
    // Remove active class from all links
    link.classList.remove('active');
    
    // Add active class to the link matching current section
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
});

// ============================================
// 5. FADE-IN ANIMATION - Cards fade in when scrolling to them
// ============================================

// Get all cards that should fade in
const fadeCards = document.querySelectorAll('.projectCard, .contactCard, .timelineItem');

// Set initial state - make cards invisible and moved down
fadeCards.forEach(function(card) {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Create an "observer" that watches when elements appear on screen
const fadeObserver = new IntersectionObserver(function(entries) {
  // Check each element that became visible
  entries.forEach(function(entry) {
    // If element is now visible...
    if (entry.isIntersecting) {
      // Fade it in by changing opacity and position
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      
      // Stop watching this element (only animate once)
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  // Options: trigger when 10% of element is visible
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

// Tell observer to watch all our cards
fadeCards.forEach(function(card) {
  fadeObserver.observe(card);
});

// ============================================
// THAT'S IT! Simple and effective.
// ============================================

/*
JAVASCRIPT BASICS YOU LEARNED:

1. document.getElementById() - Find an element by its ID
2. document.querySelector() - Find an element by CSS selector
3. document.querySelectorAll() - Find ALL elements matching selector
4. addEventListener() - Run code when something happens (click, scroll, etc.)
5. classList.add() / .remove() / .toggle() - Change CSS classes
6. forEach() - Loop through multiple items
7. if/else - Make decisions in code
8. IntersectionObserver - Detect when elements appear on screen

TIPS FOR LEARNING:
- Try changing numbers (like the 100 in scroll position) to see what happens
- Add console.log("message") anywhere to see what's happening
- Comment out sections (add // at start) to see what they do
- Break things! Best way to learn is experimenting
*/