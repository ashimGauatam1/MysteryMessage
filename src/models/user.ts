import mongoose, { Schema, Document} from "mongoose";

export interface message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: String;
  CodeExpiry: Date;
  isVerified:boolean;
  message: message[];
  isacceptingMessage: boolean;
  Date: Date;
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "please user valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  verifyCode: {
    type: String,
    required: [true, "Verify code  is required"],
  },
  CodeExpiry: {
    type: Date,
  },
  isacceptingMessage: {
    type: Boolean,
  },
  isVerified: {
    type: Boolean,
  },
  message: [MessageSchema],
  Date: {
    type: Date,
    default: Date.now(),
  },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
