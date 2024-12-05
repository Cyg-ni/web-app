const sqlite3 = require('sqlite3').verbose();

// Open the SQLite database
const db = new sqlite3.Database('./mydatabase.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Function to create the 'users' table if it doesn't exist
const createTableIfNotExists = () => {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;
  
  db.run(createTableSQL, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Table "users" is ready (created or already exists).');
    }
  });
};

// Call the function to ensure the 'users' table is created
createTableIfNotExists();

// Function to get all users from the database
exports.getAllUsers = (callback) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      return callback(err);
    }
    callback(null, rows);
  });
};

// Function to add a new user to the database
exports.addUser = (name, email, callback) => {
  const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
  stmt.run([name, email], function (err) {
    if (err) {
      return callback(err);
    }
    callback(null, { id: this.lastID, name, email });
  });
  stmt.finalize();
};
