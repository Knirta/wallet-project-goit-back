const express = require("express");
const router = express.Router();
const {
  validateUserSignup,
  validateUserLogin,
} = require('./validation');
const {
  signup,
  login,
  logout,
  currentUser,
   } = require("../../controllers/users");
const guard = require('../../helpers/guard');
const loginLimit = require('../../helpers/rate-limit-login');

router.post('/signup', validateUserSignup, signup);
router.post('/login', loginLimit, validateUserLogin, login);
router.post('/logout', guard, logout);
router.get('/info', currentUser);
// router.post('/refresh-tokens', refreshTokens);

module.exports = router;
