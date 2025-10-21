function updateTime() {
    const timeElement = document.querySelector('[data-testid="test-user-time"]');
if (timeElement) {
timeElement.textContent = Date.now();
    }
}

updateTime();

setInterval(updateTime, 1000);

 const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const successMessage = document.querySelector('[data-testid="test-contact-success"]');
  const formInputs = contactForm.querySelectorAll('input, textarea');

  function toggleError(input, show) {
    const errorId = input.getAttribute('aria-describedby');
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
      if (show) {
        input.classList.add('error');
        errorElement.classList.add('show');
      } else {
        input.classList.remove('error');
        errorElement.classList.remove('show');
      }
    }
  }

  function validateField(input) {
    const value = input.value.trim();
    const id = input.id;

    if (id === 'contactName' || id === 'contactSubject') {
      return value !== '';
    }

    if (id === 'contactEmail') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    }

    if (id === 'contactMessage') {
      return value.length >= 10;
    }

    return true;
  }

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let isValid = true;

    formInputs.forEach(input => {
      const valid = validateField(input);
      toggleError(input, !valid);
      if (!valid) isValid = false;
    });

    if (isValid) {
      successMessage.classList.add('show');
      contactForm.reset();
      setTimeout(() => {
        successMessage.classList.remove('show');
      }, 4000);
    }
  });

  // Re-validate when user types or leaves input
  formInputs.forEach(input => {
    input.addEventListener('blur', () => {
      const valid = validateField(input);
      toggleError(input, !valid);
    });

    input.addEventListener('input', () => {
      const valid = validateField(input);
      if (valid) toggleError(input, false);
    });
  });
}
