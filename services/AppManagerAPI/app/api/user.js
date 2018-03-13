const mongoose = require('mongoose');
const api = {};
api.setup = (User) => (req, res) => {
  const admin = new User({
    username: 'admin',
    password: 'admin123456',
    emp_id :  'EMP01',
    clients: []
  });
admin.save(error => {
    if (error) throw error;
console.log('Admin account was succesfully set up');
    res.json({ success: true });
  })
}

api.index = (User, BudgetToken) => (req, res) => {
  const token = BudgetToken;
if (token) {
    User.find({}, (error, users) => {
      if (error) throw error;
      res.status(200).json(users);
    });
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.signup = (User) => (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.emp_id) res.json({ success: false, message: 'Please, pass an username and password.' });
  else {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      emp_id: req.body.emp_id
    });

    user.save(error => {
      if (error) return res.status(400).json({ success: false, message: 'Username or Empoyle ID already exists.' });
      res.json({ success: true, message: 'Account created successfully' });
    });
  }
}

api.getAll = (User, Token) => (req, res) => {
  if (Token) {
    User.find({}, (error, user) => {
      if (error) return res.status(400).json(error);
      res.status(200).json(user);
      return true;
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}



module.exports = api;
