// Create animated particles
function createParticles() {
  const particlesContainer = document.querySelector('.particles');
  const particleCount = window.innerWidth > 768 ? 50 : 25;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    particlesContainer.appendChild(particle);
  }
}

// Update scroll progress indicator
function updateScrollProgress() {
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
}

// Form submission with improved UX
document.getElementById('leadForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  
  const submitBtn = this.querySelector('.submit-btn');
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const link = document.getElementById('link').value.trim();
  const extra = document.getElementById('extra').value.trim();

  // Email validation
  if (!email.includes('@')) {
    showError('כתובת מייל לא תקינה. שכחת "@" אולי?');
    return;
  }

  // URL validation
  if (!link.startsWith('http://') && !link.startsWith('https://')) {
    showError('נא להזין קישור תקין (צריך להתחיל ב-http או https)');
    return;
  }

  // Show loading state
  submitBtn.classList.add('loading');

  const formData = new FormData();
  formData.append('שם', name);
  formData.append('אימייל', email);
  formData.append('קישור', link);
  formData.append('הערות', extra);

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbwAeCv7jySowQrJEmQ3mPpzCwHvRzStxELHciWBGiORFp__TKheOrSOsGPL8XevnKkaew/exec', {
      method: 'POST',
      body: formData
    });

    // Show success message
    showSuccessMessage();
    
    // Reset form
    this.reset();
    
  } catch (error) {
    showError('הייתה שגיאה בשליחת הפרטים. אנא נסה שוב.');
  } finally {
    // Remove loading state
    submitBtn.classList.remove('loading');
  }
});

function showSuccessMessage() {
  const successMsg = document.getElementById('successMessage');
  successMsg.classList.add('show');
  
  setTimeout(() => {
    successMsg.classList.remove('show');
  }, 4000);
}

function showError(message) {
  // Create a temporary error message
  const errorMsg = document.createElement('div');
  errorMsg.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(45deg, #ff6b6b, #ff5252);
    color: white;
    padding: 1rem 2rem;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(255, 107, 107, 0.4);
    z-index: 1000;
    font-weight: 600;
    animation: slideDown 0.3s ease-out;
  `;
  errorMsg.textContent = message;
  document.body.appendChild(errorMsg);
  
  setTimeout(() => {
    errorMsg.style.animation = 'slideUp 0.3s ease-out forwards';
    setTimeout(() => document.body.removeChild(errorMsg), 300);
  }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  createParticles();
  window.addEventListener('scroll', updateScrollProgress);
  
  // Add smooth scrolling for mobile
  if (window.innerWidth <= 768) {
    document.body.style.scrollBehavior = 'smooth';
  }
});