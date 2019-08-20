import People from '../models/people';

class PeopleControllers {
  /**
   * Get all people
   * @param {ctx} Koa Context
   */
  async find(ctx) {
    ctx.body = await People.find(); 
  }

  /**
   * Add a person
   * @param {ctx} Koa Context
   */
  async add(ctx) {
    try {
      const person = await new People(ctx.request.body).save();
      ctx.body = person;
    } catch (err) {
      ctx.throw(422);
    }
  }

    /**
   * Delete a person
   * @param {ctx} Koa Context
   */
  async delete(ctx) {
    try {
      const person = await People.findOne({学号: ctx.params.id});
      console.log(person);
      if (!person) {
        ctx.throw(404);
      }
      await People.findOne({学号: ctx.params.id}).remove();
      ctx.body = person;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  }
}

export default new PeopleControllers();