import express from "express";
import User from "../models/userModel.js";
import Club from "../models/clubModel.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello");
});

//TO-DO: send an array of all complete favoriteis
router.get("/favsID/:email", (req, res) => {
  User.findOne({ email: req.params.email }).then((result) => {
    if (result) {
      res.send(result.favorites);
    } else {
      console.log("not found");
    }
  });
});

//sends and array of full fav clubs
router.get("/favsFull/:email", (req, res) => {
  const FavArray = [];
  User.findOne({ email: req.params.email }).then((result) => {
    if (result) {
      var doLoop = new Promise((resolve, reject) => {
        result.favorites.forEach((favID, index, array) => {
          Club.findById(favID)
            .then((club) => {
              FavArray.push(club);
            })
            .then(() => {
              if (index === array.length - 1) resolve();
            });
        });
      });
      doLoop.then(() => {
        res.send(FavArray);
      });
    } else {
      console.log("user not found");
    }
  });
});

router.post("/user", (req, res) => {
  User.findOne({ email: req.body.email }).then((result) => {
    if (result) {
      res.send(result);
    } else {
      const firstName = req.body.givenName;
      const lastName = req.body.familyName;
      const email = req.body.email;
      const profile = req.body.imageUrl;
      const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        imageUrl: profile,
        email: email,
        favorites: [],
      });
      newUser.save().then((ress) => res.send(ress));
    }
  });
});

router.post("/:email/editfav", (req, res) => {
  const toWhat = req.body.notisFav;
  const clubid = req.body.clubid;
  let newFavs;
  User.findOne({ email: req.params.email }).then((result) => {
    if (result) {
      if (toWhat === false) {
        newFavs = results.favorites.filter((fav) => {
          fav.id !== clubid;
        });
      } else {
        newFavs = results.favorites;
        newFavs.push(clubid); //CHECK LATER
      }
    } else {
      res.send("user not found");
    }
  });
  User.updateOne({ email: req.params.email }, { $set: { favs: newFavs } });
});

export default router;
