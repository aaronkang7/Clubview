import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const Schema = mongoose.Schema;

export const userSchema = new Schema({
  firstName: String,
  lastName: String,
  imageUrl: String,
  email: String,
  favorites: [{ type: Schema.Types.ObjectId, ref: "Club" }],
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

export default User;
