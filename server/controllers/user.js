import User from '../models/user';
import { encrypt, validate } from '../utils/auth';
import { saltTimes } from '../config';

class UserControllers {
  /* eslint-disable no-param-reassign */

  /**
   * Get all users
   * @param {ctx} Koa Context
   */
  async find(ctx) {
    ctx.body = await User.find();
  }

  /**
   * Find a user
   * @param {ctx} Koa Context
   */
  async findById(ctx) {
    try {
      const user = await User.findById(ctx.params.id);
      if (!user) {
        ctx.throw(404);
      }
      ctx.body = user;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  }

  /**
   * Add a user
   * @param {ctx} Koa Context
   */
  async add(ctx) {
    try {
      const user = await new User(ctx.request.body).save();
      ctx.body = user;
    } catch (err) {
      ctx.throw(422);
    }
  }

  /**
   * Update a user
   * @param {ctx} Koa Context
   */
  async update(ctx) {
    try {
      const user = await User.findByIdAndUpdate(
        ctx.params.id,
        ctx.request.body
      );
      if (!user) {
        ctx.throw(404);
      }
      ctx.body = user;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  }

  /**
   * Delete a user
   * @param {ctx} Koa Context
   */
  async delete(ctx) {
    try {
      const user = await User.findByIdAndRemove(ctx.params.id);
      if (!user) {
        ctx.throw(404);
      }
      ctx.body = user;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  }

  /**
   * register a user
   * @param {ctx} Koa Context
   */
  async register(ctx) {
    try {
      const req = ctx.request.body;
      console.log(req);
      const user = await User.findOne({username: req.username});
      if (user) {
        ctx.body = {
          code: 0,
          msg: '用户名重复！'
        };
        return;
      }
      
      const hash = await encrypt(req.password, saltTimes);
      const newUser = await new User({
        username: req.username,
        password: hash,
        studentID: req.studentID,
        firstName: req.firstName,
        lastName: req.lastName
      }).save(true);
      console.log(newUser);
        
      if (newUser) {
        ctx.body = {
          code: 1,
          msg: '注册成功',
          data: { 
            username: newUser.username
          }
        }
      } else {
        ctx.body = {
          code: 0,
          msg: '注册失败'
        }
      }
    } catch (err) {
      console.error(err);
      ctx.throw(422);
    }
  }

  /* eslint-enable no-param-reassign */
}

export default new UserControllers();
