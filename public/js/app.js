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
            <td>${user.accountId}</td>   
            <td>${user.username}</td>   
            <td>${user.email}</td>
            <td>${new Date(user.creationDate).toLocaleString()}</td>
            <td>
              <button onclick="updateUser(${user.accountId})">Update</button>
              <button onclick="deleteUser(${user.accountId})">Delete</button>
            </td>            
          `;
        });
      })
      .catch(error => console.error('Error fetching users:', error));
  }

  // Function to delete a user
  window.deleteUser = function(accountId) {
    fetch(`/users/${accountId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log('User deleted:', data);
        fetchUsers(); // Refresh the user list after deletion
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  // Function to update a user
  window.updateUser = function(accountId) {
    const username = prompt("Enter new username:");
    const email = prompt("Enter new email:");

    fetch(`/users/${accountId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('User updated:', data);
        fetchUsers(); // Refresh the user list after update
      })
      .catch(error => console.error('Error updating user:', error));
  };

  // Add user via form submission
  userForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload

    const username = document.getElementById('username').value;  
    const email = document.getElementById('email').value;

    // Send POST request to add a new user
    fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email })  
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
