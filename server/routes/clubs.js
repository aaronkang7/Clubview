import express from "express";
import Club from "../models/clubModel.js";

const router = express.Router();

router.get("/", (req, res) => {
  Club.find()
    .then((clubs) => res.json(clubs))
    .catch((err) => res.status(400).json("Error" + err));
});

router.get("/check/:cname", (req, res) => {
  console.log(req.params.cname);
  Club.find({ cname: req.params.cname }).then((result) => {
    if (result) {
      res.send(true);
    } else {
      res.send(false);
    }
  });
});

router.post("/add", (req, res) => {
  const cname = req.body.cname;
  const lead = req.body.lead;
  const email = req.body.email + "@cornell.edu";
  const category = req.body.category;
  const desc = req.body.desc;
  const site = req.body.site;
  const start = req.body.start;
  const end = req.body.end;
  const emoji = req.body.emoji;

  const newClub = new Club({
    cname,
    lead,
    email,
    category,
    desc,
    site,
    start,
    end,
    emoji,
  });

  newClub
    .save()
    .then(() => res.redirect("/"))
    .catch((err) => res.status(400).json("Error" + err));
});

router.get("/:id", (req, res) => {
  Club.findById(req.params.id)
    .then((club) => res.json(club))
    .catch((err) => res.status(400).json("Error" + err));
});

router.post("/update/:id", (req, res) => {
  Club.findById(req.params.id)
    .then((club) => {
      club.cname = req.body.cname;
      club.lead = req.body.lead;
      club.email = req.body.email + "@cornell.edu";
      club.category = req.body.category;
      club.desc = req.body.desc;
      club.site = req.body.site;
      club.start = req.body.start;
      club.end = req.body.end;
      club.emoji = req.body.emoji;

      club.save().catch((err) => res.status(400).json("Error" + err));
    })

    .catch((err) => res.status(400).json("Error" + err));
});

export default router;
