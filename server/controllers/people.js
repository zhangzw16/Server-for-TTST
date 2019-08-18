import People from '../models/people';

class PeopleControllers {
  /**
   * Get all people
   * @param {ctx} Koa Context
   */
  async find(ctx) {
    ctx.body = await People.find(); 
  }
}

export default new PeopleControllers();