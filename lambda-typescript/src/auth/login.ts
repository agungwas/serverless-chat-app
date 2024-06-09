import { Handler } from 'aws-lambda';
import response from '../helpers/response';
import { User } from '../model';
import { validateCreateUser } from './register';
import jwt from 'jsonwebtoken';

export const handlerLogin: Handler<Record<string, string>> = async (payload, context) => {
    try {
      validateCreateUser(payload)
      const data = await User.find({
        email: payload.email,
        password: payload.password,
      });

      const token = jwt.sign(data, process.env.JWT_SECRET as string);

      return response.success({token});
    } catch (error) {
      return response.error(error as Record<string, unknown>);
    }
};

