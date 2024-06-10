import { Handler } from 'aws-lambda';
import jwt from 'jsonwebtoken';

import response from '../../helpers/response';

export const handler: Handler<Record<string, string>> = async (payload, context, callback) => {
  try {
    const token = payload.token;

    const verify = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!verify) throw new Error('Invalid token');

    return response.success({
      message: 'User authorized',
    })
  } catch (error) {
    console.log(error, ">>> error ")
    return response.error(error as Record<string, unknown>)
  }
};
