import mongoose, { ObjectId } from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

export interface IToDo extends mongoose.Document {
  author: ObjectId,
  title: string,
  body: string
};

const ToDoSchema = new Schema({
  author: ObjectId,
  title: {
    type: String,
    require: true
  },
  body: {
    type: String,
    require: true
  }
}, {timestamps: true});

const Todo = mongoose.model<IToDo>("Todo", ToDoSchema);

export default Todo;