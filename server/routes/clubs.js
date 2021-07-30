import express from "express";
import Club from "../models/clubModel.js";

const router = express.Router();

router.get("/", (req, res) => {
  Club.find()
    .then((clubs) => res.json(clubs))
    .catch((err) => res.status(400).json("Error" + err));
});

router.get("/check/:cname", (req, res) => {
  Club.find({ cname: req.params.cname }).then((result) => {
    if (result.length == 0) {
      console.log(result);
      res.json(true);
    } else {
      console.log(result);
      res.json(false);
    }
  });
});

router.post("/add/:email", (req, res) => {
  const addedBy = req.params.email;
  const cname = req.body.cname;
  const lead = req.body.lead;
  const email = req.body.email;
  const category = req.body.category;
  const desc = req.body.desc;
  const site = req.body.site;
  const start = req.body.start;
  const end = req.body.end;
  const emoji = req.body.emoji;
  const isAlwaysOpen = req.body.isAlwaysOpen;

  const newClub = new Club({
    addedBy,
    cname,
    lead,
    email,
    category,
    desc,
    site,
    start,
    end,
    emoji,
    isAlwaysOpen,
    addedBy,
  });

  newClub
    .save()
    .then(() => res.json("Club Added"))
    .catch((err) => res.status(400).json("Error" + err));
});

router.get("/:id", (req, res) => {
  Club.findById(req.params.id)
    .then((club) => res.json(club))
    .catch((err) => res.status(400).json("Error" + err));
});

router.post("/update/:id/:email", (req, res) => {
  Club.findById(req.params.id)
    .then((club) => {
      if (club.email + "@cornell.edu" !== req.params.email) {
        res.status(401).json("Unauthorized action.");
      }
      club.cname = req.body.cname;
      club.lead = req.body.lead;
      club.email = req.body.email;
      club.category = req.body.category;
      club.desc = req.body.desc;
      club.site = req.body.site;
      club.start = req.body.start;
      club.end = req.body.end;
      club.emoji = req.body.emoji;
      club.isAlwaysOpen = req.body.isAlwaysOpen;
      club.addedBy = req.params.email;
      club.save().catch((err) => res.status(400).json("Error" + err));
    })
    .then(() => res.json("Club updated"))
    .catch((err) => res.status(400).json("Error" + err));
});

export default router;
