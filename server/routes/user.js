import express from "express";
import User from '../models/userModel.js';

const router = express.Router();

router.get('/', (req,res) => {
  User.find()
  .then(users => res.json(users))
})

router.post('/', (req,res) => {
  // const firstName = req.body.givenName;
  // const lastName = req.body.familyName;
  // const email = req.body.email;
  // const favorites = [];

  // const newUser = new User({firstName,lastName,email,favorites});
  // newUser.save()
  // .then((res) => res.json(res))
  // .catch ((err)=> res.status(400).json("Error" + err)); 

  res.send(req.body);
})

export default router;