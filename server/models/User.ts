import mongoose from 'mongoose';

interface DocumentResult<T> {
  _doc: T;
}

export interface IUser extends DocumentResult<IUser>{
  username: string,
  password: string
};

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    require: true,
    min: 3,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
},{ timestamps: true} );


const User = mongoose.model<IUser>("User", UserSchema);

export default User;