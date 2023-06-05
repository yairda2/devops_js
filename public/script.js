async function fetchUsers() {
  try {
    const response = await fetch('/grades');
    const data = await response.json();
  
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
  
    data.forEach(user => {
      const listItem = document.createElement('li');
      listItem.textContent = `${user.name}: ${user.grade1}, ${user.grade2}, ${user.grade3}`;
      userList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error occurred while fetching users:', error);
  }
}

async function submitForm(event) {
  event.preventDefault();
  
  const nameInput = document.getElementById('name');
  const grade1Input = document.getElementById('grade1');
  const grade2Input = document.getElementById('grade2');
  const grade3Input = document.getElementById('grade3');
  
  const name = nameInput.value;
  const grade1 = grade1Input.value;
  const grade2 = grade2Input.value;
  const grade3 = grade3Input.value;
  
  const payload = {
    name,
    grade1,
    grade2,
    grade3
  };
  
  try {
    const response = await fetch('/grades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  
    if (response.ok) {
      nameInput.value = '';
      grade1Input.value = '';
      grade2Input.value = '';
      grade3Input.value = '';
  
      fetchUsers();
    } else {
      console.error('Error occurred while saving the grade.');
    }
  } catch (error) {
    console.error('Error occurred while submitting the form:', error);
  }
}

fetchUsers();
