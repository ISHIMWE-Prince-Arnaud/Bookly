import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, minlength: 6 },
    password: { type: String, required: true },
    profilePic: {
      type: String,
      default: () =>
        `https://avatar.iran.liara.run/public/${
          Math.floor(Math.random() * 100) + 1
        }`,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
