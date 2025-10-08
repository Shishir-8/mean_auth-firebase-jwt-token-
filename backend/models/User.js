import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 3,
    },
    avatar: {
      type: String,
      default: "https://www.freepik.com/free-vector/smiling-young-man-illustration_356306451.htm#fromView=keyword&page=1&position=1&uuid=3c237734-6b10-439f-8e75-cccd7c163cde&query=Avatar"
    },
    authType: {
      type:String,
      enum: ["local", "google"],
      required: true
    },
    firebaseUid: {type: String}
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

export default User;
