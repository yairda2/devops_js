window.addEventListener('DOMContentLoaded', () => {
    fetch('/grades')
      .then(response => response.json())
      .then(grades => {
        const gradeList = document.getElementById('gradeList');
        grades.forEach(grade => {
          const li = document.createElement('li');
          li.textContent = `Grade 1: ${grade.grade1}, Grade 2: ${grade.grade2}, Grade 3: ${grade.grade3}`;
          gradeList.appendChild(li);
        });
      });
  });
  