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
    
    function toogleError (input, show) {
        const errorId = input.getAttribute('aria-describedby');
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
         if (show)  {
            input.classList.add('error');
            errorElement.classList.remove('show');
        } else {
            input.classList.add('error');
            errorElement.classList.remove('show');
        }
     }
    }

    function validateField(input)  {
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


    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;

        formInputs.forEach(function(input) {
            const valid = validateField(input);
            toogleError(input, !valid);
            if (!valid) isValid = false;
        });

        if (isValid) {
            successMessage.classList.add('show');
            contactForm.requestFullscreen();

             setTimeout(function() { 
            successMessage.classList.remove('show'); 
        }, 5000); 
        }
    });
       
    
formInputs.forEach(input => { 
    input.addEventListener('blur', () => { 
        if (input.value.trim() !== '') { 
            const valid = validateField(input); 
            toogleError(input, valid);
        }
    });
    
     input.addEventListener('input', () => { 
        if (input.classList.contains('error')) { 
            const valid = validateField(input);
            if (valid) toogleError(input, false);
         } 
        }); 
    });
}
