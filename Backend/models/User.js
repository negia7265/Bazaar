const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default:
        "https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png",
    },
    age: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("user", UserSchema);
module.exports = User;
