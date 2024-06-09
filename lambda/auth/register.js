const Validator = require('validatorjs');
const bcrypt = require('bcrypt');
const { User } = require('../model');
const response = require('../helpers/response');

export function validateCreateUser(body) {
  console.log(body.email, ">>> body.email ")
  const validator = new Validator(body, {
    'email': 'required|email',
    'password': 'required|string|min:6',
  })

  if (!validator.passes()) throw validator.errors.all();
}

exports.handler = async (payload, context, callback) => {
  try {
    console.log(payload, ">>> payload ");
    validateCreateUser(payload);
    payload.email = payload.email.toLowerCase();

    const exist = await User.findOne({
      email: payload.email,
    });
    if (exist) throw new Error('Email already exist');

    const data = await User.create({
      email: payload.email,
      password: bcrypt.hashSync(payload.password, 10),
    });
    console.log(data, ">>> data ");
    
    // const response = {
    //   success: true,
    //   statusCode: 200,
    //   data: {
    //     message: 'User created successfully',
    //   },
    // };
    // return response;
    return response.success({
      message: 'User created successfully',
    })
  } catch (error) {
    console.log(error, ">>> error ")
    return response.error(error)
  }
};