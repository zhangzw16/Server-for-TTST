import mongoose from 'mongoose';
import { isEmail } from 'validator';

const { Schema } = mongoose;

// To fix https://github.com/Automattic/mongoose/issues/4291
mongoose.Promise = global.Promise;

const peopleSchema = new Schema({
	学号: {
		type: Number,
		unique: true,
		required: true
	},
	姓名: {
		type: String,
		required: true
	},
	性别: {
		type: String,
		required: true,
		enum: ['男', '女']
	},
	院系: {
		type: String,
		required: true
	},
	电子邮件: {
		type: String,
		lowercase: true,
		required: true,
		validate: [isEmail, 'Please fill a valid email address']
	},
	联系电话: {
		type: String,
		required: true
	},
	住址: {
		type: String
	},
	是否在岗: {
		type: String,
		enum: ["是", "否"]
	},
	备注: {
		type: String
	},
	批次: {
		type: Object
	}
});

export default mongoose.model('people', peopleSchema, 'people');
