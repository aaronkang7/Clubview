import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Club' }]
});