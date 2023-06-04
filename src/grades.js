window.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
  
    registrationForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const name = document.getElementById('name').value;
      const exam1 = document.getElementById('exam1').value;
      const exam2 = document.getElementById('exam2').value;
      const exam3 = document.getElementById('exam3').value;
  
      try {
        const response = await fetch('/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, exam1, exam2, exam3 }),
        });
  
        if (response.ok) {
          alert('Registration successful');
        } else {
          alert('Registration failed');
        }
      } catch (error) {
        alert('An error occurred');
      }
    });
  });
  