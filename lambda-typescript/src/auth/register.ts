import Validator from 'validatorjs';
import bcrypt from 'bcrypt';
import { User } from '../model';
import response from '../helpers/response';
import { Handler } from 'aws-lambda';

export function validateCreateUser(body: Record<string, string>) {
  const validator = new Validator(body, {
    'email': 'required|email',
    'password': 'required|string|min:6',
  });

  if (!validator.passes()) throw validator.errors.all();
}

export const handler: Handler<Record<string, string>> = async (payload, context, callback) => {
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
    return response.error(error as Record<string, unknown>)
  }
};
