import jwt from 'jsonwebtoken';
import User from '../models/user';
import { validate } from '../utils/auth';

export default async ctx => {
  const req = ctx.request.body;
  const user = await User.findOne({username: req.username});
  if (await validate(req.password, user.password)) {
    ctx.status = 200;
    ctx.body = {
      token: jwt.sign(
        {
          role: 'admin'
        },
        'YourKey'
      ), // Store this key in an environment variable
      message: 'Successful Authentication',
      studentID: user.studentID
    };
  } else {
    ctx.status = 401;
    ctx.body = {
      message: 'Authentication Failed'
    };
  }
  return ctx;
};
