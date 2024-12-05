
const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database('./mydatabase.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});


const createTableIfNotExists = () => {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS users (
      accountId INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL,
      creationDate DATETIME DEFAULT CURRENT_TIMESTAMP
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


createTableIfNotExists();


exports.getAllUsers = (callback) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      return callback(err);
    }
    callback(null, rows);
  });
};


exports.addUser = (username, email, callback) => {
  const creationDate = new Date().toISOString(); // Get the current timestamp
  const stmt = db.prepare('INSERT INTO users (username, email, creationDate) VALUES (?, ?, ?)');
  stmt.run([username, email, creationDate], function (err) {
    if (err) {
      return callback(err);
    }
    callback(null, { id: this.lastID, username, email });
  });
  stmt.finalize();
};
