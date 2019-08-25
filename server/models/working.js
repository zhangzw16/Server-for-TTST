import mongoose from 'mongoose';

require('mongoose-double')(mongoose);

const { Schema } = mongoose;
const SchemaTypes = mongoose.Schema.Types;

// To fix https://github.com/Automattic/mongoose/issues/4291
mongoose.Promise = global.Promise;

const workingSchema = new Schema({
  week: {
    type: Number,
    required: true
  },
  studentID: {
    type: Number,
    required: true
  },
  comment: {
    type: String
  },
  operatorSID: {
    type: Number
  },
  confirm: {
    type: Boolean,
    required: true
  },
  workingHours: {
    Day1: {
      type: SchemaTypes.Double,
      required: true
    },
    Day2: {
      type: SchemaTypes.Double,
      required: true
    },
    Day3: {
      type: SchemaTypes.Double,
      required: true
    },
    Day4: {
      type: SchemaTypes.Double,
      required: true
    },
    Day5: {
      type: SchemaTypes.Double,
      required: true
    },
    Day6: {
      type: SchemaTypes.Double,
      required: true
    },
    Day7: {
      type: SchemaTypes.Double,
      required: true
    }
  },
  scores: {
    Day1: {
      type: SchemaTypes.Double,
      required: true
    },
    Day2: {
      type: SchemaTypes.Double,
      required: true
    },
    Day3: {
      type: SchemaTypes.Double,
      required: true
    },
    Day4: {
      type: SchemaTypes.Double,
      required: true
    },
    Day5: {
      type: SchemaTypes.Double,
      required: true
    },
    Day6: {
      type: SchemaTypes.Double,
      required: true
    },
    Day7: {
      type: SchemaTypes.Double,
      required: true
    }
  }
});

workingSchema.index({ week: 1, studentID: 1, confirm: 1}, { unique: true });

export default mongoose.model('working', workingSchema, 'working');