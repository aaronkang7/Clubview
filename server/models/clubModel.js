
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const clubSchema = new Schema({
  cname: String,
  lead: String,
  email: String,
  category: String,
  desc: String,
  site: String,
  start: Date,
  end: Date,
  emoji: String
})

const Club = mongoose.model('Club', clubSchema);

export default Club;