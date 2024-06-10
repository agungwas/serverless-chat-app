import { Handler } from 'aws-lambda';
import jwt from 'jsonwebtoken';

import response from '../../helpers/response';
import { Message } from '../../model';

export const handler: Handler<Record<string, string>> = async (payload, context, callback) => {
  try {
    const token = payload.token;
    const message = payload.message;

    const verify = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!verify) throw new Error('Invalid token');

    Message.create({
      message: payload.message,
      user_id: verify.id,
    });

    return response.success({
      message: 'User authorized',
    })
  } catch (error) {
    console.log(error, ">>> error ")
    return response.error(error as Record<string, unknown>)
  }
};
