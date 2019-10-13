import sendResult from '../utils/sendResult';
import db from '../database/models/index';
import Check from '../utils/validator';

const User = {
  async checkuserExist(req, res, next) {
    const existingUser = await db.Users.findOne({ where: { email: req.body.email }, raw: true });
    if (existingUser) return sendResult(res, 409, 'This email already exists');
    next();
  },

  async checkloginEntries(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return sendResult(res, 400, 'Both email and password are required');
    }
    next();
  },

  validateEmail(req, res, next) {
    const validateEmail = new Check({ email: req }).req().email().error;
    validateEmail
      ? sendResult(res, 400, validateEmail)
      : next();
  },

  async getUserbyEmail(req, res, next) {
    const user = await db.Users.findOne({ where: { email: req.body.email } });
    if (!user) return sendResult(res, 409, 'User with email not found');
    req.user = user.dataValues;
    next();
  },

  validatePass(req, res, next) {
    const password = new Check({ password: req }).req().min(2).alphaNum()
      .confirmPass();
    password.error
      ? sendResult(res, 400, password.error)
      : next();
  },
};

export default User;