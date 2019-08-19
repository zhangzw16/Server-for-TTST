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
      const people = await new People(ctx.request.body).save();
      ctx.body = people;
    } catch (err) {
      ctx.throw(422);
    }
  }
}

export default new PeopleControllers();