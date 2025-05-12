// Client-side JavaScript for Dining Events App

// Function to handle the join button click with confirmation
document.addEventListener('DOMContentLoaded', function() {
    // Find all join event buttons
    const joinButtons = document.querySelectorAll('.join-btn');
    
    // Add click event listeners to each join button
    if (window.currentUser) {
        joinButtons.forEach(button => {
        button.addEventListener('click', function(event) {
          // Get the event name from the closest event card
          const eventCard = this.closest('.event-card');
          const eventName = eventCard ? eventCard.querySelector('.event-title').textContent : 'this event';
          
          // Ask for confirmation before joining
          const confirmJoin = confirm(`Are you sure you want to join ${eventName}?`);
          
          // If the user cancels, prevent form submission
          if (!confirmJoin) {
            event.preventDefault();
          }
        });
      });
    }
    
    
    // Form validation for create event form
    const createEventForm = document.querySelector('form[action="/events/create"]');

    // Add event type selector
    const typeSelect = document.getElementById('type');
    const diningFields = document.querySelectorAll('.dining-fields');
    const tripFields = document.querySelectorAll('.trip-fields');

    function onTypeChange() {
      const t = typeSelect.value;

      // Toggle dining fields
      if (diningFields) {
        diningFields.forEach(field => {
          field.style.display = t === 'dining' ? 'block' : 'none';

          // Find input elements and set/remove required attribute
          const inputs = field.querySelectorAll('input, textarea, select');
          inputs.forEach(input => {
            if (t === 'dining') {
              input.setAttribute('required', '');
            } else {
              input.removeAttribute('required');
            }
          });
        });
      }

      // Toggle dining fields
      if (tripFields) {
          tripFields.forEach(field => {
            field.style.display = t === 'trip' ? 'block' : 'none';

            // Find input elements and set/remove required attribute
            const inputs = field.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
              if (t === 'trip') {
                input.setAttribute('required', '');
              } else {
                input.removeAttribute('required');
              }
            });
          });
      }
    }

    if (typeSelect) {
      typeSelect.addEventListener('change', onTypeChange);
      // Call onTypeChange initially to set the initial state
      onTypeChange();
    }
    
    if (createEventForm) {
      createEventForm.addEventListener('submit', function(event) {
        // Get form elements
        const nameInput = document.getElementById('eventName');
        const dateInput = document.getElementById('eventDate');
        const timeInput = document.getElementById('eventTime');
        const descriptionInput = document.getElementById('eventDescription');
        const endDateInput = document.getElementById('eventEndDate');
        
        if(!typeSelect.value) {
          alert('Please choose one type');
          event.preventDefault();
          return;
        }

        // Basic validation
        if (nameInput && nameInput.value.trim() === '') {
          alert('Please enter an event name');
          event.preventDefault();
          return;
        }
        
        if (descriptionInput && descriptionInput.value.trim().length < 10) {
          alert('Please enter a description of at least 10 characters');
          event.preventDefault();
          return;
        }
        
        // Validate date is in the future
        if (dateInput && timeInput && endDateInput) {
          const eventDate = new Date(`${dateInput.value}T${timeInput.value}`);
          const now = new Date();
          
          if (eventDate <= now) {
            alert('Event date and time must be in the future');
            event.preventDefault();
            return;
          }
        }
      });
    }
    
    // Form validation for user profile update
    const profileForm = document.querySelector('form[action="/users/profile"]');
    if (profileForm) {
      profileForm.addEventListener('submit', function(event) {
        const nameInput = document.getElementById('userName');
        
        if (nameInput && nameInput.value.trim() === '') {
          alert('Please enter your name');
          event.preventDefault();
          return;
        }
      });
    }
    
    // Form validation for password change
    const passwordForm = document.querySelector('form[action="/users/change-password"]');
    if (passwordForm) {
      passwordForm.addEventListener('submit', function(event) {
        const currentPassword = document.getElementById('currentPassword');
        const newPassword = document.getElementById('newPassword');
        const confirmPassword = document.getElementById('confirmPassword');
        
        if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
          alert('New password and confirmation do not match');
          event.preventDefault();
          return;
        }
        
        if (newPassword && newPassword.value.length < 6) {
          alert('Password must be at least 6 characters long');
          event.preventDefault();
          return;
        }
      });
    }
    
    // Form validation for login and registration
    const loginForm = document.querySelector('form[action="/login"]');
    if (loginForm) {
      loginForm.addEventListener('submit', function(event) {
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        
        if (email && !isValidEmail(email.value)) {
          alert('Please enter a valid email address');
          event.preventDefault();
          return;
        }
      });
    }
    
    const registerForm = document.querySelector('form[action="/register"]');
    if (registerForm) {
      registerForm.addEventListener('submit', function(event) {
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        
        if (email && !isValidEmail(email.value)) {
          alert('Please enter a valid email address');
          event.preventDefault();
          return;
        }
        
        if (password && confirmPassword && password.value !== confirmPassword.value) {
          alert('Password and confirmation do not match');
          event.preventDefault();
          return;
        }
      });
    }
    
    // Helper function to validate email format
    function isValidEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
  });