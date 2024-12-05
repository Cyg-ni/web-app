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
  const { username, email } = req.body;
  userModel.addUser(username, email, (err, user) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(201).json(user);
  });
};

// Delete a user by accountId
exports.deleteUser = (req, res) => {
  const accountId = req.params.accountId; // Get accountId from route parameter

  userModel.deleteUser(accountId, (err, result) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).json(result); // Respond with the deleted user information
  });
};

exports.updateUser = (req, res) => {
  const accountId = req.params.accountId; // Get accountId from route parameter
  const { username, email } = req.body; // Get new username and email from the request body

  userModel.updateUser(accountId, username, email, (err, result) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).json(result); // Respond with the updated user information
  });
};
