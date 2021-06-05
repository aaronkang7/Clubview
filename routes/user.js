import express from "express";
import User from '../models/userModel';

const router = express.Router();

router.get('/profile', (req,res) => {
  res.send('hello');
})

router.post('/profile', (req,res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const favorites = [];

  const newUser = new User({firstName,lastName,email,favorites});
  newUser.save()
  .then(() => res.json('User Added!'))
  .catch ((err)=> res.status(400).json("Error" + err)); 
})