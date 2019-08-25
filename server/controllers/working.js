import Working from '../models/working';

class WorkingControllers {
  /**
   * Get all working record
   * @param {ctx} Koa Context 
   */
  async find(ctx) {
    ctx.body = await Working.find();
  }

  /**
   * Add a working record
   * @param {ctx} Koa context 
   */
  async add(ctx) {
    try {
      const working = await new Working(ctx.request.body).save();
      ctx.body = working;
    } catch (err) {
      console.error(err);
      ctx.throw(422);
    }
  }

  /**
   * Find a working record by week and studentID
   * @param {ctx} Koa Context 
   */
  async findById(ctx) {
    try {
      let working = await Working.findOne({
        week: ctx.query.week,
        studentID: ctx.params.id,
        confirm: true
      });
      if (!working) {
        working = await Working.findOne({
          week: ctx.query.week,
          studentID: ctx.params.id,
          confirm: false
        });
        if (!working) {
          ctx.throw(404);
        }
      }
      // console.log(working);
      ctx.body = working;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  }

  async update(ctx) {
    try{
      // !! Note that update must have all records in a week.!!
      const working = await Working.findOneAndUpdate(
        {
          week: ctx.query.week,
          studentID: ctx.params.id
        },
        ctx.request.body
      );
      if (!working) {
        ctx.throw(404);
      }
      ctx.body = working;
    } catch (err) {
      console.error(err);
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  }
}

export default new WorkingControllers();