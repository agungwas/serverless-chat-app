const response = require('../helpers/response');
const { User } = require('../model');
const { validateCreateUser } = require('./register')

exports.handler = async (payload, context) => {
  validateCreateUser(payload)
  const data = await User.find({
    email: payload.email,
    password: payload.password,
  });

  return response.success(data)
};