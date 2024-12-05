const userModel = require('../models/userModel'); // Import model

// Get all users from the database
exports.getAllUsers = (req, res) => {
  userModel.getAllUsers((err, users) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(users);
  });
};

// Add a new user to the database
exports.addUser = (req, res) => {
  const { name, email } = req.body;
  userModel.addUser(name, email, (err, user) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(201).json(user);
  });
};
