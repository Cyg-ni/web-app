document.addEventListener('DOMContentLoaded', () => {
  const userForm = document.getElementById('userForm');
  const usersTable = document.getElementById('usersTable').getElementsByTagName('tbody')[0];

  // Fetch users and update the table
  function fetchUsers() {
    fetch('/users')
      .then(response => response.json())
      .then(users => {
        // Clear the table first
        usersTable.innerHTML = '';

        // Populate the table with user data
        users.forEach(user => {
          const row = usersTable.insertRow();
          row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
          `;
        });
      })
      .catch(error => console.error('Error fetching users:', error));
  }

  // Add user via form submission
  userForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Send POST request to add a new user
    fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    })
      .then(response => response.json())
      .then(user => {
        // Clear the form
        userForm.reset();
        // Refresh the user list
        fetchUsers();
      })
      .catch(error => console.error('Error adding user:', error));
  });

  // Initially fetch and display users
  fetchUsers();
});
