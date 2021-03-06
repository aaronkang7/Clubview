import express from "express";
import User from "../models/userModel.js";
import Club from "../models/clubModel.js";

const router = express.Router();

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
  User.findOne({ email: req.params.email }).then((result) => {
    if (result) {
      Club.find({ _id: { $in: result.favorites } }).then((clublist) =>
        res.send(clublist)
      );
    } else {
      console.log("user not found");
    }
  });
});

router.get("/my/:email", (req, res) => {
  const uemail = req.params.email;
  const atInd = uemail.indexOf("@");
  const netId = uemail.substring(0, atInd);
  Club.find({ email: netId }).then((clubs) => res.send(clubs));
});

router.delete("/:id/:email", (req, res) => {
  Club.findById({ _id: req.params.id }).then((club) => {
    if (club.email + "@cornell.edu" === req.params.email) {
      Club.deleteOne({ _id: req.params.id }).then(() =>
        res.send("Club has been deleted.")
      );
    } else {
      res.send("Unauthorized action.");
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
  let newFav = [];
  User.findOne({ email: req.params.email }).then((result) => {
    if (result != null) {
      let oldFav = result.favorites;
      var doStuff = new Promise((resolve, reject) => {
        if (toWhat === false) {
          oldFav.forEach((fav, index, array) => {
            if (fav._id != clubid) {
              newFav.push(fav._id);
            }
            if (index === array.length - 1) {
              resolve(newFav);
            }
          });
        } else {
          oldFav.push(clubid);
          console.log(" ADDING: newFavs is: ", oldFav);

          resolve(oldFav);
        }
      });
      doStuff.then((endFav) => {
        User.updateOne(
          { email: req.params.email },
          { $set: { favorites: endFav } }
        )
          .then(() => res.send(endFav))
          .catch((err) => console.log(err));
      });
    } else {
      res.send("user not found");
    }
  });
});

export default router;
